import axios from 'axios';
import type { LinguisticDetail } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const analyzeWord = async (word: string, lang: string = 'en'): Promise<LinguisticDetail> => {
  const response = await axios.get(`${API_BASE_URL}/words/analyze`, { params: { word, lang } });
  return response.data.data;
};