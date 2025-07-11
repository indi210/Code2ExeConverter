import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BuildInterface from "@/components/build-interface";
import BuildStatus from "@/components/build-status";
import SecurityPanel from "@/components/security-panel";
import DownloadCenter from "@/components/download-center";
import BuildHistory from "@/components/build-history";
import AISuggestions from "@/components/ai-suggestions";
import SecurityStatus from "@/components/security-status";
import EmailAlerts from "@/components/email-alerts";
import BlockchainVerification from "@/components/blockchain-verification";
import SystemStats from "@/components/system-stats";
import QuantumAnalytics from "@/components/quantum-analytics";
import AIEnhancementEngine from "@/components/ai-enhancement-engine";
import ProfessionalOverview from "@/components/professional-overview";
import AdvancedFeatures from "@/components/advanced-features";
import { 
  Rocket, 
  Shield, 
  Download, 
  History, 
  Settings, 
  Brain, 
  Zap,
  Code,
  TrendingUp,
  Lock
} from "lucide-react";

interface MegaDashboardProps {
  currentBuildId: number | null;
  onBuildStart: (buildId: number) => void;
  onVoiceMessage: (message: string) => void;
}

export default function MegaDashboard({ currentBuildId, onBuildStart, onVoiceMessage }: MegaDashboardProps) {
  const [activeTab, setActiveTab] = useState("build");

  const tabs = [
    { 
      id: "build", 
      label: "Build Center", 
      icon: Rocket,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    { 
      id: "advanced", 
      label: "Advanced", 
      icon: Zap,
      color: "bg-purple-500/10 border-purple-500/20 text-purple-400"
    },
    { 
      id: "security", 
      label: "Security", 
      icon: Shield,
      color: "bg-green-500/10 border-green-500/20 text-green-400"
    },
    { 
      id: "downloads", 
      label: "Downloads", 
      icon: Download,
      color: "bg-orange-500/10 border-orange-500/20 text-orange-400"
    },
    { 
      id: "history", 
      label: "History", 
      icon: History,
      color: "bg-slate-500/10 border-slate-500/20 text-slate-400"
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: TrendingUp,
      color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Professional Overview */}
      <ProfessionalOverview />

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800 h-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 h-12 data-[state=active]:bg-blue-600"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="build" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <BuildInterface onBuildStart={onBuildStart} onVoiceMessage={onVoiceMessage} />
              <AISuggestions buildId={currentBuildId} onVoiceMessage={onVoiceMessage} />
            </div>
            <div className="space-y-6">
              <BuildStatus buildId={currentBuildId} />
              <AIEnhancementEngine buildId={currentBuildId} onVoiceMessage={onVoiceMessage} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <AdvancedFeatures onVoiceMessage={onVoiceMessage} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SecurityStatus />
              <SecurityPanel buildId={currentBuildId} />
            </div>
            <div className="space-y-6">
              <BlockchainVerification buildId={currentBuildId} />
              <EmailAlerts />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-6">
          <DownloadCenter buildId={currentBuildId} />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <BuildHistory />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <QuantumAnalytics />
            </div>
            <div className="space-y-6">
              <SystemStats />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}