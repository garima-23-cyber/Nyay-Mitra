import React, { useState, useMemo} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, ShieldAlert, UserCheck, BookOpen, Search, X, 
  Loader2, Sparkles, Mic, MicOff, Landmark, Gavel, Users, Info 
} from 'lucide-react';
import debounce from 'lodash/debounce'; 
import RightCard from './Framer'; 
import { searchLaws } from '../services/api';

const RightsEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicRights, setDynamicRights] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); // 💡 UI Enhancement: Status feedback

  const featuredProtections = [
    {
      title: "Right Against Arbitrary Arrest",
      titleHi: "मनमानी गिरफ्तारी के खिलाफ अधिकार",
      detail: "Under Article 22 and BNS protocols, no person can be detained without being informed of the grounds for such arrest.",
      detailHi: "अनुच्छेद 22 और बीएनएस प्रोटोकॉल के तहत, किसी भी व्यक्ति को गिरफ्तारी के आधार बताए बिना हिरासत में नहीं लिया जा सकता।",
      type: "info",
      icon: <UserCheck className="text-blue-400" size={24} />,
    },
    {
      title: "Protection from Double Jeopardy",
      titleHi: "दोहरे दंड से सुरक्षा",
      detail: "No person shall be prosecuted and punished for the same offense more than once (IPC Section 71 / BNS equivalent).",
      detailHi: "किसी भी व्यक्ति को एक ही अपराध के लिए एक से अधिक बार अभियोजित और दंडित नहीं किया जाएगा।",
      type: "warning",
      icon: <ShieldAlert className="text-red-500" size={24} />,
    }
  ];

  // 🧠 Logic: Stabilized Debounced Search (Protects 15 RPM limit)
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (query.trim().length > 2) {
          setLoading(true);
          setStatusMessage("Analyzing Legal Protocols...");
          try {
            const results = await searchLaws(query);
            
            // Handle cases where the backend returns the "Service Busy" fallback
            if (results.id === 0) {
              setStatusMessage("AI is busy. Retrying in queue...");
              setDynamicRights([]);
            } else {
              const mappedResults = results.map(right => ({
                ...right,
                icon: right.type === 'warning' 
                      ? <ShieldAlert className="text-red-500" size={24} /> 
                      : <Scale className="text-gold" size={24} />
              }));
              setDynamicRights(mappedResults);
              setStatusMessage("");
            }
          } catch (error) {
            console.error("AI Search Failed", error);
            setStatusMessage("Protocol Interrupted. Please try again.");
          } finally {
            setLoading(false);
          }
        } else {
          setDynamicRights([]);
          setStatusMessage("");
        }
      }, 1000), 
    []
  );

  // 🎙️ Logic: Voice Recognition
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice Search is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      debouncedSearch(transcript);
    };
    if (isListening) recognition.stop();
    else recognition.start();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleQuickFilter = (tag) => {
    setSearchTerm(tag);
    debouncedSearch(tag);
  };

  const displayRights = searchTerm.length > 2 ? dynamicRights : featuredProtections;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen relative"
    >
      {/* 🟢 UI Enhancement: Live Status Toast */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-legalBlack/80 backdrop-blur-xl border border-gold/30 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {loading ? <Loader2 className="text-gold animate-spin" size={16} /> : <Info className="text-gold" size={16} />}
            <span className="text-xs uppercase tracking-[0.2em] text-white font-cinzel">{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12 relative">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="text-gold" size={32} />
          <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/50 via-gold/10 to-transparent"></div>
        </div>
        
        <h2 className="font-cinzel text-5xl tracking-[0.2em] text-white uppercase mb-6 leading-tight">
          Citizen <span className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">Protections</span>
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
          <p className="text-silver/70 font-serif italic text-lg max-w-xl leading-relaxed">
            {searchTerm.length > 2 
              ? `Cross-referencing legal statutes for "${searchTerm}"...`
              : "Access the unified vault of Indian legal safeguards via neural text or voice processing."}
          </p>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
                {loading ? (
                  <Loader2 className="text-gold animate-spin" size={18} />
                ) : (
                  <Search className="text-gold/50 group-focus-within:text-gold transition-colors" size={18} />
                )}
              </div>
              <input 
                type="text"
                placeholder="Talk or type: 'Bail', 'FIR'..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full bg-legalCharcoal/30 backdrop-blur-md border border-gold/20 rounded-xl py-5 pl-12 pr-24 text-white placeholder:text-silver/20 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition-all font-sans shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                {searchTerm && (
                  <button onClick={() => { setSearchTerm(""); setDynamicRights([]); setStatusMessage(""); }} className="p-2 text-silver/40 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                )}
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-lg transition-all shadow-lg ${isListening ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-gold/10 text-gold hover:bg-gold hover:text-black hover:scale-105'}`}
                  title="Voice-to-Law Search"
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
               {["Women's Rights", "Property Law", "Cyber Security"].map((tag) => (
                 <button 
                  key={tag}
                  onClick={() => handleQuickFilter(tag)} 
                  className="text-[9px] uppercase tracking-widest text-silver/40 border border-white/5 bg-white/5 px-4 py-1.5 rounded-full hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all"
                 >
                   #{tag.split(' ')[0]}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </header>

      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-10">
        <AnimatePresence mode="popLayout">
          {displayRights.length > 0 ? (
            displayRights.map((right, index) => (
              <motion.div
                key={right.title + index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 100, delay: index * 0.08 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 p-4 bg-legalBlack border border-gold/40 rounded-2xl z-20 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group-hover:border-gold group-hover:scale-110 transition-all duration-500">
                  {right.icon}
                </div>
                <RightCard {...right} />
              </motion.div>
            ))
          ) : !loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center border border-dashed border-gold/10 rounded-[2rem] bg-gradient-to-b from-gold/5 to-transparent"
            >
               <Scale size={64} className="text-gold/10 mx-auto mb-6" />
               <p className="text-silver/30 font-cinzel tracking-[0.4em] text-xl uppercase italic">
                 NyayMitra Neural Link Ready...
               </p>
               <p className="text-silver/20 text-xs mt-4 uppercase tracking-widest">Awaiting Constitutional Query</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-32 pt-12 border-t border-gold/10">
        <div className="flex flex-wrap justify-center gap-12 opacity-30 mb-10">
           {[
             { icon: <Gavel size={16}/>, text: "Judicial Logic" },
             { icon: <Landmark size={16}/>, text: "BNS Compliant" },
             { icon: <Users size={16}/>, text: "Public Safeguard" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
               {item.icon} <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{item.text}</span>
             </div>
           ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-gold/5 border border-gold/20 rounded-full shadow-inner">
            <Sparkles className="text-gold animate-pulse" size={16} />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80 font-bold">
              Cognitive Legal Extraction Active
            </span>
          </div>
          <p className="text-[9px] text-silver/20 uppercase tracking-[0.2em]">© 2026 NyayMitra Intelligence Systems</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default RightsEncyclopedia;