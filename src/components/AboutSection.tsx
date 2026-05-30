import { whyChooseUsData } from "../data";
import { Compass, Lightbulb, Users, MapPin, Video, ShieldCheck, Clock } from "lucide-react";

export default function AboutSection() {
  // Map icon strings to Lucide components safely
  const renderIcon = (name: string) => {
    switch (name) {
      case "MapPin":
        return <MapPin className="w-5 h-5 text-brand-electric" />;
      case "Video":
        return <Video className="w-5 h-5 text-brand-electric" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-brand-electric" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-brand-electric" />;
      default:
        return <Compass className="w-5 h-5 text-brand-electric" />;
    }
  };

  return (
    <div className="space-y-20" id="about-component">
      {/* Upper split: Company story & local heritage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-electric/25 text-xs text-brand-electric font-semibold w-fit">
            <Compass className="w-3.5 h-3.5 text-brand-electric" />
            <span>OUR WISCONSIN HERITAGE</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Crafting Precision Layouts & Walkthroughs Since 2014
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Founded with a vision to streamline architectural and engineering workflows, Draftatron has grown from a local Waukesha design firm into a premier high-fidelity drafting and 3D modeling standard in Southeastern Wisconsin.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            By combining standard 2D CAD drafting with hyper-realistic 3D volumetric animations, we empower Wisconsin homebuilders, commercial developers, and manufacturers to visualize, edit, and secure structural approvals faster than traditional workflows. We are proud of our deep roots in the <strong className="text-white">Waukesha and Milwaukee</strong> communities, designing construction projects that stand the test of time.
          </p>

          {/* Mission & Vision bullet frames */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-900/50">
              <div className="flex items-center gap-2 text-white font-bold text-[15px] mb-2 font-display">
                <Lightbulb className="w-5 h-5 text-brand-electric" />
                Our Clear Mission
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                To deliver error-free blueprints and stunning 3D visual models that expedite zoning approvals and streamline on-site construction workflows.
              </p>
            </div>

            <div className="p-4 border border-slate-800 rounded-xl bg-slate-900/50">
              <div className="flex items-center gap-2 text-white font-bold text-[15px] mb-2 font-display">
                <Users className="w-5 h-5 text-brand-electric" />
                Our Core Promise
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive coordination, code compliance, and a dedicated partnership with local contractors to respect project deadlines perfectly.
              </p>
            </div>
          </div>
        </div>

        {/* Right side illustration: Immersive blueprint layout decoration */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-brand-blue/10 rounded-2xl filter blur-xl animate-pulse"></div>
          <div className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col gap-6">
            <img 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" 
              alt="Engineering blueprints table" 
              className="w-full h-56 object-cover rounded-xl filter brightness-90 shadow-md transform hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            
            <div className="flex justify-between items-center bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-brand-electric" />
                Waukesha, Wisconsin
              </span>
              <span className="text-brand-electric font-semibold">Serving Statewide WI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Customers Choose Draftatron grid */}
      <div className="space-y-10">
        <div className="text-center">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Why Contractors Choose Draftatron
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            We deliver the ideal intersection of creative visualization and industrial engineering precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsData.map((choice) => (
            <div
              key={choice.id}
              className="glass-panel rounded-2xl p-6 flex flex-col h-full hover:border-[#2563EB] transition-all duration-300 relative group"
            >
              <div className="p-2.5 rounded-lg bg-brand-blue/10 border border-brand-electric/25 w-10 h-10 flex items-center justify-center mb-4 text-brand-electric group-hover:scale-110 transition-transform">
                {renderIcon(choice.iconName)}
              </div>
              <h4 className="font-display font-bold text-white text-base mb-2 group-hover:text-brand-electric transition-colors">
                {choice.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                {choice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
