import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, ShieldCheck, AlertCircle, Scale, Sparkles } from 'lucide-react';

const FileUpload = ({ setAnalysisResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(20); // Sync with your backend 20s delay

  useEffect(() => {
    let interval = null;
    if (loading && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading, timer]);

  const handleUpload = async (selectedFile) => {
    setLoading(true);
    setError(null);
    setTimer(20); 
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_URL}/api/v1/documents/process`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysisResult(response.data);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("High Demand: Please wait 60s for quota reset.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4">
      <motion.div 
        whileHover={!loading ? { scale: 1.01 } : {}}
        className={`relative group border-2 border-dashed rounded-2xl p-12 transition-all duration-500 
          ${file ? 'border-gold bg-gold/10' : 'border-gold/30 hover:border-gold hover:bg-gold/5 shadow-2xl'}`}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
          onChange={onFileChange}
          disabled={loading}
          accept=".pdf,image/*"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="p-5 bg-gold/10 rounded-full mb-4 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
                  <Upload className="text-gold" size={40} />
                </div>
                <h3 className="font-cinzel text-xl text-white tracking-widest uppercase">Submit Case Document</h3>
                <p className="text-silver/50 mt-2 text-sm font-serif italic">PDF or Image (Max 10MB)</p>
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <FileText className={`text-gold mb-2 ${loading ? 'animate-pulse' : ''}`} size={56} />
                  {loading && (
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_#D4AF37] z-10"
                    />
                  )}
                </div>
                <span className="text-white font-medium tracking-wide mt-2">{file.name}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- REFINED STATUS SECTION --- */}
      <div className="mt-8 min-h-[120px] flex flex-col items-center justify-center">
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-lg w-full"
            >
              <div className="bg-legalCharcoal/80 backdrop-blur-md p-6 rounded-2xl border border-gold/20 shadow-2xl relative overflow-hidden">
                {/* Background Sparkle Effect */}
                <Sparkles className="absolute top-2 right-2 text-gold/10" size={40} />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    <span className="text-gold font-bold tracking-[0.2em] text-[10px] uppercase">
                      NyayMitra Core Analysis • {timer}s
                    </span>
                  </div>
                  <Scale size={16} className="text-gold animate-bounce" />
                </div>
                
                <p className="text-silver/80 text-xs text-center leading-relaxed font-serif italic mb-4">
                  "Performing multimodal Devanagari OCR and mapping to Indian Penal Code protocols..."
                </p>

                {/* Refined Progress Bar */}
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-gold h-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((20 - timer) / 20) * 100}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 text-red-400 bg-red-500/5 px-6 py-3 rounded-xl border border-red-500/20"
            >
              <AlertCircle size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
              className="flex items-center gap-2 text-silver text-[9px] uppercase tracking-[0.3em]"
            >
              <ShieldCheck size={14} className="text-gold" />
              <span>AES-256 Encrypted Legal Processing</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileUpload;