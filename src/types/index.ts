// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  id: string;
}

// Contact Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Association Info Types
export interface AssociationInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  image?: string;
}

// Social Media Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Footer Links Types
export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
