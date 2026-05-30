import { useState } from "react";
import { Menu, X, Phone, Mail, Building2, Layers } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openQuoteModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Services", value: "services" },
    { label: "About Us", value: "about" },
    { label: "Contact Us", value: "contact" }
  ];

  const handleNavClick = (tabValue: string) => {
    setActiveTab(tabValue);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-brand-dark/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top utility bar */}
      <div className="hidden sm:block border-b border-slate-800 bg-slate-950 py-1.5 text-[11px] font-mono tracking-wider text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-electric" />
              <a href="tel:608-215-3761" className="hover:text-white transition">608-215-3761</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-electric" />
              <a href="mailto:ltagnello@gmail.com" className="hover:text-white transition">ltagnello@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="uppercase text-[10px] text-slate-500 font-bold tracking-widest">Waukesha & Milwaukee Partner</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-3 cursor-pointer group"
          id="header-brand-logo"
        >
          <div className="w-9 h-9 bg-brand-blue rounded flex items-center justify-center font-extrabold text-white text-lg transition-all group-hover:scale-105">
            D
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tighter text-white block">
              DRAFTATRON<span className="text-brand-electric">.</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 tracking-[0.15em] block uppercase -mt-0.5">
              WAUKESHA, WI
            </span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.value}
              id={`nav-${item.value}`}
              onClick={() => handleNavClick(item.value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === item.value
                  ? "text-white bg-slate-800 border border-slate-700 shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:6082153761" 
            className="px-4 py-1.5 border border-brand-electric text-brand-electric rounded-full text-xs font-semibold hover:bg-brand-electric hover:text-white transition-colors"
          >
            608-215-3761
          </a>
          <button
            id="header-quote-btn"
            onClick={openQuoteModal}
            className="px-5 py-2 text-xs font-bold rounded-lg text-white bg-brand-blue hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-brand-blue/20"
          >
            Start Your Project
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:608-215-3761"
            className="p-2 rounded-lg bg-brand-blue/10 border border-brand-electric/20 text-brand-electric hover:bg-brand-blue/20 transition"
            aria-label="Call Draftatron"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 absolute left-0 right-0 py-4 px-6 flex flex-col gap-4 animate-fadeIn shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`mobile-nav-${item.value}`}
                onClick={() => handleNavClick(item.value)}
                className={`py-3 px-4 rounded-lg text-left font-medium text-sm transition-all ${
                  activeTab === item.value
                    ? "text-white bg-slate-800 border border-slate-700"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="h-px bg-slate-800 my-1"></div>
          <div className="flex flex-col gap-3">
            <button
              id="mobile-quote-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue/90 rounded-lg shadow"
            >
              Get a Quote
            </button>
            <div className="text-center text-xs text-slate-400 py-1 flex flex-col gap-1 items-center">
              <span>Waukesha: 608-215-3761</span>
              <span>ltagnello@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
