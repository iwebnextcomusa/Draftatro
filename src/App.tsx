import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import HeroSection from "./components/HeroSection";
import ServiceCard from "./components/ServiceCard";
import TestimonialSection from "./components/TestimonialSection";
import ContactForm from "./components/ContactForm";
import AboutSection from "./components/AboutSection";

import { servicesData, galleryData } from "./data";
import { ArrowUp, X, Check, Award, Compass, Heart, ShieldAlert, Sparkles, Send } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalService, setModalService] = useState("");
  
  // Lead state inside quote modal
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // Monitor scroll height to show/hide Scroll to Top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleOpenQuoteModal = (preselectedService: string = "") => {
    setModalService(preselectedService || "residential-drafting");
    setModalSubmitted(false);
    setIsQuoteModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalEmail || !modalPhone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }
    
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      setModalSubmitted(true);
      // Reset fields
      setModalName("");
      setModalEmail("");
      setModalPhone("");
      setModalMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-slate-200 relative">
      {/* Structural Global Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Main Interactive Content Frame */}
      <main className="flex-grow">
        
        {/* VIEW: HOME PAGE */}
        {activeTab === "home" && (
          <div className="animate-fadeIn duration-500">
            {/* Immersive 3D interactive Hero */}
            <HeroSection 
              setActiveTab={setActiveTab} 
              openQuoteModal={() => handleOpenQuoteModal()} 
            />

            {/* Quick value tags */}
            <section className="py-12 bg-slate-950 border-y border-slate-800 relative z-10">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-electric/30 text-brand-electric">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm uppercase">WISCONSIN COMPLIANT</h4>
                    <p className="text-xs text-slate-400 mt-1">blue-prints match Waukesha county zoning laws precisely.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-electric/30 text-brand-electric">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm uppercase">HIGH-FIDELITY 3D WALK</h4>
                    <p className="text-xs text-slate-400 mt-1">Pre-render structural animations to secure development funding.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-electric/30 text-brand-electric">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm uppercase">LOCAL CONTRACTOR ALIGNED</h4>
                    <p className="text-xs text-slate-400 mt-1">Direct co-planning with Milwaukee Area framing crews.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Services Preview Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 text-center">
              <div>
                <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
                  CORE CAD CAPABILITIES
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  Featured Drafting Services
                </h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
                  Engineered with pixel-perfection. Select any drafting service below to inspect key layout features.
                </p>
              </div>

              {/* Grid Layout for Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
                {servicesData.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    openQuoteModal={handleOpenQuoteModal} 
                  />
                ))}
              </div>
            </section>

            {/* Interactive gallery segment */}
            <section className="py-20 bg-slate-900/40 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <div>
                  <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
                    PROJECT ARCHIVES
                  </span>
                  <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                    Southeastern WI Portfolio Showcase
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                    View active blue-prints, mechanical schematics, and 3D animatic walkthroughs completed in Waukesha and Milwaukee counties.
                  </p>
                </div>

                {/* Portfolio Showcase Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
                  {galleryData.map((project) => (
                    <div 
                      key={project.id}
                      className="glass-panel rounded-2xl overflow-hidden group shadow-lg flex flex-col hover:border-[#2563EB]/40 transition-all duration-300 relative"
                    >
                      <div className="h-48 overflow-hidden relative shrink-0">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 font-sans"
                          referrerPolicy="no-referrer"
                        />
                        {project.is3D && (
                          <span className="absolute top-3 right-3 text-[9px] font-mono font-bold uppercase bg-brand-blue/80 text-white px-2 py-0.5 rounded border border-brand-electric/40">
                            3D Animated
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent"></div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-brand-electric uppercase tracking-wider block">
                            {project.category}
                          </span>
                          <h4 className="font-display font-bold text-white text-base mt-1">
                            {project.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* testimonial slider */}
            <TestimonialSection openQuoteModal={() => handleOpenQuoteModal()} />
          </div>
        )}

        {/* VIEW: SERVICES PAGE */}
        {activeTab === "services" && (
          <div className="py-20 animate-fadeIn duration-500">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
                  OUR CAPABILITIES
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  State-of-the-Art Drafting Specialties
                </h1>
                <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">
                  From residential permits to high-concept commercial walkthrough flyovers, we combine rigorous technical accuracy with futuristic visual immersion.
                </p>
              </div>

              {/* Service cards grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {servicesData.map((service) => (
                  <div 
                    key={service.id}
                    id={`service-detail-block-${service.id}`}
                    className="glass-panel rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#2563EB]/30 transition-all duration-300 text-left"
                  >
                    {/* Visual picture */}
                    <div className="sm:w-44 h-40 sm:h-auto rounded-2xl overflow-hidden shrink-0">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover brightness-90 font-sans"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Content text */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-brand-electric uppercase tracking-widest block">
                          {service.category} SPEC
                        </span>
                        <h2 className="font-display font-bold text-lg text-white mt-1">
                          {service.title}
                        </h2>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {service.longDescription}
                        </p>
                      </div>

                      <div className="border-t border-slate-800 pt-4 mt-6 flex flex-wrap justify-between items-center gap-3">
                        <span className="text-[10px] text-slate-500 font-mono">Permit-ready and checked</span>
                        <button
                          onClick={() => handleOpenQuoteModal(service.title)}
                          className="px-4 py-1.5 rounded-lg bg-brand-blue hover:bg-blue-600 font-semibold text-xs text-white transition active:scale-95"
                        >
                          Book Design Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiries callout */}
              <div className="mt-16 glass-panel rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left relative z-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full filter blur-2xl pointer-events-none"></div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Need a dynamic custom blueprint layout?</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">Our Waukesha design leads are available for virtual conferences, screen-share drafts, or physical site review coordinates.</p>
                </div>
                <button
                  onClick={() => handleOpenQuoteModal("General Consultation")}
                  className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-brand-blue hover:text-white hover:border-transparent text-slate-200 border border-slate-800 rounded-xl transition text-center font-semibold text-xs shrink-0 cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ABOUT US PAGE */}
        {activeTab === "about" && (
          <div className="py-20 animate-fadeIn duration-500">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
                  WHO WE ARE
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Southeastern Wisconsin's Digital Draft Studio
                </h1>
                <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">
                  Draftatron represents precise CAD blueprints, 3D animated walkthroughs, and code compatibility in Waukesha, WI.
                </p>
              </div>

              {/* Full About Biographies & grid choice */}
              <AboutSection />
            </div>
          </div>
        )}

        {/* VIEW: CONTACT US PAGE */}
        {activeTab === "contact" && (
          <div className="py-20 animate-fadeIn duration-500">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
                  GET IN TOUCH
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Connect with Our Waukesha Office
                </h1>
                <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">
                  Whether you are seeking custom residential permitting drawings or high-fidelity commercial BIM coordination, we provide fast, accurate assistance.
                </p>
              </div>

              {/* Robust Lead Contact widget */}
              <ContactForm initialService={modalService} />
            </div>
          </div>
        )}

      </main>

      {/* Floating AI Chatbot Component */}
      <Chatbot />

      {/* Dynamic Scroll to Top trigger */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={handleScrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-slate-900 hover:bg-brand-blue text-slate-400 hover:text-white shadow-2xl transition-all duration-350 hover:scale-110 active:scale-95 border border-white/10 flex items-center justify-center group"
          title="Back to top of page"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Full-fledged professional footer */}
      <Footer setActiveTab={setActiveTab} openQuoteModal={handleOpenQuoteModal} />

      {/* Lead Quote Interactive Modal Dialog */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop screen */}
          <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm" onClick={() => setIsQuoteModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative z-10 animate-scaleIn text-slate-200">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-5">
              <div>
                <h4 className="font-display font-extrabold text-lg text-white">Get a Free Drafting Quote</h4>
                <p className="text-xs text-slate-400 mt-1">Based in Waukesha, serving Southeastern Wisconsin.</p>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalSubmitted ? (
               <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="p-3.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                  <Check className="w-8 h-8" />
                </div>
                <h5 className="font-display font-extrabold text-xl text-white">Request Sent Successfully!</h5>
                <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                  Our coordinator will reach out directly. We'll consult with you within <span className="text-brand-electric font-semibold">24 hours</span>.
                </p>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="mt-5 px-6 py-2 rounded-xl bg-brand-blue text-white font-semibold text-xs hover:bg-blue-600 transition"
                >
                  Finish
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300 font-mono font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="e.g., Sarah Peterson"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric transition"
                  />
                </div>

                {/* Contact Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300 font-mono font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="sarah@corp.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300 font-mono font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      placeholder="e.g., 608-215-3761"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric transition"
                    />
                  </div>
                </div>

                {/* Scope selection */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300 font-mono font-semibold">Design Target Scope</label>
                  <select
                    value={modalService}
                    onChange={(e) => setModalService(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer"
                  >
                    <option value="residential-drafting">Residential Structural Drafting</option>
                    <option value="3d-visualization">3D Volumetric Walkthroughs</option>
                    <option value="commercial-cad">Commercial BIM / MEP Detailing</option>
                    <option value="blueprint-conversion">Paper Blueprint to CAD</option>
                    <option value="general-consultation">General Layout Inquiry</option>
                  </select>
                </div>

                {/* Description text */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300 font-mono font-semibold">Additional Context messages</label>
                  <textarea
                    value={modalMessage}
                    onChange={(e) => setModalMessage(e.target.value)}
                    rows={3}
                    placeholder="Square footage, timing restrictions, or Wisconsin city code compliance queries..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-electric transition"
                  />
                </div>

                {/* Submit button controls */}
                <div className="flex gap-3 pt-4 border-t border-slate-800 mt-5">
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="flex-1 py-3 text-xs font-semibold rounded-xl border border-slate-800 hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="flex-2 py-3 text-xs font-semibold rounded-xl text-white bg-brand-blue hover:bg-blue-600 transition shadow-md shadow-brand-blue/20 flex justify-center items-center gap-1.5 cursor-pointer disabled:bg-slate-800 disabled:text-slate-500"
                  >
                    {modalLoading ? "Submitting blueprint..." : (
                      <>
                        Request Free Quote
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
