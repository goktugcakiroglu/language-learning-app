// backend/src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import wordRoutes from './routes/wordRoutes';

const app: Application = express();

app.use(cors());
// Middleware
app.use(express.json()); // Gelen JSON verilerini parse eder

// Kök dizin (/) için karşılama rotası
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: "Dil Öğrenme API'sine Hoş Geldiniz! Analiz için /api/words/analyze?word=kelime&lang=dil adresini kullanın." 
  });
});

// Rotalar
app.use('/api/words', wordRoutes);

export default app;