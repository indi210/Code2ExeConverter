import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Code, Package } from "lucide-react";
import AdvancedBuildOptions from "./advanced-build-options";
import FileUpload from "@/components/ui/file-upload";
import { Terminal, Github, Download, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BuildInterfaceProps {
  onBuildStart: (buildId: number) => void;
  onVoiceMessage: (message: string) => void;
}

interface BuildOptions {
  oneFile: boolean;
  console: boolean;
  icon: string;
  name: string;
  hiddenImports: string;
  excludeModules: string;
  additionalFiles: string;
  outputDir: string;
}

export default function BuildInterface({ onBuildStart, onVoiceMessage }: BuildInterfaceProps) {
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [buildMode, setBuildMode] = useState<"file" | "url">("file");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [buildOptions, setBuildOptions] = useState<BuildOptions>({
    oneFile: true,
    console: false,
    icon: "",
    name: "",
    hiddenImports: "",
    excludeModules: "",
    additionalFiles: "",
    outputDir: "dist"
  });
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsBuilding(true);
    onVoiceMessage("Building Windows installer.");

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('buildOptions', JSON.stringify(buildOptions));

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
    if (!urlInput || !urlInput.includes('github.com')) {
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
      const response = await apiRequest("POST", "/api/build/github", { url: urlInput });
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

  const handleBuild = async () => {
    if (!selectedFile && !urlInput) {
      onVoiceMessage("Please select a file or enter a URL first");
      return;
    }

    setIsBuilding(true);
    onVoiceMessage("Initiating build process...");

    try {
      const formData = new FormData();

      if (buildMode === "file" && selectedFile) {
        formData.append("file", selectedFile);
        formData.append("filename", selectedFile.name);
        formData.append("buildOptions", JSON.stringify(buildOptions));
      } else if (buildMode === "url" && urlInput) {
        formData.append("url", urlInput);
        formData.append("buildOptions", JSON.stringify(buildOptions));
      }

      const response = await fetch("/api/build/python", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onBuildStart(data.buildId);
        onVoiceMessage("Build initiated successfully");
        setSelectedFile(null);
        setUrlInput("");
      } else {
        onVoiceMessage(`Build failed: ${data.message}`);
      }
    } catch (error) {
      onVoiceMessage("Build failed due to network error");
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Terminal File Upload */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-xl border border-slate-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">🔥 Quantum Python to EXE</h3>
            <p className="text-xs text-slate-400">Ultra-secure executable generation</p>
          </div>
        </div>

        <FileUpload onFileSelect={handleFileUpload} disabled={isBuilding} />

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Quick Options:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-blue-400 hover:text-blue-300 p-1"
            >
              <Settings className="w-4 h-4 mr-1" />
              Advanced
            </Button>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={buildOptions.oneFile}
              onCheckedChange={(checked) => setBuildOptions({...buildOptions, oneFile: checked as boolean})}
              className="bg-slate-800 border-slate-600"
            />
            <span className="text-slate-300">One-file executable</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={buildOptions.console}
              onCheckedChange={(checked) => setBuildOptions({...buildOptions, console: checked as boolean})}
              className="bg-slate-800 border-slate-600"
            />
            <span className="text-slate-300">No console window</span>
          </label>
        </div>
      </div>

      {/* GitHub Repository */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-xl border border-slate-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center shadow-lg">
            <Github className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">⚡ GitHub Repository</h3>
            <p className="text-xs text-slate-400">AI-enhanced project processing</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="github-url" className="block text-sm font-medium text-slate-300 mb-2">
              Repository URL
            </Label>
            <Input
              id="github-url"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              disabled={isBuilding}
            />
          </div>

          <Button
            onClick={handleGithubBuild}
            disabled={isBuilding || !urlInput}
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

      {showAdvanced && (
          <AdvancedBuildOptions 
            onOptionsChange={(options) => setBuildOptions(options)}
          />
        )}
    </div>
  );
}