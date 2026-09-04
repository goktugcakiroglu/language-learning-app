// backend/src/server.ts
import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Dil Öğrenme API'si çalışıyor: http://localhost:${PORT}`);
});