import type { CVData } from '../types';

export function TemplateCreative({ cv }: { cv: CVData }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cv;

  return (
    <div className="min-h-[297mm] bg-white">
      {/* Colorful Header */}
      <div className="bg-primary-600 text-white p-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-primary-100">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-sm text-slate-700 leading-relaxed italic">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-primary-500 rounded"></div>
                  Experience
                </h2>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <div className="text-sm text-primary-600 font-medium mb-1">
                        {exp.company}
                        <span className="mx-2 text-slate-400">|</span>
                        <span className="text-slate-500 font-normal">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="text-xs text-slate-500 mb-1">{exp.location}</div>
                      )}
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
              <div>
                <h2 className="text-lg font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-primary-500 rounded"></div>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-sm text-primary-600 font-medium">
                        {edu.institution}
                        <span className="mx-2 text-slate-400">|</span>
                        <span className="text-slate-500 font-normal">
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                      {edu.location && (
                        <div className="text-xs text-slate-500">{edu.location}</div>
                      )}
                      {edu.description && <p className="text-sm text-slate-700 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-primary-500 rounded"></div>
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-slate-900">{proj.name}</h3>
                      {proj.link && (
                        <a href={proj.link} className="text-xs text-primary-600 break-all">{proj.link}</a>
                      )}
                      <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
                      {proj.technologies.length > 0 && (
                        <p className="text-sm text-slate-600 mt-1">
                          <span className="font-medium">Tech:</span> {proj.technologies.join(', ')}
                        </p>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Certifications</h2>
                <ul className="space-y-1">
                  {certifications.map((cert) => (
                    <li key={cert} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Languages</h2>
                <ul className="space-y-1">
                  {languages.map((lang) => (
                    <li key={lang} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
