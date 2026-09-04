export interface Etymology {
  root: string;
  originLanguage: string;
  meaning: string;
}

export interface Affix {
  morpheme: string;
  type: 'prefix' | 'suffix';
  meaning: string;
}

export interface Definition {
  meaning: string;
  context: string;
  exampleSentence: string;
}

export interface VisualConcept {
  description: string;
  keywords: string[];
}

export interface LinguisticDetail {
  word: string;
  language: string;
  definitions: Definition[]; // Çoklu anlamlar eklendi
  tags: string[];            // Kategoriler eklendi
  etymology: Etymology;
  affixes: Affix[];
  synonyms: string[];
  antonyms: string[];
  relatedWords?: string[];
  visualConcept: VisualConcept;
}