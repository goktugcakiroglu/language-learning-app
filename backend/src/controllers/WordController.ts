// backend/src/controllers/WordController.ts
import { Request, Response } from 'express';
import { WordService } from '../services/WordService';

export class WordController {
  // Controller, iş mantığını yürütmesi için Service'e ihtiyaç duyar
  constructor(private wordService: WordService) {}

  /**
   * GET /api/words/analyze?word=hello&lang=en
   */
  public analyze = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. İstekten parametreleri al (Query params kullanıyoruz)
      const word = req.query.word as string;
      const lang = req.query.lang as string;

      // Hızlı HTTP Validasyonu
      if (!word || !lang) {
        res.status(400).json({ 
          success: false, 
          message: "Lütfen 'word' ve 'lang' query parametrelerini sağlayın." 
        });
        return; // İşlemi sonlandır
      }

      // 2. İş mantığını (Service) çağır
      const result = await this.wordService.analyzeWord(word, lang);

      // 3. Başarılı yanıtı dön
      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error: any) {
      console.error("[WordController] Hata:", error.message);
      
      // 4. Hata durumunu yönet
      res.status(500).json({ 
        success: false, 
        message: error.message || "Sunucu tarafında bir hata oluştu." 
      });
    }
  };
}