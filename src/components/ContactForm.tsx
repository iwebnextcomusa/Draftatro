import React, { useState } from "react";
import { ContactFormInput } from "../types";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Compass, HelpCircle } from "lucide-react";

interface ContactFormProps {
  initialService?: string;
}

export default function ContactForm({ initialService = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceType: initialService || "residential-drafting"
  });

  const [validationErrors, setValidationErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Simple input triggers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing
    if (validationErrors[name as keyof ContactFormInput]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // UI contact form validations
  const validateForm = (): boolean => {
    const errors: Partial<ContactFormInput> = {};
    
    if (!formData.name.trim()) errors.name = "Full name is required.";
    
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number (e.g., 608-215-3761).";
    }

    if (!formData.message.trim()) {
      errors.message = "Please include a short message detailing your layout needs.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable API callback sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        serviceType: "residential-drafting"
      });
      setValidationErrors({});
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-component">
      {/* Left Column: Local Headquarter info & Embedded Interactive representation map */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <div>
          <span className="text-[10px] font-semibold text-brand-electric tracking-widest font-mono uppercase block mb-1">
            LOCATION & COVERAGE
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Drafting Headquarters
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            We are based out of Waukesha, WI, serving general contractors, interior designers, and property owners throughout Milwaukee County, Waukesha County, and Southeastern Wisconsin.
          </p>
        </div>

        {/* Contact info list */}
        <div className="flex flex-col gap-5 text-sm">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-brand-electric/30 transition-all">
            <div className="p-2.5 rounded-lg bg-brand-blue/15 border border-brand-electric/25 text-brand-electric">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-slate-400 font-semibold uppercase block">Office Location</span>
              <span className="text-zinc-200 mt-0.5 block font-medium">Waukesha, Wisconsin</span>
              <span className="text-xs text-slate-500 font-medium font-mono mt-0.5">Waukesha County | Southeastern WI</span>
            </div>
          </div>

          <a href="tel:608-215-3761" className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-brand-electric/30 hover:bg-slate-800/80 transition-all">
            <div className="p-2.5 rounded-lg bg-brand-blue/15 border border-brand-electric/25 text-brand-electric">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-slate-400 font-semibold uppercase block">Telephone Line</span>
              <span className="text-zinc-200 mt-0.5 block font-medium hover:text-brand-electric transition">608-215-3761</span>
              <span className="text-xs text-slate-500 font-mono mt-0.5">Click to speak directly</span>
            </div>
          </a>

          <a href="mailto:ltagnello@gmail.com" className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-brand-electric/30 hover:bg-slate-800/80 transition-all">
            <div className="p-2.5 rounded-lg bg-brand-blue/15 border border-brand-electric/25 text-brand-electric">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-slate-400 font-semibold uppercase block">Email Inquiries</span>
              <span className="text-zinc-200 mt-0.5 block font-medium hover:text-brand-electric transition">ltagnello@gmail.com</span>
              <span className="text-xs text-slate-500 font-mono mt-0.5">Checked continuously</span>
            </div>
          </a>
        </div>

        {/* Embedded Map Section Mockup representational layout */}
        <div className="glass-panel rounded-2xl p-4 overflow-hidden shadow-lg flex-1 min-h-[220px] flex flex-col justify-between relative group hover:border-brand-electric/30 transition-all">
          {/* Schematic SVG mapping representational visual of Waukesha area */}
          <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Compass className="w-4 h-4 animate-spin-slow text-brand-electric" />
                SOUTHEASTERN WI COVERAGE GRID
              </span>
              <span>SCALE: N/A</span>
            </div>

            {/* Drawing interactive coordinate nodes */}
            <div className="flex-1 flex items-center justify-center p-4">
              <svg viewBox="0 0 400 200" className="w-full max-w-[280px] h-auto text-brand-electric opacity-75">
                {/* Connections paths */}
                <path d="M 50,100 L 150,50 L 300,80 L 340,150 L 200,160 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 150,50 L 200,160 M 300,80 L 50,100" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
                
                {/* Node Ticks */}
                {/* Waukesha (Center hub) */}
                <circle cx="150" cy="50" r="5" fill="#3b82f6" />
                <text x="160" y="45" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">Waukesha (HQ)</text>

                {/* Milwaukee */}
                <circle cx="300" cy="80" r="4" fill="#3b82f6" />
                <text x="310" y="80" fill="whitesmoke" fontSize="8" fontFamily="monospace">Milwaukee</text>
                
                {/* Brookfield */}
                <circle cx="210" cy="65" r="3" fill="#60a5fa" />
                <text x="218" y="70" fill="silver" fontSize="7" fontFamily="monospace">Brookfield</text>

                {/* Pewaukee */}
                <circle cx="100" cy="60" r="3" fill="#60a5fa" />
                <text x="75" y="55" fill="silver" fontSize="7" fontFamily="monospace">Pewaukee</text>

                {/* Delafield */}
                <circle cx="50" cy="100" r="3.5" fill="#1d4ed8" />
                <text x="20" y="115" fill="silver" fontSize="7" fontFamily="monospace">Delafield</text>

                {/* Muskego */}
                <circle cx="200" cy="160" r="4.5" fill="#3b82f6" />
                <text x="210" y="165" fill="silver" fontSize="7" fontFamily="monospace">Muskego</text>
              </svg>
            </div>

            <div className="text-[10px] font-mono text-center text-slate-500 border-t border-slate-800 pt-2 flex justify-between">
              <span>Primary Service Area: Waukesha County & Metro Milwaukee</span>
              <span className="text-brand-electric font-semibold">100% IN-NETWORK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: High-Converting Validation Lead Form */}
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full filter blur-2xl pointer-events-none"></div>

          {submittedSuccessfully ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-scaleIn" id="form-success-banner">
              <div className="p-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                Blueprint Request Queued!
              </h3>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed mx-auto">
                Thank you, <strong className="text-white">{formData.name || "friend"}</strong>. Our Waukesha engineering lead is reviewing your project description. We will reach back within <strong className="text-brand-electric">24 hours</strong> at {formData.email}.
              </p>
              <button
                onClick={() => setSubmittedSuccessfully(false)}
                className="mt-6 px-6 py-2.5 rounded-lg bg-white/5 font-semibold text-xs text-slate-300 hover:text-white hover:bg-white/10 transition border border-white/10"
              >
                Send Another Layout Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6" id="lead-generation-form">
              <div>
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight">
                  Request a Free Drafting Quote
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out your specifications below to receive an accurate estimate within 24 hours.
                </p>
              </div>

              {/* Grid 2 Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="text-xs text-slate-300 font-mono uppercase font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric transition ${
                      validationErrors.name ? "border-rose-500" : "border-slate-800"
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="text-xs text-slate-300 font-mono uppercase font-semibold">Email Address *</label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="johndoe@gmail.com"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric transition ${
                      validationErrors.email ? "border-rose-500" : "border-slate-800"
                    }`}
                  />
                  {validationErrors.email && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Grid 2 Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone-input" className="text-xs text-slate-300 font-mono uppercase font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 608-215-3761"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric transition ${
                      validationErrors.phone ? "border-rose-500" : "border-slate-800"
                    }`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                {/* Service Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service-type-input" className="text-xs text-slate-300 font-mono uppercase font-semibold">Select Design Scope</label>
                  <select
                    id="service-type-input"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric transition cursor-pointer"
                  >
                    <option value="residential-drafting">Residential Structural Drafting</option>
                    <option value="3d-visualization">3D Volumetric Walkthroughs</option>
                    <option value="commercial-cad">Commercial BIM / MEP Detailing</option>
                    <option value="blueprint-conversion">Paper Blueprint to CAD</option>
                    <option value="general-consultation">General Layout Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-input" className="text-xs text-slate-300 font-mono uppercase font-semibold">Brief Project Details *</label>
                <textarea
                  id="message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your custom square footage, project type, city code triggers, or deadlines..."
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric transition ${
                    validationErrors.message ? "border-rose-500" : "border-slate-800"
                  }`}
                />
                {validationErrors.message && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.message}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                id="contact-form-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-white bg-brand-blue hover:bg-blue-600 font-semibold text-sm transition shadow-lg shadow-brand-blue/30 active:scale-95 disabled:bg-slate-800 disabled:text-slate-500 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Validating blueprints...
                  </>
                ) : (
                  <>
                    Send Request Details
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500 font-mono mt-2">
                <HelpCircle className="w-3.5 h-3.5 text-brand-electric" />
                <span>Immediate urgent scope inquiries? Call us directly: 608-215-3761</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
