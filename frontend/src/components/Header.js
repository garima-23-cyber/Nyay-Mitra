import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Scale, ShieldAlert, Landmark } from 'lucide-react';

const Header = () => {
  // Animation variants for staggered entrance
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <header className="relative text-center py-20 px-4 overflow-hidden">
      {/* Decorative Background Element (Subtle Ambient Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative Icon Row */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center gap-6 mb-10"
      >
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: 48 }} 
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent to-gold/40"
        />
        <Gavel className="text-gold/60" size={28} />
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: 48 }} 
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-l from-transparent to-gold/40"
        />
      </motion.div>

      {/* Main Title with Shimmer Effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="font-cinzel text-6xl md:text-8xl font-bold text-white tracking-[0.3em] mb-8 relative inline-block">
          NYAY<span className="text-gold relative">MITRA
            <motion.span 
              animate={{ left: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
              className="absolute top-0 h-full w-20 bg-white/10 skew-x-[-20deg] blur-md pointer-events-none"
            />
          </span>
        </h1>
      </motion.div>

      {/* Subtitle / Tagline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        <p className="font-serif text-2xl md:text-3xl text-silver/70 italic tracking-widest leading-relaxed">
          "Where <span className="text-white">Artificial Intelligence</span> meets the <span className="text-gold">Scales of Justice</span>."
        </p>
      </motion.div>

      {/* Feature Pills (Staggered) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2, delayChildren: 1.2 } }
        }}
        className="flex flex-wrap justify-center gap-6 mt-12"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-3 px-6 py-2.5 bg-legalCharcoal/40 border border-gold/20 rounded-sm backdrop-blur-sm hover:border-gold/50 transition-colors cursor-default">
          <Scale size={16} className="text-gold" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-silver font-bold">Precise IPC/BNS Analysis</span>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="flex items-center gap-3 px-6 py-2.5 bg-legalCharcoal/40 border border-gold/20 rounded-sm backdrop-blur-sm hover:border-gold/50 transition-colors cursor-default">
          <ShieldAlert size={16} className="text-gold" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-silver font-bold">Encrypted & Confidential</span>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-center gap-3 px-6 py-2.5 bg-legalCharcoal/40 border border-gold/20 rounded-sm backdrop-blur-sm hover:border-gold/50 transition-colors cursor-default">
          <Landmark size={16} className="text-gold" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-silver font-bold">Bilingual Support (EN/HI)</span>
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Divider */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 flex justify-center"
      >
        <div className="relative w-48 h-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]"></div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;