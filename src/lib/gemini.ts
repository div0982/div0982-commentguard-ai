import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenerativeAI(apiKey);
};

export const analyzeSentiment = async (text: string) => {
  if (!genAI) {
    throw new Error("Gemini AI not initialized");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Analyze this social media comment and provide a detailed response in the following JSON format:
  {
    "label": "positive" or "negative" or "neutral",
    "score": number between 0 and 1,
    "summary": "A 1-2 sentence summary highlighting sentiment, key topics, and urgency",
    "suggestedResponse": "an appropriate customer service response",
    "analysis": {
      "toxicity": number between 0 and 1,
      "spam_probability": number between 0 and 1,
      "key_topics": ["topic1", "topic2"],
      "requires_human_review": boolean,
      "priority_level": "low" or "medium" or "high",
      "response_tone": "formal" or "casual" or "empathetic"
    }
  }

  Guidelines:
  - Provide a clear, concise summary that captures the main points and sentiment
  - If comment is negative/sensitive, set requires_human_review to true
  - Set priority based on urgency and sentiment
  - List key topics mentioned
  - Choose response tone based on context

  Comment to analyze: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : text;
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      console.error('Raw response:', text);
      throw new Error('Failed to parse Gemini response');
    }
  } catch (error) {
    console.error('Error in Gemini analysis:', error);
    throw error;
  }
};

export const generateCustomResponse = async (text: string, brandTone: "formal" | "casual" | "empathetic" = "casual") => {
  if (!genAI) {
    throw new Error("Gemini AI not initialized");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a customer service response to this social media comment. 
  Use a ${brandTone} tone. The response should be professional, helpful, and align with social media best practices.
  
  Comment: "${text}"
  
  Return only the response text, no JSON formatting.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
