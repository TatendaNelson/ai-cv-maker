import { useState, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import type { TemplateType } from '../types';
import { TemplateModern } from '../templates/TemplateModern';
import { TemplateClassic } from '../templates/TemplateClassic';
import { TemplateMinimal } from '../templates/TemplateMinimal';
import { TemplateCreative } from '../templates/TemplateCreative';
import { Eye, FileText, Layout, Palette, Monitor } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const templates: { id: TemplateType; name: string; description: string; icon: React.ReactNode }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean, professional with sidebar', icon: <Layout size={16} /> },
  { id: 'classic', name: 'Classic', description: 'Traditional ATS-friendly format', icon: <FileText size={16} /> },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', icon: <Palette size={16} /> },
  { id: 'creative', name: 'Creative', description: 'Bold and distinctive', icon: <Monitor size={16} /> },
];

export default function CVPreview() {
  const { cv, tailoredCV, activeTemplate, setActiveTemplate } = useCVStore();
  const [useTailored, setUseTailored] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const displayCV = useTailored && tailoredCV ? tailoredCV.tailored : cv;

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'modern':
        return <TemplateModern cv={displayCV} />;
      case 'classic':
        return <TemplateClassic cv={displayCV} />;
      case 'minimal':
        return <TemplateMinimal cv={displayCV} />;
      case 'creative':
        return <TemplateCreative cv={displayCV} />;
      default:
        return <TemplateModern cv={displayCV} />;
    }
  };

  const exportPDF = async () => {
    if (!cvRef.current) return;
    const element = cvRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    let imgY = 0;
    let heightLeft = imgHeight * ratio;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    heightLeft -= pdfHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight * ratio;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pdfHeight;
    }
    
    pdf.save(`${displayCV.personalInfo.firstName}_${displayCV.personalInfo.lastName}_CV.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">CV Preview</h2>
        <div className="flex items-center gap-3">
          {tailoredCV && (
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={useTailored}
                onChange={e => setUseTailored(e.target.checked)}
                className="rounded border-slate-300"
              />
              Use tailored version
            </label>
          )}
        </div>
      </div>

      {/* Template Selector */}
      <div className="card">
        <h3 className="section-title">
          <Palette size={18} />
          Choose Template
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                activeTemplate === template.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                activeTemplate === template.id ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {template.icon}
              </div>
              <div className="font-semibold text-sm">{template.name}</div>
              <div className="text-xs text-slate-500">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CV Preview */}
      <div className="no-print">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-slate-600" />
            <span className="text-sm font-medium text-slate-600">Live Preview</span>
          </div>
          <button
            onClick={exportPDF}
            className="btn-primary flex items-center gap-2"
          >
            <FileText size={18} />
            Export PDF
          </button>
        </div>
        <div className="overflow-auto bg-slate-100 rounded-xl p-4">
          <div ref={cvRef} className="a4-paper">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
