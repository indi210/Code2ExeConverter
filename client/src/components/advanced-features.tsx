import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Code, 
  Zap, 
  Shield, 
  Cpu, 
  Database, 
  Cloud, 
  Terminal,
  FileCode,
  Rocket,
  Brain,
  Lock,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AdvancedFeaturesProps {
  onVoiceMessage: (message: string) => void;
}

export default function AdvancedFeatures({ onVoiceMessage }: AdvancedFeaturesProps) {
  const [codeInput, setCodeInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [optimizationLevel, setOptimizationLevel] = useState("maximum");
  const [enableAI, setEnableAI] = useState(true);
  const [enableSecurity, setEnableSecurity] = useState(true);
  const [enableBlockchain, setEnableBlockchain] = useState(true);
  const { toast } = useToast();

  const codeAnalysisMutation = useMutation({
    mutationFn: async (code: string) => {
      return apiRequest("POST", "/api/ai/analyze-code", { code, language });
    },
    onSuccess: (data) => {
      onVoiceMessage("Code analysis complete. Advanced optimization suggestions generated.");
      toast({
        title: "Code Analysis Complete",
        description: "AI has analyzed your code and generated optimization suggestions",
      });
    },
  });

  const instantBuildMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/build/instant", { 
        code: codeInput, 
        language,
        optimization: optimizationLevel,
        features: {
          ai: enableAI,
          security: enableSecurity,
          blockchain: enableBlockchain
        }
      });
    },
    onSuccess: (data) => {
      onVoiceMessage("Instant build completed with quantum optimization.");
      toast({
        title: "Instant Build Success",
        description: "Your application has been built with advanced features",
      });
    },
  });

  const languages = [
    { value: "python", label: "Python", icon: "🐍" },
    { value: "javascript", label: "JavaScript", icon: "⚡" },
    { value: "typescript", label: "TypeScript", icon: "🔷" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "⚙️" },
    { value: "csharp", label: "C#", icon: "🔥" },
    { value: "go", label: "Go", icon: "🐹" },
    { value: "rust", label: "Rust", icon: "🦀" },
    { value: "ruby", label: "Ruby", icon: "💎" },
    { value: "php", label: "PHP", icon: "🌐" },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Code Enhancement",
      description: "Automatically optimize code performance and structure",
      color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      enabled: enableAI,
      setter: setEnableAI
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Multi-layer security with blockchain verification",
      color: "bg-green-500/10 border-green-500/20 text-green-400",
      enabled: enableSecurity,
      setter: setEnableSecurity
    },
    {
      icon: Lock,
      title: "Blockchain Protection",
      description: "Immutable code verification and legal protection",
      color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      enabled: enableBlockchain,
      setter: setEnableBlockchain
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          🔥 Advanced Development Features 🔥
        </h2>
        <p className="text-slate-400">
          Build applications with quantum-level optimization and security
        </p>
      </div>

      {/* Language Selection */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5" />
            Universal Language Support
          </CardTitle>
          <CardDescription>Choose your programming language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.value}
                variant={language === lang.value ? "default" : "outline"}
                className={`h-16 flex flex-col items-center gap-1 ${
                  language === lang.value 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-slate-600 hover:bg-slate-700"
                }`}
                onClick={() => setLanguage(lang.value)}
              >
                <span className="text-lg">{lang.icon}</span>
                <span className="text-xs">{lang.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Input */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            Code Input & Analysis
          </CardTitle>
          <CardDescription>Paste your code for instant building and AI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="code" className="text-slate-300">Code</Label>
            <Textarea
              id="code"
              placeholder={`Enter your ${language} code here...`}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="min-h-[200px] bg-slate-900 border-slate-600 text-white font-mono"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => codeAnalysisMutation.mutate(codeInput)}
              disabled={!codeInput || codeAnalysisMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Analyze
            </Button>
            <Button 
              onClick={() => instantBuildMutation.mutate()}
              disabled={!codeInput || instantBuildMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Instant Build
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quantum Optimization
          </CardTitle>
          <CardDescription>Configure build optimization level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="optimization" className="text-slate-300">Optimization Level</Label>
            <Select value={optimizationLevel} onValueChange={setOptimizationLevel}>
              <SelectTrigger className="bg-slate-900 border-slate-600">
                <SelectValue placeholder="Select optimization level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="basic">Basic - Fast compilation</SelectItem>
                <SelectItem value="standard">Standard - Balanced performance</SelectItem>
                <SelectItem value="advanced">Advanced - High optimization</SelectItem>
                <SelectItem value="maximum">Maximum - Quantum level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Advanced Features
          </CardTitle>
          <CardDescription>Enable quantum-level features for your build</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border ${feature.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm opacity-80">{feature.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={feature.setter}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>One-click development tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" className="h-16 flex flex-col items-center gap-1 border-slate-600">
              <Database className="w-5 h-5" />
              <span className="text-xs">Auto DB</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-1 border-slate-600">
              <Cloud className="w-5 h-5" />
              <span className="text-xs">Deploy</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-1 border-slate-600">
              <Globe className="w-5 h-5" />
              <span className="text-xs">API Gen</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-1 border-slate-600">
              <Shield className="w-5 h-5" />
              <span className="text-xs">Secure</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}