import React, { useState, useEffect } from "react";
import { CommentInput, SentimentDisplay, ResponsePreview } from "@/components";
import { initializeAI, analyzeWithBothModels, AIResponse } from "@/lib/aiManager";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { VITE_GEMINI_API_KEY, VITE_OPENROUTER_API_KEY } from "@/env";

type SentimentType = {
  score: number;
  label: "positive" | "neutral" | "negative";
  suggestedResponse: string;
  analysis?: {
    toxicity: number;
    spam_probability: number;
    key_topics: string[];
    requires_human_review: boolean;
    priority_level: "low" | "medium" | "high";
    response_tone: "formal" | "casual" | "empathetic";
  };
};

const Index = () => {
  console.log('Index component rendering'); // Debug log
  
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeServices = async () => {
      console.log('Initializing AI services...');
      setError(null);
      setIsInitialized(false);
      
      try {
        if (!VITE_GEMINI_API_KEY || !VITE_OPENROUTER_API_KEY) {
          throw new Error('API keys not found');
        }

        // Initialize both AI models with their API keys
        await initializeAI(
          VITE_GEMINI_API_KEY,
          VITE_OPENROUTER_API_KEY
        );
        
        console.log('AI services initialized successfully');
        setIsInitialized(true);
        setError(null);
        
        toast({
          title: "Initialization Complete",
          description: "AI services are ready to analyze comments.",
        });
      } catch (error) {
        console.error('Error initializing AI:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
        setError(`Failed to initialize AI services: ${errorMessage}`);
        setIsInitialized(false);
        
        toast({
          title: "Initialization Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    initializeServices();
  }, [toast]);

  const analyzeComment = async (comment: string) => {
    if (!isInitialized) {
      setError('AI services are not initialized. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      console.log('Analyzing comment:', comment);
      const results = await analyzeWithBothModels(comment);
      console.log('Analysis results:', results);
      setResponses(results);

      // Check if any model requires human review
      const requiresReview = results.some(
        (result) => result.sentiment.analysis?.requires_human_review
      );

      if (requiresReview) {
        toast({
          title: "Human Review Required",
          description: "This comment requires human review due to its sensitive nature.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error analyzing comment:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Failed to analyze comment: ${errorMessage}`);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            AI Comment Moderator
          </h1>
          <p className="text-lg text-gray-600">
            Analyze and moderate social media comments with multiple AI models
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <CommentInput onAnalyze={analyzeComment} isLoading={isLoading} disabled={!isInitialized} />
          
          {responses.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              {responses.map((response, index) => (
                <div key={response.model} className="space-y-6">
                  <h2 className="text-xl font-semibold capitalize">{response.model} Analysis</h2>
                  <SentimentDisplay sentiment={response.sentiment} />
                  <ResponsePreview response={response.sentiment.suggestedResponse} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
