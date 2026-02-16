import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Volume2, Square, Download, Share2, Sparkles, Check } from 'lucide-react';

const Summary = ({ data }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const synthesisRef = useRef(window.speechSynthesis);
  
  const summaryText = data?.summary || data?.simplified_summary || "Analysis pending...";
  const isHindi = /[\u0900-\u097F]/.test(summaryText);

  // --- 💾 FUNCTIONAL: Save as Text File ---
  const handleSave = () => {
    const element = document.createElement("a");
    const file = new Blob([summaryText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `NyayMitra_Summary_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    
    // Visual feedback
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // --- 📲 FUNCTIONAL: Web Share API ---
  const handleShare = async () => {
    const shareData = {
      title: 'NyayMitra Legal Summary',
      text: summaryText,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard if Share API isn't supported
        await navigator.clipboard.writeText(summaryText);
        alert(isHindi ? "क्लिपबोर्ड पर कॉपी किया गया!" : "Copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(summaryText);
      utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
      utterance.rate = isHindi ? 0.85 : 0.95; 
      utterance.pitch = 1.05;

      const voices = synthesisRef.current.getVoices();
      const preferredVoice = voices.find(v => v.lang === utterance.lang && (v.name.includes('Google') || v.name.includes('Natural')));
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      synthesisRef.current.speak(utterance);
    }
  };

  useEffect(() => {
    // 1. Capture the ref value into a local variable
    const currentSynthesis = synthesisRef.current;

    return () => {
        // 2. Use the variable, NOT the ref, in the cleanup
        if (currentSynthesis) {
            currentSynthesis.cancel();
        }
    };
}, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-legalCharcoal/80 backdrop-blur-md border border-gold/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full group"
    >
      <div className="bg-white/5 border-b border-gold/10 p-6 flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-3 z-10">
          <FileText className="text-gold" size={20} />
          <h3 className="font-cinzel text-lg text-white tracking-[0.2em] uppercase">
            {isHindi ? "दस्तावेज़ सारांश" : "Document Abstract"}
          </h3>
        </div>
        
        <div className="flex items-center gap-4 z-10">
          <AnimatePresence>
            {isSpeaking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-1 items-end h-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 4] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                    className="w-1 bg-gold rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={toggleSpeech}
            className={`p-3 rounded-full transition-all duration-500 shadow-lg border ${
              isSpeaking 
              ? 'bg-red-500/10 border-red-500 text-red-500' 
              : 'bg-gold/10 border-gold/30 text-gold hover:bg-gold hover:text-black'
            }`}
          >
            {isSpeaking ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
          </button>
        </div>
        
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        />
      </div>

      <div className="p-8 flex-grow relative">
        <Sparkles className="absolute top-4 right-4 text-gold/5 pointer-events-none" size={60} />
        
        <div className="prose prose-invert max-w-none">
          <p className={`leading-relaxed text-silver/90 selection:bg-gold/30 ${
            isHindi 
            ? 'font-sans text-xl leading-[1.8] text-justify' 
            : 'font-serif text-lg first-letter:text-5xl first-letter:font-cinzel first-letter:text-gold first-letter:mr-3 first-letter:float-left first-letter:mt-1'
          }`}>
            {summaryText}
          </p>
        </div>
      </div>

      <div className="p-6 bg-black/40 flex justify-between items-center border-t border-gold/10">
        <span className="text-[9px] text-silver/30 uppercase tracking-[0.2em] font-bold">
          {isHindi ? "न्यायमित्र प्रमाणीकृत" : "NyayMitra Verified"}
        </span>
        
        <div className="flex gap-6">
          {/* --- SAVE BUTTON --- */}
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver/60 hover:text-gold transition-all group/btn"
          >
            {isSaved ? <Check size={14} className="text-green-500" /> : <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />} 
            <span>{isSaved ? (isHindi ? "सहेजा गया" : "Saved") : (isHindi ? "सहेजें" : "Save")}</span>
          </button>

          {/* --- SHARE BUTTON --- */}
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver/60 hover:text-gold transition-all group/btn"
          >
            <Share2 size={14} className="group-hover/btn:scale-110 transition-transform" /> 
            <span>{isHindi ? "साझा करें" : "Share"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Summary;