import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVData, TailoredCV, TemplateType, TabType } from '../types';
import { DEFAULT_CV } from '../types';

interface CVState {
  cv: CVData;
  tailoredCV: TailoredCV | null;
  jobDescription: string;
  activeTemplate: TemplateType;
  activeTab: TabType;
  isTailoring: boolean;
  setCV: (cv: CVData) => void;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  addExperience: (exp: CVData['experience'][0]) => void;
  updateExperience: (id: string, exp: Partial<CVData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: CVData['education'][0]) => void;
  updateEducation: (id: string, edu: Partial<CVData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (project: CVData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<CVData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: string) => void;
  removeCertification: (cert: string) => void;
  addLanguage: (lang: string) => void;
  removeLanguage: (lang: string) => void;
  setJobDescription: (desc: string) => void;
  setTailoredCV: (tailored: TailoredCV | null) => void;
  setActiveTemplate: (template: TemplateType) => void;
  setActiveTab: (tab: TabType) => void;
  setIsTailoring: (isTailoring: boolean) => void;
  applySuggestion: (suggestionId: string) => void;
  resetCV: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, _get) => ({
      cv: DEFAULT_CV,
      tailoredCV: null,
      jobDescription: '',
      activeTemplate: 'modern',
      activeTab: 'profile',
      isTailoring: false,

      setCV: (cv) => set({ cv }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          cv: { ...state.cv, personalInfo: { ...state.cv.personalInfo, ...info } },
        })),

      addExperience: (exp) =>
        set((state) => ({
          cv: { ...state.cv, experience: [...state.cv.experience, exp] },
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          cv: { ...state.cv, experience: state.cv.experience.filter((e) => e.id !== id) },
        })),

      addEducation: (edu) =>
        set((state) => ({
          cv: { ...state.cv, education: [...state.cv.education, edu] },
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: state.cv.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          cv: { ...state.cv, education: state.cv.education.filter((e) => e.id !== id) },
        })),

      addSkill: (skill) =>
        set((state) => ({
          cv: { ...state.cv, skills: [...new Set([...state.cv.skills, skill])] },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          cv: { ...state.cv, skills: state.cv.skills.filter((s) => s !== skill) },
        })),

      addProject: (project) =>
        set((state) => ({
          cv: { ...state.cv, projects: [...state.cv.projects, project] },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          cv: {
            ...state.cv,
            projects: state.cv.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          cv: { ...state.cv, projects: state.cv.projects.filter((p) => p.id !== id) },
        })),

      addCertification: (cert) =>
        set((state) => ({
          cv: { ...state.cv, certifications: [...new Set([...state.cv.certifications, cert])] },
        })),

      removeCertification: (cert) =>
        set((state) => ({
          cv: { ...state.cv, certifications: state.cv.certifications.filter((c) => c !== cert) },
        })),

      addLanguage: (lang) =>
        set((state) => ({
          cv: { ...state.cv, languages: [...new Set([...state.cv.languages, lang])] },
        })),

      removeLanguage: (lang) =>
        set((state) => ({
          cv: { ...state.cv, languages: state.cv.languages.filter((l) => l !== lang) },
        })),

      setJobDescription: (desc) => set({ jobDescription: desc }),

      setTailoredCV: (tailored) => set({ tailoredCV: tailored }),

      setActiveTemplate: (template) => set({ activeTemplate: template }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      setIsTailoring: (isTailoring) => set({ isTailoring }),

      applySuggestion: (suggestionId) =>
        set((state) => {
          if (!state.tailoredCV) return state;
          const updatedSuggestions = state.tailoredCV.suggestions.map((s) =>
            s.message === suggestionId ? { ...s, applied: true } : s
          );
          return {
            tailoredCV: { ...state.tailoredCV, suggestions: updatedSuggestions },
          };
        }),

      resetCV: () => set({ cv: DEFAULT_CV, tailoredCV: null, jobDescription: '' }),
    }),
    {
      name: 'ai-cv-maker-storage',
    }
  )
);
