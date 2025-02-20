
import React from "react";
import { Card } from "./ui/card";

interface ResponsePreviewProps {
  response: string;
}

export const ResponsePreview: React.FC<ResponsePreviewProps> = ({ response }) => {
  return (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm animate-fade-up">
      <h3 className="text-lg font-semibold">Suggested Response</h3>
      <p className="text-gray-700 leading-relaxed">{response}</p>
    </Card>
  );
};
