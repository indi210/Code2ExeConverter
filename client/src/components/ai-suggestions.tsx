import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface AISuggestionsProps {
  buildId: number | null;
  onVoiceMessage: (message: string) => void;
}

export default function AISuggestions({ buildId, onVoiceMessage }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/ai/suggestions", { buildId });
      return response;
    },
    onSuccess: (data) => {
      setSuggestions(data.suggestions);
      setShowSuggestions(true);
      onVoiceMessage("Analyzing for improvements.");
    },
    onError: () => {
      onVoiceMessage("AI analysis failed.");
    }
  });

  const handleAnalyze = () => {
    if (buildId) {
      suggestionsMutation.mutate();
    }
  };

  return (
    <Card className="bg-slate-750 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span>AI Feature Enhancer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-slate-400">
          Get AI-powered suggestions to enhance your project with modern features
        </div>
        
        <Button
          onClick={handleAnalyze}
          disabled={!buildId || suggestionsMutation.isPending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {suggestionsMutation.isPending ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Analyze for Improvements
        </Button>

        {showSuggestions && suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-purple-300">
              <Lightbulb className="w-4 h-4" />
              <span>AI Suggestions:</span>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-3 border border-slate-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-slate-300 text-sm">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}