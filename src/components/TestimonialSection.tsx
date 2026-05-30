import { useState } from "react";
import { testimonialData } from "../data";
import { Star, MessageSquareCode, Quote, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialSection({ openQuoteModal }: { openQuoteModal: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };

  const active = testimonialData[activeIndex];

  return (
    <section className="py-20 relative overflow-hidden bg-brand-dark" id="testimonials-section">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        {/* Quote watermark icon */}
        <Quote className="w-16 h-16 text-brand-electric/10 mx-auto -mb-6" />

        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-electric/25 text-xs text-brand-electric font-semibold mx-auto w-fit">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>CUSTOMER SUCCESS REVIEWS</span>
          </div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Trusted by Builders & Developers Across Wisconsin
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            See how Draftatron’s drafting precision and interactive 3D visualizations accelerate residential and commercial permits.
          </p>
        </div>

        {/* Carousel slider area */}
        <div className="mt-12 glass-panel border border-slate-800 rounded-2xl p-6 sm:p-10 relative text-left">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-0.5">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
               ))}
            </div>
            
            <div className="text-xs text-slate-500 font-mono">
              {active.date}
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 italic leading-relaxed mb-8">
            "{active.text}"
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-slate-800">
            <div>
              <span className="font-display font-bold text-white block">
                {active.clientName}
              </span>
              <span className="text-xs text-slate-400 block font-semibold">
                {active.role} at {active.companyName}
              </span>
              <span className="text-[10px] text-brand-electric font-mono block mt-0.5 uppercase tracking-wide">
                {active.location}
              </span>
            </div>

            {/* Slider navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                id="testimonial-prev-btn"
                className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs text-slate-500 font-mono px-2">
                {activeIndex + 1} / {testimonialData.length}
              </span>

              <button
                onClick={handleNext}
                id="testimonial-next-btn"
                className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lead Call to action banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-slate-300 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="font-display font-extrabold text-lg text-white sm:text-xl">
              Ready to construct your next blueprint?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Partner with Southeastern Wisconsin's elite drafting agency. Get structural schematics and 3D animations engineered to code guidelines.
            </p>
          </div>
          <button
            onClick={openQuoteModal}
            id="testimonial-get-started"
            className="w-full md:w-auto shrink-0 px-6 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-blue-600 rounded-xl shadow-lg shadow-brand-blue/20 transition active:scale-95 text-center cursor-pointer"
          >
            Get Started Today
          </button>
        </div>

      </div>
    </section>
  );
}
