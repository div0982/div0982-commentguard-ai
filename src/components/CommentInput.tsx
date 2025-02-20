import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CommentInputProps {
  onAnalyze: (comment: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({ onAnalyze, isLoading, disabled }) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast({
        title: "Please enter a comment",
        description: "The comment field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    onAnalyze(comment);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-up">
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium text-gray-700">
          Enter a social media comment to analyze
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type or paste a comment here..."
          className="min-h-[100px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/50"
          disabled={disabled || isLoading}
        />
      </div>
      <Button
        type="submit"
        className="w-full transition-all duration-200 hover:shadow-lg"
        disabled={disabled || isLoading}
      >
        {isLoading ? "Analyzing..." : disabled ? "Initializing AI..." : "Analyze Comment"}
      </Button>
    </form>
  );
};
