import { useState } from 'react';
import { useCVStore } from '../store/cvStore';
import { tailorCV, generateOptimizedSummary } from '../ai/aiEngine';
import { Zap, Check, AlertTriangle, ArrowRight, Lightbulb, TrendingUp, Target, BookOpen, Loader2 } from 'lucide-react';

export default function JobAnalyzer() {
  const { cv, jobDescription, setJobDescription, tailoredCV, setTailoredCV, setIsTailoring, isTailoring, updatePersonalInfo } = useCVStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsTailoring(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = tailorCV(cv, jobDescription);
      setTailoredCV(result);
      setIsTailoring(false);
      setShowSuggestions(true);
    }, 1500);
  };

  const handleGenerateSummary = () => {
    if (!jobDescription.trim()) return;
    const summary = generateOptimizedSummary(cv, jobDescription);
    updatePersonalInfo({ summary });
  };

  const applyReorder = () => {
    if (!tailoredCV) return;
    const { tailored } = tailoredCV;
    useCVStore.getState().setCV({
      ...cv,
      experience: tailored.experience,
      skills: tailored.skills,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-red';
      case 'medium': return 'badge-yellow';
      case 'low': return 'badge-blue';
      default: return 'badge';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Job Description Analyzer</h2>
        <p className="text-sm text-slate-500">Paste a job description and let AI optimize your CV</p>
      </div>

      <div className="card">
        <label className="form-label flex items-center gap-2">
          <BookOpen size={16} />
          Paste Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here. Our AI will analyze keywords, required skills, experience level, and responsibilities to optimize your CV..."
          rows={10}
          className="w-full"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isTailoring}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {isTailoring ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap size={18} />
                Analyze & Optimize
              </>
            )}
          </button>
          <button
            onClick={handleGenerateSummary}
            disabled={!jobDescription.trim()}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <Lightbulb size={18} />
            Generate Summary
          </button>
        </div>
      </div>

      {tailoredCV && showSuggestions && (
        <div className="space-y-6 animate-fade-in">
          {/* Match Score Card */}
          <div className="card">
            <h3 className="section-title">
              <Target size={18} />
              Match Score Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ScoreCard
                label="Overall"
                score={tailoredCV.matchScore.overall}
                icon={<TrendingUp size={16} />}
              />
              <ScoreCard
                label="Skills"
                score={tailoredCV.matchScore.skills}
                icon={<Zap size={16} />}
              />
              <ScoreCard
                label="Experience"
                score={tailoredCV.matchScore.experience}
                icon={<BookOpen size={16} />}
              />
              <ScoreCard
                label="Keywords"
                score={tailoredCV.matchScore.keywords}
                icon={<Target size={16} />}
              />
              <ScoreCard
                label="Education"
                score={tailoredCV.matchScore.education}
                icon={<Lightbulb size={16} />}
              />
            </div>
          </div>

          {/* Extracted Requirements */}
          <div className="card">
            <h3 className="section-title">
              <Target size={18} />
              Extracted Job Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {tailoredCV.jobRequirements.skills.map(skill => (
                    <span key={skill} className={`badge ${cv.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())) ? 'badge-green' : 'badge-red'}`}>
                      {skill}
                    </span>
                  ))}
                  {tailoredCV.jobRequirements.skills.length === 0 && (
                    <span className="text-sm text-slate-400">No specific skills detected</span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Seniority Level</h4>
                <span className="badge-blue capitalize">{tailoredCV.jobRequirements.seniority}</span>
                <h4 className="text-sm font-semibold text-slate-700 mb-2 mt-3">Industry</h4>
                <span className="badge-purple capitalize">{tailoredCV.jobRequirements.industry}</span>
              </div>
            </div>
            {tailoredCV.jobRequirements.keywords.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Top Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {tailoredCV.jobRequirements.keywords.slice(0, 15).map(kw => (
                    <span key={kw} className="badge bg-slate-100 text-slate-700">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="card">
            <h3 className="section-title">
              <Lightbulb size={18} />
              AI Optimization Suggestions
            </h3>
            <div className="space-y-3">
              {tailoredCV.suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)} ${suggestion.applied ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={getPriorityBadge(suggestion.priority)}>{suggestion.priority}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">{suggestion.section}</span>
                      </div>
                      <p className={`text-sm ${suggestion.applied ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {suggestion.message}
                      </p>
                    </div>
                    {suggestion.type === 'reorder' && !suggestion.applied && (
                      <button
                        onClick={applyReorder}
                        className="btn-primary text-xs py-1 px-2 flex items-center gap-1"
                      >
                        <ArrowRight size={12} />
                        Apply
                      </button>
                    )}
                    {suggestion.applied && (
                      <Check size={18} className="text-green-600" />
                    )}
                  </div>
                </div>
              ))}
              {tailoredCV.suggestions.length === 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={18} />
                  <span>Your CV looks great for this position! No major suggestions.</span>
                </div>
              )}
            </div>
          </div>

          {/* Warning if score is low */}
          {tailoredCV.matchScore.overall < 50 && (
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Low Match Score</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your CV has a low match score for this position. Consider adding more relevant skills,
                    tailoring your experience descriptions, and highlighting achievements that align with the job requirements.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
  const bgColor = score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <div className={`${bgColor} rounded-lg p-3 text-center`}>
      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{score}%</div>
    </div>
  );
}
