import type { CVData } from '../types';

export function TemplateClassic({ cv }: { cv: CVData }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cv;

  return (
    <div className="min-h-[297mm] p-8 bg-white font-serif">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-slate-900">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm text-slate-700 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-800 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm italic text-slate-700 mb-1">
                  {exp.company}{exp.location && `, ${exp.location}`}
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-800 mb-1">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-slate-800 space-y-0.5">
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
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-sm text-slate-900">
                    {edu.institution}
                  </h3>
                  <span className="text-xs text-slate-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-sm italic text-slate-700">
                  {edu.degree} in {edu.field}
                </div>
                {edu.description && <p className="text-sm text-slate-800 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-sm text-slate-800">{skills.join(', ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs text-slate-600">{proj.link}</span>
                  )}
                </div>
                <p className="text-sm text-slate-800 mb-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-sm text-slate-700 italic">
                    Technologies: {proj.technologies.join(', ')}
                  </p>
                )}
                {proj.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-slate-800 space-y-0.5 mt-1">
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

      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-sm text-slate-800 space-y-0.5">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wide text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Languages
          </h2>
          <p className="text-sm text-slate-800">{languages.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
