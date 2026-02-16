import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from './FileUpload';
import ResultDisplay from './ResultDisplay';
import { Cpu, Eye, FileSearch, Zap } from 'lucide-react';

const ProcessWorkspace = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDecoding, setIsDecoding] = useState(false);

  // Simulated Neural Decoding for the Demo
  const showDemo = () => {
    setIsDecoding(true);
    // Simulate a 3-second "Decoding" phase for effect
    setTimeout(() => {
      setAnalysisResult({
        simplified_summary: "Property Dispute Notice: The plaintiff claims unauthorized encroachment on Survey No. 402. You are required to submit an ownership deed within 15 days.",
        simplified_summary_hi: "संपत्ति विवाद नोटिस: वादी ने सर्वे नंबर 402 पर अनधिकृत अतिक्रमण का दावा किया है। आपको 15 दिनों के भीतर स्वामित्व विलेख प्रस्तुत करना होगा।",
        roadmap: [
          "Verify the boundaries mentioned in the notice", 
          "Consult a local Tehsildar for land records",
          "Draft a reply through a registered advocate"
        ],
        roadmap_hi: [
          "नोटिस में उल्लिखित सीमाओं का सत्यापन करें",
          "भूमि रिकॉर्ड के लिए स्थानीय तहसीलदार से परामर्श करें",
          "पंजीकृत अधिवक्ता के माध्यम से उत्तर तैयार करें"
        ],
        rights_and_warnings: "Under BNS protocols, you cannot be evicted without a court order (Decree).",
        rights_and_warnings_hi: "बीएनएस प्रोटोकॉल के तहत, आपको अदालती आदेश (डिक्री) के बिना बेदखल नहीं किया जा सकता है।",
        audio_script_en: "This document is a property dispute notice...",
        audio_script_hi: "यह दस्तावेज़ एक संपत्ति विवाद नोटिस है..."
      });
      setIsDecoding(false);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <AnimatePresence mode="wait">
        {/* PHASE 1: LOADING/DECODING ANIMATION */}
        {isDecoding && (
          <motion.div 
            key="decoding"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[500px] text-center"
          >
            <div className="relative mb-8">
              <Cpu className="text-gold animate-spin-slow" size={80} />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gold blur-3xl rounded-full"
              />
            </div>
            <h3 className="font-cinzel text-2xl text-white tracking-[0.3em] mb-2">Neural Decoding</h3>
            <p className="text-gold font-bold text-[10px] uppercase tracking-[0.5em] animate-pulse">Mapping IPC & BNS Protocols</p>
          </motion.div>
        )}

        {/* PHASE 2: INITIAL WORKSPACE (UPLOAD OR DEMO) */}
        {!analysisResult && !isDecoding && (
          <motion.div 
            key="workspace"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <header className="text-center">
              <h2 className="font-cinzel text-4xl text-white tracking-widest mb-4">
                Intelligence <span className="text-gold">Staging</span>
              </h2>
              <p className="text-silver/40 font-serif italic max-w-xl mx-auto">
                Upload your legal document for a bilingual analysis and strategic action roadmap.
              </p>
            </header>

            {/* Visual Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ProcessStep icon={<Eye />} title="Vision OCR" desc="Extracting Devanagari & Latin script from pixels." />
              <ProcessStep icon={<FileSearch />} title="Context Mapping" desc="Cross-referencing with Bhartiya Nyaya Sanhita." />
              <ProcessStep icon={<Zap />} title="Strategizing" desc="Generating procedural steps and rights." />
            </div>

            <div className="relative pt-10 border-t border-gold/10">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-legalBlack px-4 text-[10px] text-gold/40 tracking-[0.4em] uppercase font-bold">
                 Execution Engine
               </div>
               <FileUpload setAnalysisResult={setAnalysisResult} />
               
               <div className="text-center mt-12">
                 <button 
                   onClick={showDemo}
                   className="group relative overflow-hidden px-8 py-3 rounded-md border border-gold/30 transition-all hover:border-gold"
                 >
                   <span className="relative z-10 text-[10px] text-gold font-bold uppercase tracking-[0.3em]">
                     🚀 Initiate Sample Demo
                   </span>
                   <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: RESULT DISPLAY */}
        {analysisResult && !isDecoding && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResultDisplay data={analysisResult} onReset={() => setAnalysisResult(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal Sub-component for Process Steps
const ProcessStep = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-legalCharcoal/30 border border-gold/10 rounded-xl hover:border-gold/30 transition-all">
    <div className="text-gold mb-4 p-3 bg-gold/5 rounded-full">{icon}</div>
    <h4 className="text-white font-cinzel text-xs tracking-widest mb-2 uppercase">{title}</h4>
    <p className="text-silver/40 text-[10px] leading-relaxed uppercase tracking-tighter">{desc}</p>
  </div>
);

export default ProcessWorkspace;