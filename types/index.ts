// Type definitions for the portfolio project

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  location?: string;
  type?: 'full-time' | 'part-time' | 'internship' | 'contract';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade?: string;
  description?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image?: string;
  certificate?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  image: string;
  publishDate: string;
  readTime?: string;
}

export interface Research {
  id: string;
  title: string;
  description: string;
  image: string;
  paperUrl?: string;
  codeUrl?: string;
  category: string;
  status: 'published' | 'under-review' | 'in-progress';
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Component Props Types
export interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}