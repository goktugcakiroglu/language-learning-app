// backend/src/routes/wordRoutes.ts
import { Router } from 'express';
import { WordController } from '../controllers/WordController';
import { WordService } from '../services/WordService';
import { GeminiWordRepository } from '../repositories/GeminiWordRepository';

const router = Router();

// Bağımlılıkları (Dependencies) birbirine bağlıyoruz
const wordRepository = new GeminiWordRepository();
const wordService = new WordService(wordRepository);
const wordController = new WordController(wordService);

// GET /api/words/analyze
router.get('/analyze', wordController.analyze);

export default router;