import { motion } from "framer-motion";
import { ShieldAlert, Info } from "lucide-react";

const RightCard = ({ title, titleHi, detail, detailHi, type }) => {
  const isWarning = type === "warning";
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative p-8 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all ${
        isWarning ? "bg-gradient-to-br from-red-950/20 to-legalCharcoal" : "bg-gradient-to-br from-indigo-950/20 to-legalCharcoal"
      }`}
    >
      {/* Background Accent */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 blur-[80px] rounded-full ${
        isWarning ? "bg-red-600/10" : "bg-gold/10"
      }`} />

      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          {/* Fixed Hindi Visibility: Using Gold/Silver contrast */}
          <p className="text-xl text-gold font-medium leading-relaxed">{titleHi}</p>
        </div>
        
        {/* Aesthetic Label */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
          isWarning 
            ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
            : "bg-blue-500/10 border-blue-500/50 text-blue-400"
        }`}>
          {isWarning ? <ShieldAlert size={12} /> : <Info size={12} />}
          {isWarning ? "Warning" : "Information"}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="space-y-2">
          <span className="text-[10px] text-silver/40 uppercase font-bold tracking-tighter">Legal Interpretation</span>
          <p className="text-silver/80 leading-relaxed font-serif text-lg italic">{detail}</p>
        </div>
        
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <span className="text-[10px] text-gold/60 uppercase font-bold tracking-tighter">विवरण (Hindi Detail)</span>
          <p className="text-slate-200 leading-relaxed text-xl mt-1">{detailHi}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RightCard;