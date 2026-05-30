import { ServiceItem, TestimonialItem, GalleryItem } from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "residential-drafting",
    title: "Residential Structural Drafting",
    description: "Flawless blueprints, construction drawings, and layout schematics tailored for Waukesha builders and homeowners.",
    longDescription: "Deploy state-of-the-art CAD modeling to design construction-ready blueprints, floor plans, elevations, and structural schematics. Whether you're planning a custom home in Waukesha or remodeling a historic Milwaukee estate, our drafting processes ensure compliance with local Wisconsin building codes and exact precision for general contractors.",
    benefits: [
      "Permit-ready plans optimized for local municipal reviews",
      "Exact architectural and structural coordination to minimize on-site errors",
      "Seamless layout optimization for space, lighting, and electrical outlets",
      "Fast turnarounds with fully responsive feedback streams"
    ],
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    category: "residential"
  },
  {
    id: "3d-visualization",
    title: "3D Volumetric Walkthroughs & Animatics",
    description: "Immersive 3D animated walkthroughs, hyper-realistic renderings, and architectural flythroughs that bring your drawings to life.",
    longDescription: "Bridge the gap between raw drafts and client imagination. We build interactive 3D virtual walkthroughs, interior/exterior walkthrough fly-bys, and high-fidelity volumetric model animations. Perfect for property marketing, local pre-sales, and securing stakeholder approvals with gorgeous animated clarity.",
    benefits: [
      "Photorealistic texture mappings and accurate lighting simulations",
      "Interactive Flythrough flyovers highlighting every square foot",
      "Perfect marketing material to drive pre-sales and investor excitement",
      "Aide in physical material decisions before breaking ground"
    ],
    iconName: "Video",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    category: "3d-visualization"
  },
  {
    id: "commercial-cad",
    title: "Commercial BIM & MEP CAD Design",
    description: "High-level building information modeling, mechanical, electrical, and plumbing engineering drafts for commercial properties.",
    longDescription: "Our commercial-grade Drafting capabilities empower developers and MEP engineers across Southeastern Wisconsin. We create fully coordinated Revit BIM projects, structural steel detailing, and advanced HVAC/plumbing schematics for office plazas, retail structures, and industrial assets.",
    benefits: [
      "Clash detection to find structural conflicts before they cost money",
      "Fully coordinated Revit BIM models and detailed MEP schematics",
      "Compliant with commercial safety and environmental standards",
      "Co-engineering with contractors to optimize project timelines"
    ],
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    category: "commercial"
  },
  {
    id: "blueprint-conversion",
    title: "Legacy Blueprint to CAD Conversion",
    description: "Transition paper archives and hand-drawn historical blueprints into state-of-the-art, vector-perfect .DWG models.",
    longDescription: "Don't let older paper drafts decay or sit unusable. We digitally reconstruct legacy scans and hand-drawn blueprints into perfect computerized vector CAD models. Scale, layer, and dimension are preserved dynamically, allowing for easy updates and cloud archival security.",
    benefits: [
      "Fully layered vector drawings (.DWG / .DXF format compatible)",
      "Meticulous cleanup of historical scans and illegible prints",
      "Easy scaling and modifications for additions or renovation plans",
      "Secures historical commercial property documents in durable digital mediums"
    ],
    iconName: "RefreshCw",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=800",
    category: "engineering"
  }
];

export const testimonialData: TestimonialItem[] = [
  {
    id: "t1",
    clientName: "David Miller",
    companyName: "Miller Custom Homes",
    role: "Lead Builder",
    location: "Waukesha, WI",
    rating: 5,
    text: "The architectural drafting from Draftatron was flawless. Every detail needed for our Waukesha county building permits was covered. The crew on site commented on how clear and consistent the structural layouts were.",
    date: "March 15, 2026"
  },
  {
    id: "t2",
    clientName: "Sarah Jenkins",
    companyName: "Apex Properties Group",
    role: "Development Director",
    location: "Milwaukee, WI",
    rating: 5,
    text: "We used Draftatron's 3D animated walkthrough services to pitch our latest suburban commercial development. The realism of the lighting, the fluid camera motion, and the technical rendering gave the city board the absolute confidence to approve the proposal.",
    date: "April 28, 2026"
  },
  {
    id: "t3",
    clientName: "Marcus Henderson",
    companyName: "Retrofit Design Partners",
    role: "Principal Architect",
    location: "Pewaukee, WI",
    rating: 5,
    text: "Draftatron digitized over a hundred of our archived hand-drawn blueprints into highly clean, structured CAD formats. This has transformed our design workflows and given our firm quick modern access to older historical floorplans.",
    date: "May 10, 2026"
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Waukesha Suburban Custom Estate",
    description: "Comprehensive 2D blueprint drafts and subsequent 3D volumetric interior and exterior designs.",
    category: "Residential Drafting",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    is3D: true
  },
  {
    id: "g2",
    title: "Southeastern WI Manufacturing Hub",
    description: "Detailed industrial mechanical CAD blueprints, MEP layout designs, and equipment positioning drafts.",
    category: "Commercial BIM",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g3",
    title: "The Pewaukee Lakeside Retreat Walkthrough",
    description: "A continuous, high-definition 3D camera flightpath rendering showing real-time atmospheric shadowing.",
    category: "3D Animation",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    is3D: true
  },
  {
    id: "g4",
    title: "Downtown Milwaukee Multi-Unit Loft",
    description: "Floor layouts, elevations, plumbing loops, and cross-section sheets created for adaptive reuse loft conversions.",
    category: "Commercial MEP",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g5",
    title: "Historical Delafield Residence Remodel",
    description: "Hand-drafted papers systematically converted to vector formats, facilitating historical siding and wing modifications.",
    category: "CAD Conversion",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
  }
];

export const whyChooseUsData = [
  {
    id: "w1",
    title: "Waukesha & Wisconsin Local Focus",
    description: "We are proudly based in Waukesha, WI, serving the entire Southeastern Wisconsin region with rapid response times and physical on-site consultations when needed.",
    iconName: "MapPin"
  },
  {
    id: "w2",
    title: "High-Fidelity 3D Capabilities",
    description: "We don't just draft static lines. We build immersive 3D walkthroughs and animated videos that are visually impressive and make presentations clear.",
    iconName: "Video"
  },
  {
    id: "w3",
    title: "Code-Compliant, Permit-Ready",
    description: "Every blueprint and engineering layout is designed to conform precisely with Wisconsin building codes and safety regulations.",
    iconName: "ShieldCheck"
  },
  {
    id: "w4",
    title: "Exceptional Lead Times & Accuracy",
    description: "With advanced clash detection and double-reviewed blueprints, we deliver accurate drafts on schedule, reducing construction delays and overhead.",
    iconName: "Clock"
  }
];
