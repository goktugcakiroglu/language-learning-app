// backend/src/services/WordService.ts
import { IWordRepository } from '../repositories/IWordRepository';
import { LinguisticDetail } from '../types';

export class WordService {

  private cache: Map<string, LinguisticDetail> = new Map();
  // Dependency Injection: Dışarıdan IWordRepository arayüzünü uygulayan bir sınıf bekliyoruz
  constructor(private wordRepository: IWordRepository) {}

  public async analyzeWord(word: string, languageCode: string): Promise<LinguisticDetail> {
    const cleanWord = word.trim().toLowerCase();
    const cleanLangCode = languageCode.trim().toLowerCase();
    
    // Önbellek Anahtarı (Örn: "console-en")
    const cacheKey = `${cleanWord}-${cleanLangCode}`;

    // 1. Veri önbellekte varsa, anında döndür (Gemini'ye gitme!)
    if (this.cache.has(cacheKey)) {
      console.log(`[Cache Hit] ${cleanWord} bellekten saniyeler içinde getirildi.`);
      return this.cache.get(cacheKey)!;
    }

    console.log(`[Cache Miss] ${cleanWord} için Gemini API'ye gidiliyor... (Bu biraz sürebilir)`);
    
    // 2. Yoksa Gemini'den çek
    const result = await this.wordRepository.getWordAnalysis(cleanWord, cleanLangCode);
    
    // 3. Gelecekteki aramalar için hafızaya kaydet
    this.cache.set(cacheKey, result);
    
    return result;
  }
}