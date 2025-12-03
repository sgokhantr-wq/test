import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AutomationSim from './components/AutomationSim';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CentaurusAI from './components/CentaurusAI';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500 selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/live-demo" element={
              <div className="container mx-auto px-4 py-12 space-y-16">
                <Dashboard />
                <AutomationSim />
              </div>
            } />
            <Route path="/centaurus" element={<CentaurusAI />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800 bg-slate-900 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm font-mono">
            <p>&copy; {new Date().getFullYear()} Gokhan Sahin. Engineering & Production Planning.</p>
            <p className="mt-2">Turning signals into decisions.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
