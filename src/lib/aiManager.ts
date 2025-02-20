import { initializeGemini, analyzeSentiment as analyzeGemini, generateCustomResponse as generateGeminiResponse } from './gemini';
import { initializeDeepseek, analyzeSentimentDeepseek, generateCustomResponseDeepseek } from './deepseek';

export type AIModel = 'gemini' | 'deepseek';

export interface AIResponse {
  model: AIModel;
  sentiment: {
    label: string;
    score: number;
    suggestedResponse: string;
    analysis: {
      toxicity: number;
      spam_probability: number;
      key_topics: string[];
      requires_human_review: boolean;
      priority_level: string;
      response_tone: string;
    };
  };
}

export const initializeAI = async (geminiKey: string, deepseekKey: string) => {
  console.log('Starting AI initialization...');
  
  if (!geminiKey || !deepseekKey) {
    throw new Error('API keys are required for initialization');
  }

  const errors: string[] = [];
  
  try {
    // Initialize both models sequentially for better error tracking
    try {
      console.log('Initializing Gemini...');
      await initializeGemini(geminiKey);
      console.log('Gemini initialized successfully');
    } catch (error) {
      console.error('Gemini initialization error:', error);
      errors.push(`Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    try {
      console.log('Initializing OpenRouter/DeepSeek...');
      await initializeDeepseek(deepseekKey);
      console.log('OpenRouter/DeepSeek initialized successfully');
    } catch (error) {
      console.error('OpenRouter/DeepSeek initialization error:', error);
      errors.push(`DeepSeek: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    if (errors.length > 0) {
      throw new Error(`Failed to initialize AI services: ${errors.join(', ')}`);
    }

    console.log('All AI services initialized successfully');
  } catch (error) {
    console.error('Error during AI initialization:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export const analyzeWithBothModels = async (text: string): Promise<AIResponse[]> => {
  console.log('Starting analysis with both models...', { text });
  const responses: AIResponse[] = [];
  const errors: string[] = [];

  // Run both analyses in parallel
  const [geminiResult, deepseekResult] = await Promise.allSettled([
    analyzeGemini(text).then(result => {
      console.log('Gemini analysis completed:', result);
      return {
        model: 'gemini' as AIModel,
        sentiment: result
      };
    }).catch(error => {
      console.error('Gemini analysis error:', error);
      throw error;
    }),
    analyzeSentimentDeepseek(text).then(result => {
      console.log('DeepSeek analysis completed:', result);
      return {
        model: 'deepseek' as AIModel,
        sentiment: result
      };
    }).catch(error => {
      console.error('DeepSeek analysis error:', error);
      throw error;
    })
  ]);

  // Handle Gemini result
  if (geminiResult.status === 'fulfilled') {
    responses.push(geminiResult.value);
    console.log('Added Gemini response:', geminiResult.value);
  } else {
    console.error('Error with Gemini analysis:', geminiResult.reason);
    errors.push(`Gemini analysis failed: ${geminiResult.reason.message}`);
  }

  // Handle DeepSeek result
  if (deepseekResult.status === 'fulfilled') {
    responses.push(deepseekResult.value);
    console.log('Added DeepSeek response:', deepseekResult.value);
  } else {
    console.error('Error with DeepSeek analysis:', deepseekResult.reason);
    errors.push(`DeepSeek analysis failed: ${deepseekResult.reason.message}`);
  }

  console.log('Analysis complete. Responses:', responses);
  console.log('Errors:', errors);

  if (responses.length === 0) {
    const errorMessage = `All AI models failed to analyze the text. Errors: ${errors.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return responses;
};

export const generateCustomResponseWithModel = async (
  text: string,
  model: AIModel,
  brandTone: "formal" | "casual" | "empathetic" = "casual"
) => {
  console.log(`Generating custom response with ${model}...`, { text, brandTone });
  try {
    let response;
    switch (model) {
      case 'gemini':
        response = await generateGeminiResponse(text, brandTone);
        break;
      case 'deepseek':
        response = await generateCustomResponseDeepseek(text, brandTone);
        break;
      default:
        throw new Error('Invalid AI model specified');
    }
    console.log(`${model} response generated:`, response);
    return response;
  } catch (error) {
    console.error(`Error generating response with ${model}:`, error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}; 