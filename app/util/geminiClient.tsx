// src/utils/googleAIClient.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY is not defined in environment variables');
}

// Assuming these are the correct constructors
const geminiClient = new GoogleGenerativeAI(apiKey);

export { geminiClient };