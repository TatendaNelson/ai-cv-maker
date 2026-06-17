import type { CVData } from '../types';
import { Mail, Phone, MapPin, Link } from 'lucide-react';

export function TemplateModern({ cv }: { cv: CVData }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cv;

  return (
    <div className="min-h-[297mm] flex">
      {/* Sidebar */}
      <div className="w-[70mm] bg-slate-800 text-white p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight">
            {personalInfo.firstName}
          </h1>
          <h1 className="text-2xl font-bold leading-tight text-primary-300">
            {personalInfo.lastName}
          </h1>
        </div>

        <div className="space-y-3 mb-6 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary-300" />
              <span className="text-sm break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-primary-300" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary-300" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link size={14} className="text-primary-300" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Link size={14} className="text-primary-300" />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-3 border-b border-slate-600 pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="bg-slate-700 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-3 border-b border-slate-600 pb-1">
              Certifications
            </h3>
            <ul className="space-y-1 text-sm">
              {certifications.map((cert) => (
                <li key={cert} className="text-slate-300">{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-3 border-b border-slate-600 pb-1">
              Languages
            </h3>
            <ul className="space-y-1 text-sm">
              {languages.map((lang) => (
                <li key={lang} className="text-slate-300">{lang}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-primary-500 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-primary-500 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs text-slate-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-primary-600 mb-1">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-slate-700 mb-1">{exp.description}</p>
                  )}
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-primary-500 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                    <span className="text-xs text-slate-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-primary-600 mb-1">
                    {edu.institution} {edu.location && `| ${edu.location}`}
                  </div>
                  {edu.description && <p className="text-sm text-slate-700">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-primary-500 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-primary-600 break-all">{proj.link}</a>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 mb-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Technologies:</span> {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5 mt-1">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
