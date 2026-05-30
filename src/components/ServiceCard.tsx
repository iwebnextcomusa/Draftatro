import { useState } from "react";
import { ServiceItem } from "../types";
import { ArrowRight, CheckCircle, X, Shield, Users, Layers, Sparkles, Home, Video, Building2, RefreshCw } from "lucide-react";

interface ServiceCardProps {
  key?: string;
  service: ServiceItem;
  openQuoteModal: (preselectedService?: string) => void;
}

export default function ServiceCard({ service, openQuoteModal }: ServiceCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Map icon strings to Lucide components safely
  const renderIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <Home className="w-6 h-6 text-brand-electric" />;
      case "Video":
        return <Video className="w-6 h-6 text-brand-electric" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-brand-electric" />;
      case "RefreshCw":
        return <RefreshCw className="w-6 h-6 text-brand-electric" />;
      default:
        return <Layers className="w-6 h-6 text-brand-electric" />;
    }
  };

  const handleInquireClick = () => {
    setIsDetailOpen(false);
    openQuoteModal(service.title);
  };

  return (
    <>
      {/* Individual Service Grid Card */}
      <div 
        id={`service-card-${service.id}`}
        className="glass-panel rounded-2xl p-6 hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between group h-full relative"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-brand-blue/15 transition-all duration-300"></div>
        
        {/* Card Header & Content */}
        <div>
          {/* Card Icon */}
          <div className="p-3 bg-brand-blue/10 border border-brand-electric/25 rounded-xl w-12 h-12 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            {renderIcon(service.iconName)}
          </div>

          <h3 className="font-display font-medium text-lg text-white mb-2 group-hover:text-brand-electric transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {service.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => setIsDetailOpen(true)}
            id={`service-learn-more-${service.id}`}
            className="text-xs text-brand-electric hover:text-white font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => openQuoteModal(service.title)}
            id={`service-quote-btn-${service.id}`}
            className="text-xs bg-brand-blue/10 border border-brand-electric/20 hover:bg-brand-blue font-semibold text-white px-3 py-1.5 rounded-lg transition"
          >
            Inquire
          </button>
        </div>
      </div>

      {/* Detail Dialog Overlay Modal */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)}></div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-scaleIn max-h-[90vh] flex flex-col text-slate-200">
            {/* Modal Image Background Header */}
            <div className="relative h-48 sm:h-60 overflow-hidden shrink-0">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] font-mono font-bold uppercase text-brand-electric tracking-widest px-2.5 py-1 rounded-md bg-brand-blue/25 border border-brand-electric/30">
                  {service.category} Layouts
                </span>
                <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1.5 leading-tight">
                  {service.title}
                </h4>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 font-mono">Service Overview</h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              <div>
                <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3.5 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-electric" />
                  Key Features & Design Benefits
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                      <CheckCircle className="w-4.5 h-4.5 text-brand-electric shrink-0 mt-0.5" />
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Certification Badge */}
              <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-electric/25 flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Southeastern Wisconsin Standard Compliance</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Our digital drafts and 3D schematics are meticulously double-checked to align with Wisconsin's Department of Safety and Professional Services (DSPS) codes and municipal zoning regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-950 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <span className="text-xs text-slate-400 font-mono">
                Serving Waukesha & surrounding counties
              </span>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/5 transition"
                >
                  Close View
                </button>
                <button
                  onClick={handleInquireClick}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-semibold bg-brand-blue hover:bg-blue-600 text-white transition flex items-center justify-center gap-1.5"
                >
                  Request Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
