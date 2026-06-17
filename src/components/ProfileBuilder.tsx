import { useCVStore } from '../store/cvStore';
import { useState } from 'react';
import type { Experience, Education, Project } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase, GraduationCap, Wrench, Folder, Award, Globe, User, Mail, Phone, MapPin, Link, FileText } from 'lucide-react';

export default function ProfileBuilder() {
  const { cv, updatePersonalInfo, addExperience, updateExperience, removeExperience, addEducation, updateEducation, removeEducation, addSkill, removeSkill, addProject, updateProject, removeProject, addCertification, removeCertification, addLanguage, removeLanguage } = useCVStore();
  
  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');
  const [newLang, setNewLang] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certs: true,
    languages: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionHeader = ({ title, icon, section }: { title: string; icon: React.ReactNode; section: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-3 px-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
    >
      <div className="flex items-center gap-2 text-slate-700 font-semibold">
        {icon}
        {title}
      </div>
      {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Build Your Profile</h2>
        <p className="text-sm text-slate-500">Fill in your details to create a standout CV</p>
      </div>

      {/* Personal Info */}
      <div className="card">
        <SectionHeader title="Personal Information" icon={<User size={18} />} section="personal" />
        {expandedSections.personal && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                value={cv.personalInfo.firstName}
                onChange={e => updatePersonalInfo({ firstName: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                value={cv.personalInfo.lastName}
                onChange={e => updatePersonalInfo({ lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>
            <div className="form-group">
              <label className="form-label flex items-center gap-1"><Mail size={14} /> Email</label>
              <input
                value={cv.personalInfo.email}
                onChange={e => updatePersonalInfo({ email: e.target.value })}
                placeholder="john@example.com"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="form-label flex items-center gap-1"><Phone size={14} /> Phone</label>
              <input
                value={cv.personalInfo.phone}
                onChange={e => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="form-group">
              <label className="form-label flex items-center gap-1"><MapPin size={14} /> Location</label>
              <input
                value={cv.personalInfo.location}
                onChange={e => updatePersonalInfo({ location: e.target.value })}
                placeholder="New York, NY"
              />
            </div>
            <div className="form-group">
              <label className="form-label flex items-center gap-1"><Link size={14} /> LinkedIn</label>
              <input
                value={cv.personalInfo.linkedin}
                onChange={e => updatePersonalInfo({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label flex items-center gap-1"><FileText size={14} /> Professional Summary</label>
              <textarea
                value={cv.personalInfo.summary}
                onChange={e => updatePersonalInfo({ summary: e.target.value })}
                placeholder="Write a brief summary of your professional background and key strengths..."
                rows={4}
              />
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="card">
        <SectionHeader title="Work Experience" icon={<Briefcase size={18} />} section="experience" />
        {expandedSections.experience && (
          <div className="mt-4 space-y-4">
            {cv.experience.map((exp) => (
              <ExperienceForm key={exp.id} experience={exp} onUpdate={updateExperience} onRemove={removeExperience} />
            ))}
            <button
              onClick={() => addExperience({
                id: crypto.randomUUID(),
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                highlights: [],
              })}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="card">
        <SectionHeader title="Education" icon={<GraduationCap size={18} />} section="education" />
        {expandedSections.education && (
          <div className="mt-4 space-y-4">
            {cv.education.map((edu) => (
              <EducationForm key={edu.id} education={edu} onUpdate={updateEducation} onRemove={removeEducation} />
            ))}
            <button
              onClick={() => addEducation({
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              })}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="card">
        <SectionHeader title="Skills" icon={<Wrench size={18} />} section="skills" />
        {expandedSections.skills && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {cv.skills.map((skill) => (
                <span key={skill} className="badge-blue flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., React, Python, Project Management)"
                onKeyDown={e => {
                  if (e.key === 'Enter' && newSkill.trim()) {
                    addSkill(newSkill.trim());
                    setNewSkill('');
                  }
                }}
                className="flex-1"
              />
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    addSkill(newSkill.trim());
                    setNewSkill('');
                  }
                }}
                className="btn-primary"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="card">
        <SectionHeader title="Projects" icon={<Folder size={18} />} section="projects" />
        {expandedSections.projects && (
          <div className="mt-4 space-y-4">
            {cv.projects.map((proj) => (
              <ProjectForm key={proj.id} project={proj} onUpdate={updateProject} onRemove={removeProject} />
            ))}
            <button
              onClick={() => addProject({
                id: crypto.randomUUID(),
                name: '',
                description: '',
                technologies: [],
                link: '',
                highlights: [],
              })}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="card">
        <SectionHeader title="Certifications" icon={<Award size={18} />} section="certs" />
        {expandedSections.certs && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {cv.certifications.map((cert) => (
                <span key={cert} className="badge-green flex items-center gap-1">
                  {cert}
                  <button onClick={() => removeCertification(cert)} className="hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newCert}
                onChange={e => setNewCert(e.target.value)}
                placeholder="Add certification (e.g., AWS Certified, PMP)"
                onKeyDown={e => {
                  if (e.key === 'Enter' && newCert.trim()) {
                    addCertification(newCert.trim());
                    setNewCert('');
                  }
                }}
                className="flex-1"
              />
              <button
                onClick={() => {
                  if (newCert.trim()) {
                    addCertification(newCert.trim());
                    setNewCert('');
                  }
                }}
                className="btn-primary"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="card">
        <SectionHeader title="Languages" icon={<Globe size={18} />} section="languages" />
        {expandedSections.languages && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {cv.languages.map((lang) => (
                <span key={lang} className="badge-purple flex items-center gap-1">
                  {lang}
                  <button onClick={() => removeLanguage(lang)} className="hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newLang}
                onChange={e => setNewLang(e.target.value)}
                placeholder="Add language (e.g., English, Spanish, French)"
                onKeyDown={e => {
                  if (e.key === 'Enter' && newLang.trim()) {
                    addLanguage(newLang.trim());
                    setNewLang('');
                  }
                }}
                className="flex-1"
              />
              <button
                onClick={() => {
                  if (newLang.trim()) {
                    addLanguage(newLang.trim());
                    setNewLang('');
                  }
                }}
                className="btn-primary"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceForm({ experience, onUpdate, onRemove }: {
  experience: Experience;
  onUpdate: (id: string, exp: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}) {
  const [newHighlight, setNewHighlight] = useState('');

  return (
    <div className="border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={experience.position}
          onChange={e => onUpdate(experience.id, { position: e.target.value })}
          placeholder="Position Title"
          className="font-medium"
        />
        <input
          value={experience.company}
          onChange={e => onUpdate(experience.id, { company: e.target.value })}
          placeholder="Company Name"
        />
        <input
          value={experience.location}
          onChange={e => onUpdate(experience.id, { location: e.target.value })}
          placeholder="Location"
        />
        <div className="flex gap-2">
          <input
            value={experience.startDate}
            onChange={e => onUpdate(experience.id, { startDate: e.target.value })}
            placeholder="Start Date (MM/YYYY)"
          />
          <input
            value={experience.endDate}
            onChange={e => onUpdate(experience.id, { endDate: e.target.value })}
            placeholder="End Date"
            disabled={experience.current}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={experience.current}
          onChange={e => onUpdate(experience.id, { current: e.target.checked })}
          className="rounded border-slate-300"
        />
        Currently working here
      </label>
      <textarea
        value={experience.description}
        onChange={e => onUpdate(experience.id, { description: e.target.value })}
        placeholder="Job description and responsibilities..."
        rows={3}
      />
      <div className="flex flex-wrap gap-2">
        {experience.highlights.map((h, i) => (
          <span key={i} className="badge-yellow flex items-center gap-1">
            {h}
            <button onClick={() => {
              const newHighlights = experience.highlights.filter((_, idx) => idx !== i);
              onUpdate(experience.id, { highlights: newHighlights });
            }}>
              <Trash2 size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newHighlight}
          onChange={e => setNewHighlight(e.target.value)}
          placeholder="Add key achievement..."
          className="flex-1"
          onKeyDown={e => {
            if (e.key === 'Enter' && newHighlight.trim()) {
              onUpdate(experience.id, { highlights: [...experience.highlights, newHighlight.trim()] });
              setNewHighlight('');
            }
          }}
        />
        <button
          onClick={() => {
            if (newHighlight.trim()) {
              onUpdate(experience.id, { highlights: [...experience.highlights, newHighlight.trim()] });
              setNewHighlight('');
            }
          }}
          className="btn-secondary"
        >
          <Plus size={16} />
        </button>
      </div>
      <button onClick={() => onRemove(experience.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
        <Trash2 size={14} /> Remove
      </button>
    </div>
  );
}

function EducationForm({ education, onUpdate, onRemove }: {
  education: Education;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={education.institution}
          onChange={e => onUpdate(education.id, { institution: e.target.value })}
          placeholder="Institution Name"
        />
        <input
          value={education.degree}
          onChange={e => onUpdate(education.id, { degree: e.target.value })}
          placeholder="Degree (e.g., Bachelor of Science)"
        />
        <input
          value={education.field}
          onChange={e => onUpdate(education.id, { field: e.target.value })}
          placeholder="Field of Study"
        />
        <input
          value={education.location}
          onChange={e => onUpdate(education.id, { location: e.target.value })}
          placeholder="Location"
        />
        <div className="flex gap-2">
          <input
            value={education.startDate}
            onChange={e => onUpdate(education.id, { startDate: e.target.value })}
            placeholder="Start Date"
          />
          <input
            value={education.endDate}
            onChange={e => onUpdate(education.id, { endDate: e.target.value })}
            placeholder="End Date"
            disabled={education.current}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={education.current}
          onChange={e => onUpdate(education.id, { current: e.target.checked })}
          className="rounded border-slate-300"
        />
        Currently studying
      </label>
      <textarea
        value={education.description}
        onChange={e => onUpdate(education.id, { description: e.target.value })}
        placeholder="Relevant coursework, achievements, GPA..."
        rows={2}
      />
      <button onClick={() => onRemove(education.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
        <Trash2 size={14} /> Remove
      </button>
    </div>
  );
}

function ProjectForm({ project, onUpdate, onRemove }: {
  project: Project;
  onUpdate: (id: string, proj: Partial<Project>) => void;
  onRemove: (id: string) => void;
}) {
  const [newTech, setNewTech] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  return (
    <div className="border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={project.name}
          onChange={e => onUpdate(project.id, { name: e.target.value })}
          placeholder="Project Name"
        />
        <input
          value={project.link}
          onChange={e => onUpdate(project.id, { link: e.target.value })}
          placeholder="Project Link (URL)"
        />
      </div>
      <textarea
        value={project.description}
        onChange={e => onUpdate(project.id, { description: e.target.value })}
        placeholder="Project description..."
        rows={2}
      />
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((t, i) => (
          <span key={i} className="badge-purple flex items-center gap-1">
            {t}
            <button onClick={() => onUpdate(project.id, { technologies: project.technologies.filter((_, idx) => idx !== i) })}>
              <Trash2 size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newTech}
          onChange={e => setNewTech(e.target.value)}
          placeholder="Add technology..."
          className="flex-1"
          onKeyDown={e => {
            if (e.key === 'Enter' && newTech.trim()) {
              onUpdate(project.id, { technologies: [...project.technologies, newTech.trim()] });
              setNewTech('');
            }
          }}
        />
        <button
          onClick={() => {
            if (newTech.trim()) {
              onUpdate(project.id, { technologies: [...project.technologies, newTech.trim()] });
              setNewTech('');
            }
          }}
          className="btn-secondary"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.highlights.map((h, i) => (
          <span key={i} className="badge-yellow flex items-center gap-1">
            {h}
            <button onClick={() => onUpdate(project.id, { highlights: project.highlights.filter((_, idx) => idx !== i) })}>
              <Trash2 size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newHighlight}
          onChange={e => setNewHighlight(e.target.value)}
          placeholder="Add key achievement..."
          className="flex-1"
          onKeyDown={e => {
            if (e.key === 'Enter' && newHighlight.trim()) {
              onUpdate(project.id, { highlights: [...project.highlights, newHighlight.trim()] });
              setNewHighlight('');
            }
          }}
        />
        <button
          onClick={() => {
            if (newHighlight.trim()) {
              onUpdate(project.id, { highlights: [...project.highlights, newHighlight.trim()] });
              setNewHighlight('');
            }
          }}
          className="btn-secondary"
        >
          <Plus size={16} />
        </button>
      </div>
      <button onClick={() => onRemove(project.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
        <Trash2 size={14} /> Remove
      </button>
    </div>
  );
}
