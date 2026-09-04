// backend/src/repositories/GeminiWordRepository.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IWordRepository } from './IWordRepository';
import { LinguisticDetail } from '../types';
import { LanguageStrategyFactory } from '../factories/LanguageStrategyFactory';

// Not: İleride burada @google/generative-ai kütüphanesini içeri aktaracağız.

export class GeminiWordRepository implements IWordRepository {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY .env dosyasında bulunamadı! Lütfen kontrol edin.");
    }
    // Gemini İstemcisini başlat
    this.genAI = new GoogleGenerativeAI(apiKey);
  }
  
  public async getWordAnalysis(word: string, languageCode: string, targetLanguage: string = 'Turkish'): Promise<LinguisticDetail> {
    try {
      // 1. Doğru stratejiyi fabrikadan al
      const strategy = LanguageStrategyFactory.getStrategy(languageCode);
      
      // 2. Gemini için stratejiye uygun prompt'u üret
      const prompt = strategy.generatePrompt(word);
      
      console.log(`[Gemini API] "${word}" kelimesi analiz ediliyor...`);
      
      const model = this.genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Güvenlik katmanı: Gemini bazen saf JSON yerine Markdown kod blokları (```json ... ```) dönebilir.
      // JSON.parse() patlamasın diye bu Markdown etiketlerini temizliyoruz.
      const cleanJson = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      
      const data: LinguisticDetail = JSON.parse(cleanJson);
      return data;

    } catch (error: any) {
      console.error("[Gemini API] Hata detayı:", error.message);
      throw new Error("Kelime analizi alınırken yapay zeka servisinde bir hata oluştu.");
    }
  }
}