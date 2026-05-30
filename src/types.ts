export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  iconName: string; // string key for lucide icons
  image: string; // image placeholder or generated assets
  category: "residential" | "commercial" | "engineering" | "3d-visualization";
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  companyName?: string;
  role?: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  is3D?: boolean;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType: string;
}
