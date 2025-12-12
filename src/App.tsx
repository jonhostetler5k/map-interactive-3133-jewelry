import React, { useState, useEffect } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import ChatWidget from './components/ChatWidget';
import { SECTIONS } from './content/index';
import { Menu, X, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const activeSection = SECTIONS[activeSectionIndex];

  // Scroll to top of content when section changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSectionIndex]);

  const handleNext = () => {
    if (activeSectionIndex < SECTIONS.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(prev => prev - 1);
    }
  };

  // Group sections by category for the sidebar
  const strategySections = SECTIONS.filter(s => s.category === 'Strategy');
  const playbookSections = SECTIONS.filter(s => s.category === 'Playbooks');

  const renderNavButton = (section: typeof SECTIONS[0], index: number) => {
    // Determine overall index
    const realIndex = SECTIONS.findIndex(s => s.id === section.id);
    const isActive = activeSection.id === section.id;

    return (
      <button
        key={section.id}
        onClick={() => {
          setActiveSectionIndex(realIndex);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition-all duration-300 group ${
          isActive
            ? 'bg-white/10 text-white shadow-lg border-l-2 border-brand-gold' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
      >
        <span className="font-medium tracking-wide truncate">{section.title}</span>
        {isActive && <ChevronRight size={14} className="ml-auto text-brand-gold" />}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden text-brand-black font-sans">
      
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-brand-black text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation - Updated for Dark Luxury Theme */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative w-80 h-full bg-brand-black border-r border-gray-800 transition-transform duration-300 ease-in-out z-40 overflow-y-auto flex flex-col shadow-2xl`}
      >
        <div className="p-8">
          {/* Updated Logo Section */}
          <div className="flex flex-col mb-12">
            <h1 className="font-serif text-4xl text-white tracking-widest leading-none">31:33</h1>
            <div className="h-px w-12 bg-brand-gold my-3"></div>
            <p className="text-[10px] text-brand-gold tracking-[0.4em] uppercase font-bold">Jewelry</p>
          </div>

          <nav className="space-y-8">
            <div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 pl-4">Strategic Foundation</h2>
              <div className="space-y-1">
                {strategySections.map((section, idx) => renderNavButton(section, idx))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 pl-4">Channel Playbooks</h2>
              <div className="space-y-1">
                {playbookSections.map((section, idx) => renderNavButton(section, idx))}
              </div>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-800 bg-black/20">
          <p className="text-[10px] text-gray-600 text-center leading-relaxed font-mono">
            CONFIDENTIAL STRATEGY<br/>
            © {new Date().getFullYear()} 31:33 Jewelry
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 h-full overflow-y-auto bg-white relative w-full scroll-smooth">
        
        {/* Brand Banner Strip - Matches Website */}
        <div className="sticky top-0 z-10 bg-brand-slate text-white py-2 px-6 lg:px-12 flex justify-between items-center shadow-md">
           <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold">You Belong</span>
           <span className="font-mono text-[10px] text-white/60">Marketing Action Plan v1.0</span>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 min-h-full flex flex-col">
          
          {/* Header Section */}
          {activeSectionIndex === 0 && (
            <div className="mb-12 border-b border-gray-100 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="bg-brand-black text-brand-gold text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Confidential Document</span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mt-6 mb-3 text-brand-black leading-tight">Marketing Action Plan</h1>
              <p className="text-xl text-gray-500 font-light">Strategy & Execution Roadmap</p>
            </div>
          )}

          {/* Dynamic Content Rendering */}
          <div className="flex-1 animate-in fade-in duration-500 key={activeSection.id}">
             <MarkdownViewer content={activeSection.content} />
          </div>
          
          {/* Navigation Footer */}
          <div className="border-t border-gray-200 mt-16 pt-10 pb-12 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={activeSectionIndex === 0}
              className={`flex items-center gap-3 px-5 py-3 rounded-none border border-transparent text-sm font-medium transition-all tracking-wide uppercase ${
                activeSectionIndex === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:border-brand-black hover:text-brand-black'
              }`}
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <span className="text-xs text-gray-400 font-mono hidden sm:block">
              {activeSectionIndex + 1} / {SECTIONS.length}
            </span>

            <button
              onClick={handleNext}
              disabled={activeSectionIndex === SECTIONS.length - 1}
              className={`flex items-center gap-3 px-6 py-3 rounded-none text-sm font-bold transition-all tracking-wide uppercase shadow-sm ${
                activeSectionIndex === SECTIONS.length - 1
                  ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
                  : 'bg-brand-black text-white hover:bg-brand-gold hover:text-white hover:shadow-lg'
              }`}
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;