import OpenAI from 'openai';

let openaiClient: OpenAI;

export const initializeDeepseek = (apiKey: string) => {
  openaiClient = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    defaultHeaders: {
      "HTTP-Referer": "commentguard-ai",
      "X-Title": "CommentGuard AI"
    },
    dangerouslyAllowBrowser: true  // Allow browser usage
  });
  console.log('DeepSeek client initialized');
};

export const analyzeSentimentDeepseek = async (text: string) => {
  if (!openaiClient) {
    throw new Error("DeepSeek AI not initialized");
  }

  const prompt = `Analyze this social media comment and provide a detailed response in the following JSON format:
  {
    "sentiment": {
      "label": "positive" or "negative" or "neutral",
      "score": number between 0 and 1,
      "summary": "A 1-2 sentence summary highlighting sentiment, key topics, and urgency",
      "suggestedResponse": "an appropriate customer service response",
      "analysis": {
        "toxicity": number between 0 and 1,
        "spam_probability": number between 0 and 1,
        "key_topics": array of strings,
        "requires_human_review": boolean,
        "priority_level": "low" or "medium" or "high",
        "response_tone": "formal" or "casual" or "empathetic"
      }
    }
  }

  Ensure the response is appropriate for a brand's social media presence and follows these guidelines:
  - Provide a clear, concise summary that captures the main points and sentiment
  - If the comment is very negative or contains sensitive content, set requires_human_review to true
  - Set priority_level based on urgency and sentiment
  - Identify key topics mentioned in the comment
  - Adjust response_tone based on the comment's context
  
  Comment to analyze: "${text}"`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    console.log('Sending request to OpenRouter...', { text });
    const completion = await openaiClient.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",  // Using faster Mistral model
      messages: [
        {
          role: "system",
          content: "You are an AI trained to analyze social media comments. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent responses
      max_tokens: 500,  // Reduced tokens
    }, { signal: controller.signal });

    const textResponse = completion.choices[0].message.content;
    console.log('OpenRouter raw response:', textResponse);

    if (!textResponse) {
      console.error('Empty response received');
      throw new Error("Empty response from OpenRouter");
    }

    try {
      // Try to extract JSON if it's wrapped in other text
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : textResponse;
      
      const parsedResponse = JSON.parse(jsonStr);
      console.log('Parsed OpenRouter response:', parsedResponse);
      
      if (!parsedResponse.sentiment) {
        console.error('Invalid response structure:', parsedResponse);
        throw new Error('Response missing sentiment data');
      }
      
      return parsedResponse.sentiment;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw text that failed to parse:', textResponse);
      throw new Error('Failed to parse JSON response');
    }
  } catch (error) {
    console.error("Error in OpenRouter analysis:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error("Failed to get sentiment analysis");
  } finally {
    clearTimeout(timeout);
  }
};

export const generateCustomResponseDeepseek = async (
  text: string,
  brandTone: "formal" | "casual" | "empathetic" = "casual"
) => {
  if (!openaiClient) {
    throw new Error("OpenRouter client not initialized");
  }

  const prompt = `Generate a customer service response to this social media comment. 
  Use a ${brandTone} tone. The response should be professional, helpful, and align with social media best practices.
  
  Comment: "${text}"`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    console.log('Generating custom response with OpenRouter...', { text, brandTone });
    const completion = await openaiClient.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",  // Using faster Mistral model
      messages: [
        {
          role: "system",
          content: "You are a customer service AI. Be concise and professional."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 250  // Reduced tokens for faster response
    }, { signal: controller.signal });

    const response = completion.choices[0].message.content || "";
    console.log('OpenRouter custom response:', response);
    return response;
  } catch (error) {
    console.error("Error generating custom response:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error("Failed to generate custom response");
  } finally {
    clearTimeout(timeout);
  }
}; 