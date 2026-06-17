import { useCVStore } from '../store/cvStore';
import type { TabType } from '../types';
import { FileText, Briefcase, Sparkles, Download, Wand2 } from 'lucide-react';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <FileText size={18} /> },
  { id: 'job', label: 'Job Description', icon: <Briefcase size={18} /> },
  { id: 'preview', label: 'Preview', icon: <Sparkles size={18} /> },
  { id: 'export', label: 'Export', icon: <Download size={18} /> },
];

export default function Header() {
  const { activeTab, setActiveTab, tailoredCV } = useCVStore();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Wand2 size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">AI CV Maker</span>
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          {tailoredCV && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-slate-500">Match Score:</span>
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      tailoredCV.matchScore.overall >= 80
                        ? 'bg-green-500'
                        : tailoredCV.matchScore.overall >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${tailoredCV.matchScore.overall}%` }}
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    tailoredCV.matchScore.overall >= 80
                      ? 'text-green-600'
                      : tailoredCV.matchScore.overall >= 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {tailoredCV.matchScore.overall}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
