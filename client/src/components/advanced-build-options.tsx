import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Code, Package } from "lucide-react";

interface AdvancedBuildOptionsProps {
  onOptionsChange: (options: BuildOptions) => void;
}

export interface BuildOptions {
  oneFile: boolean;
  noConsole: boolean;
  addIcon: boolean;
  iconPath: string;
  optimizationLevel: string;
  additionalFiles: string[];
  customName: string;
  hiddenImports: string;
  excludeModules: string;
  runtimeHooks: string;
}

export default function AdvancedBuildOptions({ onOptionsChange }: AdvancedBuildOptionsProps) {
  const [options, setOptions] = useState<BuildOptions>({
    oneFile: true,
    noConsole: false,
    addIcon: false,
    iconPath: "",
    optimizationLevel: "normal",
    additionalFiles: [],
    customName: "",
    hiddenImports: "",
    excludeModules: "",
    runtimeHooks: ""
  });

  const updateOptions = (newOptions: Partial<BuildOptions>) => {
    const updated = { ...options, ...newOptions };
    setOptions(updated);
    onOptionsChange(updated);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-750 border-slate-600 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold">🛠️ Advanced Build Options</span>
            <p className="text-xs text-slate-400 font-normal">Professional-grade executable configuration</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Options */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-300">PyInstaller Options</div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={options.oneFile}
                onCheckedChange={(checked) => updateOptions({ oneFile: checked as boolean })}
                className="bg-slate-800 border-slate-600"
              />
              <span className="text-slate-300">One-file executable (--onefile)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={options.noConsole}
                onCheckedChange={(checked) => updateOptions({ noConsole: checked as boolean })}
                className="bg-slate-800 border-slate-600"
              />
              <span className="text-slate-300">No console window (--windowed)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={options.addIcon}
                onCheckedChange={(checked) => updateOptions({ addIcon: checked as boolean })}
                className="bg-slate-800 border-slate-600"
              />
              <span className="text-slate-300">Add custom icon</span>
            </label>
          </div>
        </div>

        {/* Icon Path */}
        {options.addIcon && (
          <div className="space-y-2">
            <Label htmlFor="iconPath" className="text-sm font-medium text-slate-300">
              Icon File Path (.ico)
            </Label>
            <Input
              id="iconPath"
              value={options.iconPath}
              onChange={(e) => updateOptions({ iconPath: e.target.value })}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="path/to/icon.ico"
            />
          </div>
        )}

        {/* Custom Name */}
        <div className="space-y-2">
          <Label htmlFor="customName" className="text-sm font-medium text-slate-300">
            Custom Executable Name
          </Label>
          <Input
            id="customName"
            value={options.customName}
            onChange={(e) => updateOptions({ customName: e.target.value })}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="MyApplication (optional)"
          />
        </div>

        {/* Optimization Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-300">Optimization Level</Label>
          <Select value={options.optimizationLevel} onValueChange={(value) => updateOptions({ optimizationLevel: value })}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="none">None (fastest build)</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="aggressive">Aggressive (smallest size)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-slate-300 flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>Advanced Settings</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiddenImports" className="text-sm font-medium text-slate-300">
              Hidden Imports (comma-separated)
            </Label>
            <Textarea
              id="hiddenImports"
              value={options.hiddenImports}
              onChange={(e) => updateOptions({ hiddenImports: e.target.value })}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="module1, module2, package.submodule"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excludeModules" className="text-sm font-medium text-slate-300">
              Exclude Modules (comma-separated)
            </Label>
            <Textarea
              id="excludeModules"
              value={options.excludeModules}
              onChange={(e) => updateOptions({ excludeModules: e.target.value })}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="tkinter, matplotlib, unused_module"
              rows={2}
            />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center space-x-2 text-sm text-blue-400">
            <Package className="w-4 h-4" />
            <span className="font-medium">Production Ready</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Advanced options for professional-grade executable generation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}