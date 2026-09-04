// backend/src/strategies/EnglishStrategy.ts
import { ILanguageStrategy } from '../types';

export class EnglishStrategy implements ILanguageStrategy {
  
  getLanguageName(): string {
    return 'English';
  }

  generatePrompt(word: string): string {
    // Gemini'ye Structured Output (JSON) vermesi için kesin talimatlar
    return `
You are an expert linguist and etymologist. Analyze the English word "${word}".
CRITICAL INSTRUCTION: ALL output, including explanations, contexts, and meanings, MUST be strictly in ENGLISH. Do not use any Turkish or other languages.

Respond EXACTLY with a valid JSON object in the following structure, without any markdown formatting like \`\`\`json:
{
  "word": "${word}",
  "etymology": {
    "root": "root word or proto-word",
    "originLanguage": "Language of origin (e.g., Latin, Greek, Old English)",
    "meaning": "Meaning of the root word in English"
  },
  "affixes": [
    {
      "morpheme": "the prefix or suffix",
      "type": "prefix or suffix",
      "meaning": "Meaning of this affix in English"
    }
  ],
  "definitions": [
    {
      "context": "Context or field (e.g., Psychology, General, Finance) in English",
      "meaning": "Clear definition in English",
      "exampleSentence": "A highly descriptive, real-world example sentence in English."
    }
  ],
  "synonyms": ["synonym1", "synonym2", "synonym3"],
  "antonyms": ["antonym1", "antonym2", "antonym3"],
  "relatedWords": ["related concept 1", "related concept 2", "related concept 3"],
  "tags": ["#tag1", "#tag2", "#tag3"],
  "visualConcept": {
    "description": "A highly detailed, cinematic, and descriptive English prompt for an AI image generator to represent the meaning of this word.",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"]
  }
}`;
  }
}