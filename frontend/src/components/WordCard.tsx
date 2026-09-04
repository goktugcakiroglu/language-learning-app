import { BookOpen, History, Image as ImageIcon, GitMerge } from 'lucide-react';
import type { LinguisticDetail } from '../types';

export default function WordCard({ data }: { data: LinguisticDetail }) {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-6 animate-fade-in">
      {/* Kelime Başlığı ve Çeviri */}
      <div className="p-6 bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-primary-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-primary-900 dark:text-primary-100 capitalize">
            {data.word}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <BookOpen size={18} /> {data.translation}
          </p>
        </div>
        <span className="px-4 py-2 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 rounded-full font-medium text-sm">
          {data.language}
        </span>
      </div>

      {/* Etimoloji (Köken) Kartı */}
      <div className="p-6 bg-amber-50 dark:bg-slate-800/50 rounded-3xl border border-amber-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-400 flex items-center gap-2 mb-3">
          <History size={20} /> Etimolojik Köken
        </h3>
        <p className="text-amber-800 dark:text-slate-300">
          <span className="font-bold">{data.etymology.originLanguage}</span> kökenli 
          "<span className="italic">{data.etymology.root}</span>" kelimesinden gelir. 
          Anlamı: {data.etymology.meaning}.
        </p>
      </div>

      {/* Ekler (Morfologik Analiz) */}
      {data.affixes.length > 0 && (
        <div className="p-6 bg-emerald-50 dark:bg-slate-800/50 rounded-3xl border border-emerald-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <GitMerge size={20} /> Ek Analizi (Prefix / Suffix)
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.affixes.map((affix, index) => (
              <div key={index} className="px-4 py-2 bg-white dark:bg-surface-dark rounded-xl shadow-sm flex flex-col">
                <span className="text-emerald-600 font-bold">{affix.morpheme}</span>
                <span className="text-xs text-slate-500 capitalize">{affix.type}: {affix.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Görsel Konsept */}
      <div className="p-6 bg-indigo-50 dark:bg-slate-800/50 rounded-3xl border border-indigo-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 flex items-center gap-2 mb-3">
          <ImageIcon size={20} /> Görsel Hafıza
        </h3>
        <p className="text-indigo-800 dark:text-slate-300 mb-4 italic">
          "{data.visualConcept.description}"
        </p>
        <div className="flex flex-wrap gap-2">
          {data.visualConcept.keywords.map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-white dark:bg-surface-dark text-indigo-500 rounded-lg text-xs font-medium shadow-sm">
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}