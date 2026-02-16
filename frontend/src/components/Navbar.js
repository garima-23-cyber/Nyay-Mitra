import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, ShieldCheck, LayoutDashboard } from 'lucide-react';

const Navbar = ({ setView, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-legalCharcoal/90 backdrop-blur-xl border-b border-gold/10 px-8 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <motion.div 
          onClick={() => setView('home')} 
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-5 group cursor-pointer"
        >
          <div className="relative p-2 bg-transparent transition-all duration-500">
            <Scale className="text-gold group-hover:rotate-12 transition-transform duration-500" size={26} />
          </div>
          <h1 className="font-cinzel text-2xl font-bold tracking-[0.4em] text-white">
            NYAY<span className="text-gold">MITRA</span>
          </h1>
        </motion.div>

        {/* Navigation Links - Now Breathable and Open */}
        <div className="flex items-center gap-12">
          
          <NavItem 
            icon={<LayoutDashboard size={14} />} 
            label="Home" 
            active={currentView === 'home'} 
            onClick={() => setView('home')} 
          />

          <NavItem 
            icon={<Gavel size={14} />} 
            label="Process" 
            active={currentView === 'process'} 
            onClick={() => setView('process')} 
          />
          
          <NavItem 
            icon={<ShieldCheck size={14} />} 
            label="My Rights" 
            active={currentView === 'rights'} 
            onClick={() => setView('rights')} 
          />
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-3">
           <span className="text-[8px] uppercase tracking-[0.3em] text-silver/30 font-bold hidden lg:block">Core Active</span>
           <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]"></div>
        </div>

      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative flex items-center gap-3 py-2 transition-all duration-500 text-[11px] font-bold uppercase tracking-[0.3em] 
      ${active ? 'text-gold' : 'text-silver/40 hover:text-gold'}`}
  >
    <span className={`${active ? 'opacity-100' : 'opacity-50'} transition-opacity`}>{icon}</span>
    <span>{label}</span>
    
    {active && (
      <motion.div 
        layoutId="navUnderline"
        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_8px_#D4AF37]"
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      />
    )}
  </button>
);

export default Navbar;