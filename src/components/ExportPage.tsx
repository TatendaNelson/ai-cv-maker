import { useState } from 'react';
import { useCVStore } from '../store/cvStore';
import { Download, Copy, Check, FileJson, FileText } from 'lucide-react';

export default function ExportPage() {
  const { cv, tailoredCV } = useCVStore();
  const [copied, setCopied] = useState(false);
  const [useTailored, setUseTailored] = useState(false);

  const displayCV = useTailored && tailoredCV ? tailoredCV.tailored : cv;

  const exportJSON = () => {
    const dataStr = JSON.stringify(displayCV, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${displayCV.personalInfo.firstName}_${displayCV.personalInfo.lastName}_CV.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = generatePlainTextCV(displayCV);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Export Your CV</h2>
        <p className="text-sm text-slate-500">Download in multiple formats</p>
      </div>

      {tailoredCV && (
        <div className="card">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={useTailored}
              onChange={e => setUseTailored(e.target.checked)}
              className="rounded border-slate-300"
            />
            Use AI-tailored version for export
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExportCard
          title="Export as PDF"
          description="Professional A4 format, ready for printing or emailing"
          icon={<FileText size={24} />}
          onClick={() => exportPDFFromPreview()}
          buttonText="Download PDF"
          color="bg-red-50 text-red-600"
        />
        <ExportCard
          title="Export as JSON"
          description="Structured data format for backup or integration"
          icon={<FileJson size={24} />}
          onClick={exportJSON}
          buttonText="Download JSON"
          color="bg-blue-50 text-blue-600"
        />
        <ExportCard
          title="Copy Plain Text"
          description="Simple text format for ATS systems and job boards"
          icon={copied ? <Check size={24} /> : <Copy size={24} />}
          onClick={copyToClipboard}
          buttonText={copied ? 'Copied!' : 'Copy Text'}
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Plain Text Preview */}
      <div className="card">
        <h3 className="section-title">
          <FileText size={18} />
          Plain Text Preview (ATS-Optimized)
        </h3>
        <pre className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 overflow-auto whitespace-pre-wrap font-mono">
          {generatePlainTextCV(displayCV)}
        </pre>
      </div>
    </div>
  );
}

function ExportCard({ title, description, icon, onClick, buttonText, color }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonText: string;
  color: string;
}) {
  return (
    <div className="card flex flex-col items-center text-center gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
      <button onClick={onClick} className="btn-primary w-full mt-auto">
        <Download size={16} />
        {buttonText}
      </button>
    </div>
  );
}

function generatePlainTextCV(cv: ReturnType<typeof useCVStore.getState>['cv']): string {
  const lines: string[] = [];
  
  lines.push(`${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`.toUpperCase());
  lines.push('');
  lines.push(`Email: ${cv.personalInfo.email}`);
  lines.push(`Phone: ${cv.personalInfo.phone}`);
  if (cv.personalInfo.location) lines.push(`Location: ${cv.personalInfo.location}`);
  if (cv.personalInfo.linkedin) lines.push(`LinkedIn: ${cv.personalInfo.linkedin}`);
  if (cv.personalInfo.website) lines.push(`Website: ${cv.personalInfo.website}`);
  lines.push('');
  lines.push('=' .repeat(50));
  lines.push('');
  
  if (cv.personalInfo.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('-'.repeat(30));
    lines.push(cv.personalInfo.summary);
    lines.push('');
  }
  
  if (cv.experience.length > 0) {
    lines.push('WORK EXPERIENCE');
    lines.push('-'.repeat(30));
    cv.experience.forEach(exp => {
      lines.push(`${exp.position} | ${exp.company}`);
      lines.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate} | ${exp.location}`);
      if (exp.description) lines.push(exp.description);
      exp.highlights.forEach(h => lines.push(`  • ${h}`));
      lines.push('');
    });
  }
  
  if (cv.education.length > 0) {
    lines.push('EDUCATION');
    lines.push('-'.repeat(30));
    cv.education.forEach(edu => {
      lines.push(`${edu.degree} in ${edu.field}`);
      lines.push(`${edu.institution} | ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`);
      if (edu.description) lines.push(edu.description);
      lines.push('');
    });
  }
  
  if (cv.skills.length > 0) {
    lines.push('SKILLS');
    lines.push('-'.repeat(30));
    lines.push(cv.skills.join(', '));
    lines.push('');
  }
  
  if (cv.projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('-'.repeat(30));
    cv.projects.forEach(proj => {
      lines.push(`${proj.name}${proj.link ? ` (${proj.link})` : ''}`);
      lines.push(proj.description);
      if (proj.technologies.length > 0) lines.push(`Technologies: ${proj.technologies.join(', ')}`);
      proj.highlights.forEach(h => lines.push(`  • ${h}`));
      lines.push('');
    });
  }
  
  if (cv.certifications.length > 0) {
    lines.push('CERTIFICATIONS');
    lines.push('-'.repeat(30));
    cv.certifications.forEach(c => lines.push(`  • ${c}`));
    lines.push('');
  }
  
  if (cv.languages.length > 0) {
    lines.push('LANGUAGES');
    lines.push('-'.repeat(30));
    cv.languages.forEach(l => lines.push(`  • ${l}`));
    lines.push('');
  }
  
  return lines.join('\n');
}

function exportPDFFromPreview() {
  // This will be handled by the CVPreview component's export button
  // We trigger a click on the hidden preview export button
  const previewExportBtn = document.querySelector('[data-export-pdf]') as HTMLButtonElement;
  if (previewExportBtn) previewExportBtn.click();
}
