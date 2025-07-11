import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900">
      <Card className="w-full max-w-md mx-4 bg-slate-800 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">🔥 Quantum System Ready</h1>
              <p className="text-slate-400">
                The Quantum Intel Code2EXE Builder is active. Return to the main dashboard to start building executables.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Home className="w-4 h-4 mr-2" />
                  Quantum Dashboard
                </Button>
              </Link>
              <Link href="/admin">
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
