// backend/src/factories/LanguageStrategyFactory.ts
import { ILanguageStrategy } from '../types';
import { EnglishStrategy } from '../strategies/EnglishStrategy';
// İleride buraya SpanishStrategy vb. eklenecek

export class LanguageStrategyFactory {
  /**
   * İstenen dil koduna göre uygun strateji sınıfını döndürür.
   */
  public static getStrategy(languageCode: string): ILanguageStrategy {
    switch (languageCode.toLowerCase()) {
      case 'en':
      case 'english':
        return new EnglishStrategy();
        
      // case 'es':
      //   return new SpanishStrategy();
        
      default:
        throw new Error(`Unsupported language code: ${languageCode}`);
    }
  }
}