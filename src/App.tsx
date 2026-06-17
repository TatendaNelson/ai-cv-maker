import { useCVStore } from './store/cvStore';
import Header from './components/Header';
import ProfileBuilder from './components/ProfileBuilder';
import JobAnalyzer from './components/JobAnalyzer';
import CVPreview from './components/CVPreview';
import ExportPage from './components/ExportPage';

function App() {
  const { activeTab } = useCVStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && <ProfileBuilder />}
        {activeTab === 'job' && <JobAnalyzer />}
        {activeTab === 'preview' && <CVPreview />}
        {activeTab === 'export' && <ExportPage />}
      </main>
    </div>
  );
}

export default App;
