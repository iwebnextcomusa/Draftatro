import { Layers, Phone, Mail, MapPin, Facebook, Linkedin, ArrowRight } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function Footer({ setActiveTab, openQuoteModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabValue: string) => {
    setActiveTab(tabValue);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden" id="main-footer">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleLinkClick("home")}>
              <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center font-extrabold text-white text-base transition-all group-hover:scale-105">
                D
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tighter text-white block">
                  DRAFTATRON<span className="text-brand-electric">.</span>
                </span>
                <span className="text-[8px] font-mono text-slate-400 tracking-[0.15em] block uppercase -mt-0.5">
                  WAUKESHA, WI
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Industrial grade blueprints, BIM models, and immersive 3D animation walkthroughs. Based locally in Waukesha, Wisconsin. Your layout, completed seamlessly.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-slate-400 font-mono">Follow our updates:</span>
              <a href="#" className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-[15px] tracking-wider uppercase">Our Services</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-brand-electric transition flex items-center gap-1 group text-left">
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-electric group-hover:translate-x-1 transition" />
                  Residential Drafting
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-brand-electric transition flex items-center gap-1 group text-left">
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-electric group-hover:translate-x-1 transition" />
                  3D Render Walkthroughs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-brand-electric transition flex items-center gap-1 group text-left">
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-electric group-hover:translate-x-1 transition" />
                  Commercial BIM Models
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-brand-electric transition flex items-center gap-1 group text-left">
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-electric group-hover:translate-x-1 transition" />
                  Blueprint to CAD Conversion
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-[15px] tracking-wider uppercase">Quick Navigation</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick("home")} className="hover:text-brand-electric transition flex items-center gap-1">
                  Home Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("about")} className="hover:text-brand-electric transition flex items-center gap-1">
                  Our Enterprise Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-brand-electric transition flex items-center gap-1">
                  Service Descriptions
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("contact")} className="hover:text-brand-electric transition flex items-center gap-1">
                  Contact Waukesha HQ
                </button>
              </li>
              <li>
                <button onClick={openQuoteModal} className="text-brand-electric font-semibold hover:underline text-left">
                  Get a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-[15px] tracking-wider uppercase">Contact Waukesha</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                <span>Waukesha, Wisconsin (Southeastern WI)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-electric shrink-0" />
                <a href="tel:608-215-3761" className="hover:text-white transition">608-215-3761</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-electric shrink-0" />
                <a href="mailto:ltagnello@gmail.com" className="hover:text-white transition">ltagnello@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-800 my-8"></div>

        {/* Bottom portion */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <span>&copy; {currentYear} Draftatron. All rights reserved. Waukesha, WI.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <div className="font-medium text-slate-400">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-brand-electric hover:underline hover:text-blue-400 px-1 font-semibold transition">iWebNext</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
