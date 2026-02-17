import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, Gavel, ShieldCheck, LayoutDashboard, 
  Menu, X, Sparkles 
} from 'lucide-react';

const Navbar = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🔒 Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'process', label: 'Process', icon: <Gavel className="w-4 h-4" /> },
    { id: 'rights', label: 'My Rights', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleNavClick = (view) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[150] w-full bg-legalCharcoal/90 backdrop-blur-xl border-b border-gold/10 px-6 md:px-8 py-4 md:py-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Section */}
          <motion.div 
            onClick={() => handleNavClick('home')} 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 md:space-x-5 group cursor-pointer z-[200]"
          >
            <Scale className="text-gold group-hover:rotate-12 transition-transform duration-500 w-6 h-6 md:w-7 md:h-7" />
            <h1 className="font-cinzel text-lg md:text-2xl font-bold tracking-[0.3em] md:tracking-[0.4em] text-white">
              NYAY<span className="text-gold">MITRA</span>
            </h1>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <NavItem 
                key={link.id}
                icon={link.icon} 
                label={link.label} 
                active={currentView === link.id} 
                onClick={() => handleNavClick(link.id)} 
              />
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]"></div>
            </div>

            {/* 🎯 THE FIXED TOGGLE BUTTON */}
            <button 
              className="md:hidden p-2 z-[200] relative flex items-center justify-center rounded-full bg-white/5 border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6 text-gold" strokeWidth={3} />
                  ) : (
                    <Menu className="w-6 h-6 text-gold" strokeWidth={2} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] md:hidden bg-legalBlack/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleNavClick(link.id)}
                className={`flex flex-col items-center gap-4 ${currentView === link.id ? 'text-gold' : 'text-silver/40'}`}
              >
                <div className={`p-5 rounded-3xl border ${currentView === link.id ? 'border-gold/30 bg-gold/5' : 'border-white/5 bg-white/5'}`}>
                  {React.cloneElement(link.icon, { className: "w-8 h-8" })}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em]">{link.label}</span>
              </motion.button>
            ))}
            
            <div className="absolute bottom-12 flex items-center gap-2 opacity-20">
              <Sparkles className="text-gold w-3 h-3" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white font-cinzel">NyayMitra Core Systems</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative flex items-center gap-3 py-2 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300
      ${active ? 'text-gold' : 'text-silver/40 hover:text-gold'}`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <motion.div 
        layoutId="navUnderline"
        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gold shadow-[0_0_10px_#D4AF37]"
      />
    )}
  </button>
);

export default Navbar;