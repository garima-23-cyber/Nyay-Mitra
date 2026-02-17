import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram as InstagramIcon, 
  Linkedin as LinkedinIcon, 
  Github as GithubIcon, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Copyright,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: <LinkedinIcon size={20} />, 
      href: 'https://www.linkedin.com/in/kumari-garima-a47593324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 
      glow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]', 
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'GitHub', 
      icon: <GithubIcon size={20} />, 
      href: 'https://github.com/garima-23-cyber', 
      glow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]', 
      color: 'hover:text-white' 
    },
    { 
      name: 'Instagram', 
      icon: <InstagramIcon size={20} />, 
      href: 'https://instagram.com/username', 
      glow: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]', 
      color: 'hover:text-pink-500' 
    },
    { 
      name: 'Contact', 
      icon: <Mail size={20} />, 
      href: 'mailto:your-kumari.garima0021@gmail.com', 
      glow: 'hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]', 
      color: 'hover:text-gold' 
    },
  ];

  return (
    <footer className="relative mt-20 border-t border-gold/10 bg-legalBlack pt-16 pb-8 overflow-hidden">
      {/* 🟢 Top Border Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 🏛️ Brand Section */}
          <div className="space-y-4">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 cursor-default"
            >
              <ShieldCheck className="text-gold" size={28} />
              <h3 className="font-cinzel text-2xl tracking-widest text-white">
                Nyay<span className="text-gold">Mitra</span>
              </h3>
            </motion.div>
            <p className="text-silver/50 text-sm font-serif italic leading-relaxed max-w-xs">
              Empowering Indian citizens through AI-driven legal literacy and document transparency.
            </p>
          </div>

          {/* 🔗 Connect Section */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold flex items-center gap-2">
              <Sparkles size={12} /> Connect with Developer
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 text-silver/40 transition-all duration-300 ${link.glow} ${link.color}`}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 🛰️ System Status */}
          <div className="space-y-4 text-center md:text-right">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">System Status</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] text-silver/60 uppercase tracking-widest font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Gemini Neural Engine Online
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] text-silver/60 uppercase tracking-widest font-medium">
                <ExternalLink size={12} className="text-gold/50" />
                BNS 2023 Compliant Data
              </div>
            </div>
          </div>
        </div>

        {/* ⚖️ Middle Bar: Privacy & Terms */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-silver/20 text-[10px] uppercase tracking-[0.2em] font-medium">
            <Copyright size={12} />
            2026 NyayMitra • Crafted for Justice
          </div>
          
          <div className="flex gap-8 text-silver/30 text-[9px] uppercase tracking-[0.3em] font-bold">
            <button className="hover:text-gold transition-colors duration-300">Privacy Protocol</button>
            <button className="hover:text-gold transition-colors duration-300">Terms of Service</button>
          </div>
        </div>

        {/* ✨ Bottom Tagline Section (Added as requested) */}
        <div className="mt-12 pt-8 border-t border-gold/5 text-center">
          <p className="text-[10px] text-silver/20 uppercase tracking-[0.5em] font-cinzel leading-loose">
            NyayMitra Intelligence • AI-Powered Legal Equity • 2026
          </p>
        </div>
      </div>

      {/* 🌫️ Background Aesthetic Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};

export default Footer;