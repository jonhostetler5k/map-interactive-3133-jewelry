import React, { useState, useEffect } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import ChatWidget from './components/ChatWidget';
import { SECTIONS } from './content/index';
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

// Define subsections for playbooks
const PLAYBOOK_SUBSECTIONS = [
  { id: 'prospect-1-playbook', subsections: [
    { id: 'part-1', label: 'Part 1: The Prospect', anchor: 'PART 1: THE PROSPECT' },
    { id: 'part-2', label: 'Part 2: The Campaigns', anchor: 'PART 2: THE CAMPAIGNS' },
    { id: 'campaign-1', label: 'Campaign 1: Style Finder Quiz', anchor: 'CAMPAIGN 1: STYLE FINDER QUIZ' },
    { id: 'campaign-2', label: 'Campaign 2: Luxury Buyer\'s Guide', anchor: 'CAMPAIGN 2: LUXURY BUYER\'S GUIDE' },
    { id: 'campaign-3', label: 'Campaign 3: Welcome Offer', anchor: 'CAMPAIGN 3: WELCOME OFFER' }
  ]},
  { id: 'prospect-2-playbook', subsections: [
    { id: 'part-1', label: 'Part 1: The Prospect', anchor: 'PART 1: THE PROSPECT' },
    { id: 'part-2', label: 'Part 2: The Campaigns', anchor: 'PART 2: THE CAMPAIGNS' },
    { id: 'campaign-1', label: 'Campaign 1: Aspirational Lifestyle Quiz', anchor: 'CAMPAIGN 1: ASPIRATIONAL LIFESTYLE QUIZ' },
    { id: 'campaign-2', label: 'Campaign 2: Luxury Gift Guide', anchor: 'CAMPAIGN 2: LUXURY GIFT GUIDE' },
    { id: 'campaign-3', label: 'Campaign 3: VIP Early Access', anchor: 'CAMPAIGN 3: VIP EARLY ACCESS' }
  ]},
  { id: 'prospect-3-playbook', subsections: [
    { id: 'part-1', label: 'Part 1: The Prospect', anchor: 'PART 1: THE PROSPECT' },
    { id: 'part-2', label: 'Part 2: The Campaigns', anchor: 'PART 2: THE CAMPAIGNS' },
    { id: 'campaign-1', label: 'Campaign 1: Faith Expression Quiz', anchor: 'CAMPAIGN 1: FAITH EXPRESSION QUIZ' },
    { id: 'campaign-2', label: 'Campaign 2: Faith & Style Guide', anchor: 'CAMPAIGN 2: FAITH & STYLE GUIDE' },
    { id: 'campaign-3', label: 'Campaign 3: Belonging Collection', anchor: 'CAMPAIGN 3: BELONGING COLLECTION' }
  ]}
];

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [expandedPlaybooks, setExpandedPlaybooks] = useState<Set<string>>(new Set());

  const activeSection = SECTIONS[activeSectionIndex];

  useEffect(() => {
    console.log('ROOT App.tsx loaded successfully');
  }, []);

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

  const togglePlaybook = (playbookId: string) => {
    setExpandedPlaybooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playbookId)) {
        newSet.delete(playbookId);
      } else {
        newSet.add(playbookId);
      }
      return newSet;
    });
  };

  const scrollToSubsection = (sectionIndex: number, anchor: string) => {
    // First, navigate to the section
    setActiveSectionIndex(sectionIndex);
    
    // Then scroll to the anchor after a brief delay to let content render
    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        // Find all headings in the content
        const headings = mainContent.querySelectorAll('h1, h2, h3, h4');
        let targetHeading: Element | null = null;
        
        headings.forEach(heading => {
          const text = heading.textContent?.trim().toUpperCase() || '';
          if (text.includes(anchor.toUpperCase())) {
            targetHeading = heading;
          }
        });
        
        if (targetHeading) {
          targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
    
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const isPlaybook = (sectionId: string) => {
    return PLAYBOOK_SUBSECTIONS.some(p => p.id === sectionId);
  };

  const getPlaybookSubsections = (sectionId: string) => {
    return PLAYBOOK_SUBSECTIONS.find(p => p.id === sectionId)?.subsections || [];
  };

  const renderNavButton = (section: typeof SECTIONS[0], index: number) => {
    const isActive = activeSection.id === section.id;
    const hasSubsections = isPlaybook(section.id);
    const isExpanded = expandedPlaybooks.has(section.id);
    const subsections = getPlaybookSubsections(section.id);

    return (
      <div key={section.id}>
        <button
          onClick={() => {
            if (hasSubsections) {
              togglePlaybook(section.id);
            }
            setActiveSectionIndex(index);
            if (window.innerWidth < 1024 && !hasSubsections) setIsSidebarOpen(false);
          }}
          className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition-all duration-300 group ${
            isActive
              ? 'bg-white/10 text-white shadow-lg border-l-2 border-brand-gold' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span className="font-medium tracking-wide truncate">{section.title}</span>
          {hasSubsections && (
            <ChevronDown 
              size={14} 
              className={`ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
          {!hasSubsections && isActive && <ChevronRight size={14} className="ml-auto text-brand-gold" />}
        </button>
        
        {/* Subsections */}
        {hasSubsections && isExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-2">
            {subsections.map((subsection) => (
              <button
                key={subsection.id}
                onClick={() => scrollToSubsection(index, subsection.anchor)}
                className="w-full text-left py-2 px-3 rounded text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {subsection.label}
              </button>
            ))}
          </div>
        )}
      </div>
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

          <nav className="space-y-1">
            {SECTIONS.map((section, idx) => renderNavButton(section, idx))}
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
