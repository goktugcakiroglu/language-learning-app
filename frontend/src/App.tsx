import { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpen, ChevronRight, Globe } from 'lucide-react';
import { analyzeWord } from './services/api';
import type { LinguisticDetail } from './types';
import WordGraph from './components/WordGraph';

export default function App() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<LinguisticDetail | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const fetchAnalysis = async (searchWord: string) => {
    if (!searchWord.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const data = await analyzeWord(searchWord, 'en');
      setResult(data);
      setWord(searchWord);
      setShowDetails(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnalysis(word);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-all ${result ? 'p-4' : 'p-6 md:p-12 items-center justify-center'}`}>
      
      <div className={`w-full transition-all duration-500 flex flex-shrink-0 ${result ? 'flex-col md:flex-row items-center justify-between gap-4 mb-4' : 'flex-col items-center max-w-2xl mb-10'}`}>
        <div className={`flex items-center gap-3 ${result ? '' : 'flex-col text-center mb-6'}`}>
          <div className="p-3 bg-primary-100 text-primary-500 rounded-2xl">
            <Sparkles size={result ? 24 : 32} />
          </div>
          <div>
            <h1 className={`font-bold text-slate-800 dark:text-slate-100 ${result ? 'text-2xl' : 'text-4xl mb-3'}`}>Language Detective</h1>
            {!result && <p className="text-slate-500 dark:text-slate-400">Discover the origins and hidden stories of words.</p>}
          </div>
        </div>

        <form onSubmit={handleSearch} className={`relative w-full ${result ? 'max-w-md' : 'max-w-3xl'}`}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Type an English word..."
            className="w-full pl-5 pr-14 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-primary-50/50 shadow-sm focus:border-primary-500 outline-none transition-all"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !word.trim()} className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          </button>
        </form>
      </div>

      {error && <div className="w-full p-4 mb-4 bg-red-50 text-red-600 rounded-xl text-center">{error}</div>}

      {result && (
        <div className="flex-1 w-full flex flex-col md:flex-row gap-4 min-h-0 animate-fade-in">
          
          <div className="flex-1 relative bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col min-h-[500px]">
            {!showDetails && (
              <button 
                onClick={() => setShowDetails(true)}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur shadow-md rounded-xl text-slate-700 hover:text-primary-600 font-medium border border-slate-200 transition-all"
              >
                <BookOpen size={18} />
                Show Details
              </button>
            )}
            <div className="flex-1 w-full h-full">
              <WordGraph data={result} onWordClick={fetchAnalysis} />
            </div>
          </div>

          {showDetails && (
            <div className="w-full md:w-[400px] flex flex-col gap-4 overflow-y-auto shrink-0 animate-fade-in pb-4 pr-1">
              
              <div className="flex items-center justify-between bg-slate-200/50 dark:bg-slate-800/50 p-1 pr-2 rounded-2xl shrink-0">
                <div className="flex gap-1 flex-wrap overflow-hidden pl-2">
                  {result.tags?.slice(0,3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold shadow-sm">#{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={() => setShowDetails(false)} 
                  className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-500 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Dictionary Meanings */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Dictionary Meanings</h3>
                <div className="flex flex-col gap-4">
                  {result.definitions.map((def, idx) => (
                    <div key={idx} className="border-l-2 border-primary-500 pl-3">
                      <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                        <span className="text-primary-500 mr-2">[{def.context}]</span>{def.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YENİ EKLENEN: Related Concepts (Semantic Clustering - Tıklanabilir Rabbit Hole) */}
              {result.relatedWords && result.relatedWords.length > 0 && (
                <div className="bg-primary-50/50 dark:bg-primary-900/10 p-5 rounded-3xl border border-primary-100 dark:border-primary-800/30 shadow-sm shrink-0">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-sm">Related Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedWords.map(rw => (
                      <button 
                        key={rw}
                        onClick={() => fetchAnalysis(rw)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-medium border border-primary-100 dark:border-primary-900 hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors shadow-sm cursor-pointer"
                      >
                        {rw}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Real World Usage (Google Search Simulation) */}
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-primary-500" /> Web Examples
                </h3>
                <div className="flex flex-col gap-3">
                  {result.definitions.map((def, idx) => (
                    <div key={`web-${idx}`} className="text-sm">
                      <p className="text-slate-500 dark:text-slate-400 italic">"{def.exampleSentence}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Generated Image Card */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm shrink-0">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">AI Visual Memory</h3>
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-indigo-100 dark:bg-indigo-900 mb-3 relative">
                  {/* Dinamik Yapay Zeka Görsel Üreticisi */}
                  <img 
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(result.visualConcept.description + ' ' + result.word)}?width=600&height=400&nologo=true`} 
                    alt={result.word}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.visualConcept.keywords.map(kw => (
                    <span key={kw} className="bg-white/80 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
          
        </div>
      )}
    </div>
  );
}