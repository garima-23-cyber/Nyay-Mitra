import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import RightsEncyclopedia from './components/RightsEncyclopedia'; // Import these
import ProcessWorkspace from './components/ProcessWorkspace';     // new components

function App() {
  const [loadingApp, setLoadingApp] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [currentView, setCurrentView] = useState('home'); 

  // Splash Screen Logic
  if (loadingApp) return <SplashScreen onComplete={() => setLoadingApp(false)} />;

  const renderContent = () => {
    switch (currentView) {
      case 'process':
        return <ProcessWorkspace />;

      case 'rights':
        return <RightsEncyclopedia />;

      case 'home':
      default:
        // If analysis exists, show ResultDisplay, otherwise show Header + Upload
        return (
          <AnimatePresence mode="wait">
            {!analysis ? (
              <motion.div 
                key="upload-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Header />
                <FileUpload setAnalysisResult={setAnalysis} />
              </motion.div>
            ) : (
              <motion.div 
                key="result-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ResultDisplay 
                  onReset={() => setAnalysis(null)} 
                  data={{
                    ...analysis,
                    summary: analysis.simplified_summary 
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        );
    }
  };

  return (
    <div className="min-h-screen bg-legalBlack text-white flex flex-col font-sans selection:bg-gold/30">
      {/* Background Decorative Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.03),transparent_40%)] pointer-events-none" />

      <Navbar setView={setCurrentView} currentView={currentView} />
      
      <main className="relative flex-grow max-w-7xl mx-auto px-6 pb-20 pt-10 w-full">
        {renderContent()}
      </main>

      {/* Elegant Footer */}
      <footer className="py-8 border-t border-gold/10 text-center">
        <p className="text-[10px] text-silver/20 uppercase tracking-[0.5em]">
          NyayMitra Intelligence • AI-Powered Legal Equity • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;