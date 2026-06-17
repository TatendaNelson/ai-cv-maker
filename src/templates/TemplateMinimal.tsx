import type { CVData } from '../types';

export function TemplateMinimal({ cv }: { cv: CVData }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cv;

  return (
    <div className="min-h-[297mm] p-10 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-900 mb-3">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                <div className="text-sm text-slate-600 mb-1">
                  {exp.company} {exp.location && `• ${exp.location}`}
                  <span className="mx-2">•</span>
                  <span className="text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.field}</h3>
                <div className="text-sm text-slate-600">
                  {edu.institution} {edu.location && `• ${edu.location}`}
                  <span className="mx-2">•</span>
                  <span className="text-slate-500">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                {edu.description && <p className="text-sm text-slate-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span key={lang} className="text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-xs text-slate-500 break-all">{proj.link}</a>
                )}
                <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-sm text-slate-600 mt-1">
                    {proj.technologies.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span key={cert} className="text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded">
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
