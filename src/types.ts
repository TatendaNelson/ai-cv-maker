export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  highlights: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: string[];
  languages: string[];
}

export interface JobRequirements {
  keywords: string[];
  skills: string[];
  experience: string[];
  education: string[];
  responsibilities: string[];
  seniority: 'entry' | 'mid' | 'senior' | 'executive' | 'unknown';
  industry: string;
}

export interface MatchScore {
  overall: number;
  skills: number;
  experience: number;
  keywords: number;
  education: number;
}

export interface TailoredSuggestion {
  type: 'add' | 'remove' | 'modify' | 'reorder' | 'highlight';
  section: 'summary' | 'experience' | 'skills' | 'education' | 'projects';
  itemId?: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  applied: boolean;
}

export interface TailoredCV {
  original: CVData;
  tailored: CVData;
  suggestions: TailoredSuggestion[];
  matchScore: MatchScore;
  jobRequirements: JobRequirements;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative';

export type TabType = 'profile' | 'job' | 'preview' | 'export';

export const DEFAULT_CV: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};
