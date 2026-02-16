import React, { useState,  useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, ShieldAlert, UserCheck, BookOpen, Search, X, 
  Loader2, Sparkles, Mic, MicOff, Landmark, Gavel, Users 
} from 'lucide-react';
import debounce from 'lodash/debounce'; 
import RightCard from './Framer'; 
import { searchLaws } from '../services/api';

const RightsEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicRights, setDynamicRights] = useState([]);
  const [isListening, setIsListening] = useState(false);

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

  // 🧠 1. Stabilized Debounced Search Logic
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (query.trim().length > 2) {
          setLoading(true);
          try {
            const results = await searchLaws(query);
            const mappedResults = results.map(right => ({
              ...right,
              icon: right.type === 'warning' 
                    ? <ShieldAlert className="text-red-500" size={24} /> 
                    : <Scale className="text-gold" size={24} />
            }));
            setDynamicRights(mappedResults);
          } catch (error) {
            console.error("AI Search Failed", error);
          } finally {
            setLoading(false);
          }
        } else {
          setDynamicRights([]);
        }
      }, 1000), // 1 second delay to protect 15 RPM limit
    []
  );

  // 🎙️ UNIQUE: Voice-to-Law Speech Recognition
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
      debouncedSearch(transcript); // Use debounced search for voice results
    };

    if (isListening) recognition.stop();
    else recognition.start();
  };

  // ⌨️ Handle input changes manually
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
      className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen"
    >
      <header className="mb-12 relative">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="text-gold" size={32} />
          <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/50 to-transparent"></div>
        </div>
        
        <h2 className="font-cinzel text-5xl tracking-[0.2em] text-white uppercase mb-6 leading-tight">
          Citizen <span className="text-gold">Protections</span>
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
          <p className="text-silver/70 font-serif italic text-lg max-w-xl leading-relaxed">
            {searchTerm.length > 2 
              ? `Real-time intelligence mapping for "${searchTerm}"...`
              : "Search the unified repository of Indian legal safeguards via text or voice commands."}
          </p>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {loading ? (
                  <Loader2 className="text-gold animate-spin" size={18} />
                ) : (
                  <Search className="text-gold/50 group-focus-within:text-gold" size={18} />
                )}
              </div>
              <input 
                type="text"
                placeholder="Talk or type: 'Cheque bounce', 'Bail'..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full bg-legalCharcoal/40 border border-gold/20 rounded-lg py-4 pl-12 pr-24 text-white placeholder:text-silver/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all font-sans"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchTerm && (
                  <button onClick={() => { setSearchTerm(""); setDynamicRights([]); }} className="p-2 text-silver/40 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                )}
                <button 
                  onClick={toggleListening}
                  className={`p-2 rounded-md transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gold/10 text-gold hover:bg-gold hover:text-black'}`}
                  title="Voice-to-Law Search"
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 no-export">
               <button onClick={() => handleQuickFilter("Women's Rights")} className="text-[9px] uppercase tracking-widest text-silver/40 border border-white/5 px-3 py-1 rounded-full hover:border-gold/30 hover:text-gold transition-all">#Women</button>
               <button onClick={() => handleQuickFilter("Property Dispute")} className="text-[9px] uppercase tracking-widest text-silver/40 border border-white/5 px-3 py-1 rounded-full hover:border-gold/30 hover:text-gold transition-all">#Property</button>
               <button onClick={() => handleQuickFilter("Cyber Law")} className="text-[9px] uppercase tracking-widest text-silver/40 border border-white/5 px-3 py-1 rounded-full hover:border-gold/30 hover:text-gold transition-all">#Cyber</button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <AnimatePresence mode="wait">
          {displayRights.length > 0 ? (
            displayRights.map((right, index) => (
              <motion.div
                key={right.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div className="absolute -top-6 -left-6 p-4 bg-legalBlack border border-gold/40 rounded-2xl z-20 shadow-[10px_10px_30px_rgba(0,0,0,0.8)] group-hover:border-gold transition-all duration-500">
                  {right.icon}
                </div>
                
                <RightCard 
                  title={right.title}
                  titleHi={right.titleHi}
                  detail={right.detail}
                  detailHi={right.detailHi}
                  type={right.type}
                />
              </motion.div>
            ))
          ) : !loading && (
            <motion.div className="col-span-full py-24 text-center border border-dashed border-gold/20 rounded-3xl bg-gold/5">
               <Scale size={48} className="text-gold/20 mx-auto mb-4" />
               <p className="text-silver/40 font-cinzel tracking-[0.3em] text-xl uppercase italic">
                 Awaiting Inquiry for NyayMitra Protocols...
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-24 pt-10 border-t border-gold/10 text-center">
        <div className="flex flex-wrap justify-center gap-8 opacity-40 mb-8">
           <div className="flex items-center gap-2"><Gavel size={14}/> <span className="text-[9px] uppercase tracking-widest">Judicial Logic</span></div>
           <div className="flex items-center gap-2"><Landmark size={14}/> <span className="text-[9px] uppercase tracking-widest">BNS/IPC Compliant</span></div>
           <div className="flex items-center gap-2"><Users size={14}/> <span className="text-[9px] uppercase tracking-widest">Citizen Centric</span></div>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-gold/5 border border-gold/20 rounded-full">
          <Sparkles className="text-gold" size={16} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-bold">
            Multimodal Legal Extraction Engine Active
          </span>
        </div>
      </footer>
    </motion.div>
  );
};

export default RightsEncyclopedia;