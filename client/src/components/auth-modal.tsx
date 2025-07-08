import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AuthModalProps {
  onAuthenticated: () => void;
  onVoiceMessage: (message: string) => void;
}

export default function AuthModal({ onAuthenticated, onVoiceMessage }: AuthModalProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    if (!password) {
      toast({
        title: "Authentication Failed",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/auth", { password });
      onAuthenticated();
      toast({
        title: "Authentication Successful",
        description: "Access granted to Quantum Builder",
      });
    } catch (error) {
      onVoiceMessage("Access denied.");
      toast({
        title: "Authentication Failed",
        description: "Invalid password entered",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-750 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 border border-slate-600">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quantum Builder Access</h2>
          <p className="text-slate-400">Enter your secure password to continue</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              🔐 Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              placeholder="Enter quantum secure password"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Shield className="w-4 h-4 mr-2" />
            )}
            Authenticate
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">Created by Ervin Remus Radosavlevici</p>
        </div>
      </div>
    </div>
  );
}
