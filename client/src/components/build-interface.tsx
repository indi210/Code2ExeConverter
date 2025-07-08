import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/ui/file-upload";
import { Terminal, Github, Download, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BuildInterfaceProps {
  onBuildStart: (buildId: number) => void;
  onVoiceMessage: (message: string) => void;
}

export default function BuildInterface({ onBuildStart, onVoiceMessage }: BuildInterfaceProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [oneFile, setOneFile] = useState(true);
  const [noConsole, setNoConsole] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsBuilding(true);
    onVoiceMessage("Building Windows installer.");
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiRequest("POST", "/api/build/python", formData);
      const data = await response.json();
      
      onBuildStart(data.buildId);
      toast({
        title: "Build Started",
        description: `Building ${file.name} into executable`,
      });
    } catch (error) {
      onVoiceMessage("Build failed.");
      toast({
        title: "Build Failed",
        description: "Failed to start build process",
        variant: "destructive",
      });
    } finally {
      setIsBuilding(false);
    }
  };

  const handleGithubBuild = async () => {
    if (!githubUrl || !githubUrl.includes('github.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    setIsBuilding(true);
    onVoiceMessage("Downloading GitHub repository.");
    
    try {
      const response = await apiRequest("POST", "/api/build/github", { url: githubUrl });
      const data = await response.json();
      
      onBuildStart(data.buildId);
      onVoiceMessage("Repository downloaded. Ready for enhancement.");
      toast({
        title: "GitHub Processing Started",
        description: "Repository is being downloaded and processed",
      });
    } catch (error) {
      onVoiceMessage("Repository download failed.");
      toast({
        title: "GitHub Processing Failed",
        description: "Failed to process GitHub repository",
        variant: "destructive",
      });
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Terminal File Upload */}
      <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Terminal to EXE</h3>
        </div>
        
        <FileUpload onFileSelect={handleFileUpload} disabled={isBuilding} />

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">PyInstaller Options:</span>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={oneFile}
              onCheckedChange={(checked) => setOneFile(checked as boolean)}
              className="bg-slate-800 border-slate-600"
            />
            <span className="text-slate-300">One-file executable</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={noConsole}
              onCheckedChange={(checked) => setNoConsole(checked as boolean)}
              className="bg-slate-800 border-slate-600"
            />
            <span className="text-slate-300">No console window</span>
          </label>
        </div>
      </div>

      {/* GitHub Repository */}
      <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <Github className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">GitHub Repository</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="github-url" className="block text-sm font-medium text-slate-300 mb-2">
              Repository URL
            </Label>
            <Input
              id="github-url"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              disabled={isBuilding}
            />
          </div>
          
          <Button
            onClick={handleGithubBuild}
            disabled={isBuilding || !githubUrl}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            {isBuilding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download & Process
          </Button>
        </div>

        <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-600">
          <div className="flex items-center space-x-2 text-sm">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">Blockchain-Ready ID & Legal Hashing</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">AI will optimize, secure and add legal protection to repositories</p>
        </div>
      </div>
    </div>
  );
}
