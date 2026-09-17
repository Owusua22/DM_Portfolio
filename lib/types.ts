// lib/types.ts
// Types matching the Supabase database schema (snake_case columns)

export type MediaKind = 'image' | 'video';

export interface CaseStudy {
  id: string;
  client: string;
  label: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  result: string;
  impact_label: string;
  situation: string;
  task: string;
  action: string;
  results: string;
  drive_url: string;
  media_url: string;
  media_kind: MediaKind;
  accent: 'sage' | 'aqua' | 'ink' | 'sand';
  is_concept: boolean;
  services: string[];
  tools: string[];
  is_featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  role: string;
  tools: string[];
  media_url: string;
  media_kind: MediaKind;
  project_url: string;
  date: string;
  is_featured: boolean;
}

export interface GraphicDesign {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  date: string;
  is_featured: boolean;
}

export interface UGCVideo {
  id: string;
  title: string;
  description: string;
  platform: string;
  category: string;
  thumbnail_url: string;
  video_url: string;
  date: string;
  is_featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  kind: MediaKind;
  url: string;
}

export interface PortfolioData {
  caseStudies: CaseStudy[];
  projects: Project[];
  graphicDesigns: GraphicDesign[];
  ugcVideos: UGCVideo[];
  gallery: GalleryItem[];
}

// Form types for admin (camelCase for form inputs)
export type CaseForm = Omit<CaseStudy, 'id'>;
export type ProjectForm = Omit<Project, 'id'>;
export type DesignForm = Omit<GraphicDesign, 'id'>;
export type UGCForm = Omit<UGCVideo, 'id'>;

// Empty form defaults
export const emptyCaseForm: CaseForm = {
  client: '', label: 'Strategy / Content', title: '', year: '', category: 'Digital marketing',
  summary: '', result: '', impact_label: 'IMPACT → NEXT STEP', situation: '', task: '', action: '',
  results: '', drive_url: '', media_url: '', media_kind: 'image', accent: 'sage',
  is_concept: false, services: [], tools: [], is_featured: false,
};

export const emptyProjectForm: ProjectForm = {
  title: '', description: '', category: 'SEO', role: '', tools: [],
  media_url: '', media_kind: 'image', project_url: '', date: '', is_featured: false,
};

export const emptyDesignForm: DesignForm = {
  title: '', description: '', category: 'Social Media Graphics',
  image_url: '', date: '', is_featured: false,
};

export const emptyUGCForm: UGCForm = {
  title: '', description: '', platform: 'TikTok', category: 'Product Review',
  thumbnail_url: '', video_url: '', date: '', is_featured: false,
};

export const defaultPortfolioData: PortfolioData = {
  caseStudies: [],
  projects: [],
  graphicDesigns: [],
  ugcVideos: [],
  gallery: [],
};
