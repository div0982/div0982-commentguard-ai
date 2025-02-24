export const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const VITE_OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!VITE_GEMINI_API_KEY || !VITE_OPENROUTER_API_KEY) {
  console.error('Missing required environment variables:',
    !VITE_GEMINI_API_KEY ? 'VITE_GEMINI_API_KEY' : '',
    !VITE_OPENROUTER_API_KEY ? 'VITE_OPENROUTER_API_KEY' : ''
  );
}