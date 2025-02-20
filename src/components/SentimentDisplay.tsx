import React from "react";
import { Progress } from "./ui/progress";

interface SentimentDisplayProps {
  sentiment: {
    score: number;
    label: string;
    summary?: string;
    analysis?: {
      toxicity: number;
      spam_probability: number;
      key_topics: string[];
      requires_human_review: boolean;
      priority_level: string;
      response_tone: string;
    };
  };
}

export const SentimentDisplay: React.FC<SentimentDisplayProps> = ({ sentiment }) => {
  const getSentimentColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "positive":
        return "bg-sentiment-positive";
      case "negative":
        return "bg-sentiment-negative";
      default:
        return "bg-sentiment-neutral";
    }
  };

  const getSentimentText = (label: string) => {
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    return capitalizedLabel;
  };

  return (
    <div className="space-y-4 p-6 rounded-lg bg-white/50 backdrop-blur-sm border animate-fade-up">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            getSentimentColor(sentiment.label)
          } text-white`}
        >
          {getSentimentText(sentiment.label)}
        </span>
      </div>
      
      {sentiment.summary && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 italic">{sentiment.summary}</p>
        </div>
      )}

      <Progress
        value={sentiment.score * 100}
        className={`h-2 ${getSentimentColor(sentiment.label)}`}
      />
      <p className="text-sm text-gray-600">
        Confidence Score: {Math.round(sentiment.score * 100)}%
      </p>
      {sentiment.analysis && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Toxicity:</span>
            <span>{Math.round(sentiment.analysis.toxicity * 100)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Spam Probability:</span>
            <span>{Math.round(sentiment.analysis.spam_probability * 100)}%</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Key Topics: </span>
            <span>{sentiment.analysis.key_topics.join(", ")}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Priority: </span>
            <span className="capitalize">{sentiment.analysis.priority_level}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Response Tone: </span>
            <span className="capitalize">{sentiment.analysis.response_tone}</span>
          </div>
        </div>
      )}
    </div>
  );
};
