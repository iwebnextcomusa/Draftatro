import { useEffect, useRef, useState } from "react";
import { Layers, ArrowRight, Play, Server, Clock, Compass, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function HeroSection({ setActiveTab, openQuoteModal }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive 3D blueprint coordinate grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Grid points list for drafting mesh simulation
    const points: Array<{ x: number; y: number; originX: number; originY: number; vx: number; vy: number }> = [];
    const spacing = 45;

    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        points.push({
          x: x,
          y: y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw engineering grid pattern lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render connecting interactive nodes
      ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
      ctx.fillStyle = "rgba(59, 130, 246, 0.25)";
      ctx.lineWidth = 0.75;

      points.forEach((point) => {
        // Subtle floating movement
        point.x += point.vx;
        point.y += point.vy;

        // Bounce from origin boundaries
        if (Math.abs(point.x - point.originX) > 15) point.vx *= -1;
        if (Math.abs(point.y - point.originY) > 15) point.vy *= -1;

        // Mouse influence
        const dx = mousePos.x - point.x;
        const dy = mousePos.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let displayX = point.x;
        let displayY = point.y;

        if (distance < 120) {
          const force = (120 - distance) / 120;
          displayX -= (dx / distance) * force * 15;
          displayY -= (dy / distance) * force * 15;
        }

        // Draw node ticks
        ctx.beginPath();
        ctx.arc(displayX, displayY, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect near nodes to create structure constellation
        if (distance < 100) {
          ctx.beginPath();
          ctx.ellipse(displayX, displayY, 2, 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw draft compass circle annotation
      ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width * 0.75, height * 0.5, 180, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <section className="relative min-h-[calc(100vh-100px)] flex items-center bg-[#0F172A] overflow-hidden py-16 lg:py-24" id="hero-section">
      {/* Dynamic Grid Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 1 }}
      />

      {/* Target Theme Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none blueprint-grid" style={{ zIndex: 2 }} />

      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] bg-brand-blue/10 rounded-full filter blur-[140px] pointer-events-none animate-glow" style={{ zIndex: 0 }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-brand-electric/5 rounded-full filter blur-[150px] pointer-events-none" style={{ zIndex: 0 }}></div>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 relative flex flex-col lg:flex-row items-center gap-12" style={{ zIndex: 10 }}>
        
        {/* Left column (Text & actions) */}
        <div className="flex-1 text-center lg:text-left flex flex-col gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-electric/30 text-xs text-brand-electric font-semibold mx-auto lg:mx-0 w-fit">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-brand-electric" />
            <span>WAUKESHA, WISCONSIN'S PRESTIGE CAD STUDIO</span>
          </div>

          <h1 className="font-display font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none">
            WHERE VISION <br className="hidden sm:inline" />MEETS <span className="text-brand-electric">PRECISION</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Premium architectural drafting and CAD solutions based in Waukesha, WI. Serving Milwaukee and Southeastern Wisconsin with technical excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
            <button
              onClick={openQuoteModal}
              id="hero-get-quote"
              className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] text-white font-bold rounded-lg text-lg hover:bg-blue-600 transition shadow-lg shadow-brand-blue/30 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => {
                setActiveTab("services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              id="hero-inspect-services"
              className="w-full sm:w-auto px-8 py-4 border border-slate-700 bg-slate-800/50 text-white font-bold rounded-lg text-lg hover:border-slate-600 hover:bg-slate-800 transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              Our Portfolio
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-8 mt-4 text-left">
            <div>
              <span className="font-display font-bold text-2xl sm:text-3xl text-white block">100%</span>
              <span className="text-xs text-slate-500 block font-mono uppercase mt-0.5">Code Compliant</span>
            </div>
            <div>
              <span className="font-display font-bold text-2xl sm:text-3xl text-white block">24 Hr</span>
              <span className="text-xs text-slate-500 block font-mono uppercase mt-0.5">First Feedback</span>
            </div>
            <div>
              <span className="font-display font-bold text-2xl sm:text-3xl text-white block">15+ Yrs</span>
              <span className="text-xs text-slate-500 block font-mono uppercase mt-0.5">Local Experience</span>
            </div>
          </div>
        </div>

        {/* Right column (3D-style perspective display & Widgets Combo) */}
        <div className="flex-1 w-full max-w-lg relative flex flex-col gap-6 py-4">
          
          {/* Main Floating Local Expertise Widget */}
          <div className="bg-slate-800/80 backdrop-blur-md p-6 border border-slate-700 rounded-2xl relative group hover:border-slate-600 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-white">Local Expertise</h3>
              <span className="text-[10px] uppercase font-mono tracking-widest bg-slate-700 px-3 py-1 rounded text-slate-300">Waukesha, WI</span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Serving Southeastern Wisconsin and Milwaukee County for over 15 years with residential and commercial drafts.
            </p>
            <div className="flex items-center gap-2 text-brand-electric text-xs font-bold uppercase tracking-widest">
              <span>Verified Wisconsin Partner</span>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
              <span>Licensed & Insured</span>
            </div>
          </div>

          {/* Symmetrical Grid metrics widgets */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/80 p-5 border border-slate-700 rounded-2xl text-center hover:border-slate-600 transition-all">
              <div className="text-3xl font-bold text-brand-electric mb-1">500+</div>
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Projects Delivered</div>
            </div>
            <div className="bg-slate-800/80 p-5 border border-slate-700 rounded-2xl text-center hover:border-slate-600 transition-all">
              <div className="text-3xl font-bold text-brand-electric mb-1">24h</div>
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Quote Turnaround</div>
            </div>
          </div>

          {/* Architectural HUD Overlay */}
          <div className="glass-panel border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-brand-electric/30 transition-all duration-300">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-850 pb-2.5">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 bg-brand-electric rounded-full animate-ping"></span>
                ACTIVE PIPELINE
              </span>
              <span className="font-bold">SYSTEM READY</span>
            </div>
            
            <div className="py-4 flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent relative overflow-hidden rounded">
                <div className="absolute inset-0 bg-brand-electric animate-scan animate-pulse" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>SCALE: PRECISE REAL-TIME MESH</span>
              <span className="text-emerald-400 font-bold uppercase">100% Validated</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
