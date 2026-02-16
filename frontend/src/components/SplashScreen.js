import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // The splash screen will auto-complete after the animation sequence
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background Ambient Aura */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"
      />

      <div className="relative z-10 text-center">
        {/* Glowing 3D Icon Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30, rotateY: -30 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-10 flex justify-center perspective-1000"
        >
          {/* Layered Glows */}
          <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full scale-150 animate-pulse" />
          
          <motion.div
            animate={{ 
              rotateY: [0, 15, -15, 0],
              filter: ["drop-shadow(0 0 10px #D4AF37)", "drop-shadow(0 0 30px #D4AF37)", "drop-shadow(0 0 10px #D4AF37)"]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Scale size={120} className="text-gold relative" />
          </motion.div>
        </motion.div>

        {/* Cinematic Title Reveal */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
            className="font-cinzel text-7xl font-bold tracking-[0.4em] text-white"
          >
            NYAY<span className="text-gold">MITRA</span>
          </motion.h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 flex flex-col items-center"
        >
          <p className="text-silver font-serif italic tracking-[0.3em] text-xl mb-10">
            Establishing Equity Through AI
          </p>
          
          {/* Precision Loading Bar */}
          <div className="w-80 h-[1px] bg-white/10 relative">
            <motion.div 
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_#D4AF37]"
            />
          </div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
            className="mt-4 text-[9px] uppercase tracking-[0.5em] text-gold/60 font-bold"
          >
            Initializing Legal Core
          </motion.span>
        </motion.div>
      </div>

      {/* Frame Borders for an "Exclusive" feel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 2 }}
        className="absolute inset-10 border border-gold/10 pointer-events-none" 
      />
    </motion.div>
  );
};

export default SplashScreen;