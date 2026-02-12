import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';


function App() {
  const [loadingApp, setLoadingApp] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [currentView, setCurrentView] = useState('home'); 

  if (loadingApp) return <SplashScreen onComplete={() => setLoadingApp(false)} />;

  const renderContent = () => {
    // 1. Process View
    if (currentView === 'process') {
      return (
        <div className="mt-12 text-center animate-fade-in">
          <h2 className="font-cinzel text-4xl text-gold mb-6 uppercase tracking-widest">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-silver">
             <div className="p-6 bg-legalCharcoal border border-gold/20 rounded-lg">Step 1: Secure Upload</div>
             <div className="p-6 bg-legalCharcoal border border-gold/20 rounded-lg">Step 2: AI Neural Decoding</div>
             <div className="p-6 bg-legalCharcoal border border-gold/20 rounded-lg">Step 3: Strategic Roadmap</div>
          </div>
        </div>
      );
    }

    // 2. Rights View
    if (currentView === 'rights') {
      return (
        <div className="mt-12 text-center animate-fade-in">
          <h2 className="font-cinzel text-4xl text-gold mb-6 uppercase tracking-widest">Your Legal Rights</h2>
          <p className="text-silver text-lg font-serif max-w-2xl mx-auto italic">
            Detailed information on IPC and BNS constitutional protections under the NyayMitra framework.
          </p>
        </div>
      );
    }

    // 3. Home View (Upload or Results)
    if (!analysis) {
      return (
        <div className="animate-fade-in">
          <Header />
          <FileUpload setAnalysisResult={setAnalysis} />
        </div>
      );
    }

    // 4. Result View (Includes Summary & Roadmap)
    return (
      <ResultDisplay 
        onReset={() => setAnalysis(null)} 
        data={{
          ...analysis,
          summary: analysis.simplified_summary 
        }} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-legalBlack text-white flex flex-col">
      {/* Navbar is outside the main container to ensure it stays on top */}
      <Navbar setView={setCurrentView} currentView={currentView} />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 pb-20 pt-10 w-full">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;