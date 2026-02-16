import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Summary from './Summary';
import Roadmap from './Roadmap';
import RightCard from './Framer'; 
import { 
  ChevronLeft,  ShieldCheck, Download, Globe,  
  Loader2, Clock, MapPin, Scale, 
} from 'lucide-react';

const ResultDisplay = ({ data, onReset }) => {
  const [lang, setLang] = useState('en');
  const [isExporting, setIsExporting] = useState(false);
  const [findingHelp, setFindingHelp] = useState(false);
  const reportRef = useRef(null);

  const getLocalizedData = () => ({
    summary: lang === 'en' ? data.simplified_summary : data.simplified_summary_hi,
    roadmap: lang === 'en' ? data.roadmap : data.roadmap_hi,
    rights: lang === 'en' ? data.rights_and_warnings : data.rights_and_warnings_hi,
    timeline: lang === 'en' ? (data.timeline || "2-4 Years") : (data.timeline_hi || "2-4 साल"),
  });

  const localized = getLocalizedData();

  // 📍 UNIQUE: Geospatial Help Finder
  const findLocalHelp = () => {
    setFindingHelp(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const query = encodeURIComponent(`Legal Aid Clinic or District Court near me`);
        window.open(`https://www.google.com/maps/search/${query}/@${latitude},${longitude},13z`, '_blank');
        setFindingHelp(false);
      }, () => {
        alert("Location access denied. Opening general legal aid search.");
        window.open(`https://www.google.com/maps/search/Legal+Aid+Clinic+India`, '_blank');
        setFindingHelp(false);
      });
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    const element = reportRef.current;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#121212",
        ignoreElements: (el) => el.classList.contains('no-export')
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`NyayMitra_Report_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div ref={reportRef} className="animate-fade-in space-y-10 max-w-7xl mx-auto p-4 md:p-12 bg-legalBlack rounded-3xl relative overflow-hidden">
      
      {/* Action Header */}
      <div className="no-export flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gold/20 pb-8">
        <div>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-gold/60 hover:text-gold transition-all text-xs uppercase tracking-[0.2em] mb-4 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Analyze New Document
          </button>
          <h2 className="font-cinzel text-4xl text-white tracking-widest">
            Case <span className="text-gold">Intelligence</span> Report
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-legalCharcoal/50 border border-gold/30 rounded-full p-1 shadow-inner">
            <Globe size={14} className="text-gold mx-2" />
            <button onClick={() => setLang('en')} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${lang === 'en' ? 'bg-gold text-black shadow-lg' : 'text-gold/40 hover:text-gold'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${lang === 'hi' ? 'bg-gold text-black shadow-lg' : 'text-gold/40 hover:text-gold'}`}>हिन्दी</button>
          </div>

          <button 
            onClick={findLocalHelp}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white rounded-md transition-all"
          >
            {findingHelp ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
            {lang === 'en' ? "Find Local Help" : "निकटतम सहायता"}
          </button>

          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-3 px-6 py-3 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-yellow-600 rounded-md transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isExporting ? "Securing..." : "Export PDF"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Summary & Analytics */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <Summary data={{ ...data, summary: localized.summary }} />
          
          {/* ⏳ UNIQUE: Timeline Predictor Component */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-legalCharcoal/40 border border-gold/20 p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={20} />
                <h4 className="font-cinzel text-white text-xs tracking-widest uppercase">
                  {lang === 'en' ? "Timeline Prediction" : "समय सीमा का अनुमान"}
                </h4>
              </div>
              <span className="text-gold font-bold text-xs">{localized.timeline}</span>
            </div>
            
            {/* Visual Timeline Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold/50 to-gold shadow-[0_0_10px_#D4AF37]"
              />
            </div>
            <p className="text-[9px] text-silver/40 uppercase tracking-tighter text-right">
              {lang === 'en' ? "Estimated Disposal Time (District Court)" : "अनुमानित निपटान समय (जिला न्यायालय)"}
            </p>
          </motion.div>

          <div className="bg-gold/5 border border-gold/20 p-6 rounded-xl flex items-center gap-4 border-l-4">
            <ShieldCheck className="text-gold" size={32} />
            <div>
              <p className="text-[10px] text-silver/60 leading-relaxed uppercase tracking-widest font-bold">Verification Protocol</p>
              <p className="text-xs text-white/80 italic">
                {lang === 'en' ? "AI Cross-referenced with BNS 2023 protocols." : "AI ने BNS 2023 के साथ मिलान किया है।"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap */}
        <div className="lg:col-span-7">
          <Roadmap steps={localized.roadmap} lang={lang} />
        </div>
      </div>

      {/* Rights & Warnings */}
      <section className="mt-16 pt-10 border-t border-gold/10">
        <h3 className="font-cinzel text-2xl text-white tracking-[0.2em] mb-10 flex items-center gap-3 uppercase">
          <Scale className="text-gold" size={24} />
          {lang === 'en' ? "Citizen Safeguards" : "नागरिक सुरक्षा"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
          <AnimatePresence mode="wait">
            <RightCard 
              key={`${lang}-right`}
              title="Protective Rights"
              titleHi="सुरक्षात्मक अधिकार"
              detail={data.rights_and_warnings}
              detailHi={data.rights_and_warnings_hi}
              type="info"
            />
            <RightCard 
              key={`${lang}-warning`}
              title="Complexity Level: Medium"
              titleHi="जटिलता स्तर: मध्यम"
              detail="Warning: Failure to appear on the first date may lead to an Ex-Parte decree under CPC/BNS guidelines."
              detailHi="चेतावनी: पहली तारीख पर उपस्थित न होने पर CPC/BNS के तहत एकपक्षीय डिक्री हो सकती है।"
              type="warning"
            />
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default ResultDisplay;