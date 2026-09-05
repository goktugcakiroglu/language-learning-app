// backend/src/types/index.ts

export interface Etymology {
  root: string;
  originLanguage: string;
  meaning: string;
}

export interface Affix {
  morpheme: string; // Ek'in kendisi (örn: "un-", "-able")
  type: 'prefix' | 'suffix';
  meaning: string;
}

// Yeni eklendi: Birden fazla anlam ve kullanım senaryosu için
export interface Definition {
  meaning: string;
  context: string; // Hangi bağlamda kullanıldığı (örn: teknoloji, psikoloji)
  exampleSentence: string;
}

export interface VisualConcept {
  description: string; // Görselleştirme için AI'a verilebilecek prompt
  keywords: string[];
}

export interface LinguisticDetail {
  word: string;
  language: string;
  definitions: Definition[]; // Tek çeviri yerine dizi (Array) kullanıyoruz
  tags: string[]; // Kategorizasyon için (örn: "emotion", "latin-root")
  etymology: Etymology;
  affixes: Affix[];
  synonyms: string[];
  antonyms: string[];
  relatedWords?: string[];
  visualConcept: VisualConcept;
  translation?: string;
}

// Strateji arayüzü: Tüm dil stratejileri bu kontratı uygulamak zorundadır.
export interface ILanguageStrategy {
  getLanguageName(): string;
  generatePrompt(word: string): string;
}