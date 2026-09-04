// backend/src/repositories/IWordRepository.ts
import { LinguisticDetail } from '../types';

export interface IWordRepository {
  /**
   * Bir kelimenin dilbilimsel analizini getirir.
   */
  getWordAnalysis(word: string, languageCode: string, targetLanguage?: string): Promise<LinguisticDetail>;
}