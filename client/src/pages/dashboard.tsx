import { useState } from "react";
import AuthModal from "@/components/auth-modal";
import Sidebar from "@/components/sidebar";
import BuildInterface from "@/components/build-interface";
import BuildStatus from "@/components/build-status";
import SecurityPanel from "@/components/security-panel";
import DownloadCenter from "@/components/download-center";
import BuildHistory from "@/components/build-history";
import VoiceNotification from "@/components/voice-notification";
import AISuggestions from "@/components/ai-suggestions";
import SecurityStatus from "@/components/security-status";
import EmailAlerts from "@/components/email-alerts";
import BlockchainVerification from "@/components/blockchain-verification";
import SystemStats from "@/components/system-stats";
import QuantumAnalytics from "@/components/quantum-analytics";
import AIEnhancementEngine from "@/components/ai-enhancement-engine";
import ProfessionalOverview from "@/components/professional-overview";
import { Clock, Bell, UserCircle } from "lucide-react";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentBuildId, setCurrentBuildId] = useState<number | null>(null);
  const [voiceMessage, setVoiceMessage] = useState<string>("");
  const [showVoiceNotification, setShowVoiceNotification] = useState(false);

  const showVoiceMessage = (message: string) => {
    setVoiceMessage(message);
    setShowVoiceNotification(true);
    setTimeout(() => setShowVoiceNotification(false), 5000);
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    timeZone: 'UTC' 
  }) + ' UTC';

  if (!isAuthenticated) {
    return (
      <AuthModal
        onAuthenticated={() => {
          setIsAuthenticated(true);
          showVoiceMessage("Welcome back, Ervin. Quantum builder is ready.");
        }}
        onVoiceMessage={showVoiceMessage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-850 text-slate-200">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-slate-800 via-slate-750 to-slate-800 border-b border-slate-600 px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome back, Ervin
                </h2>
                <p className="text-sm text-slate-400 font-medium">
                  🚀 Quantum Builder v2.0 ULTIMATE - Maximum Security Active
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{currentTime}</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <UserCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <VoiceNotification
            message={voiceMessage}
            show={showVoiceNotification}
            onDismiss={() => setShowVoiceNotification(false)}
          />

          <ProfessionalOverview />

          <BuildInterface
            onBuildStart={(buildId) => {
              setCurrentBuildId(buildId);
              showVoiceMessage("Build process initiated. Preparing executable...");
            }}
            onVoiceMessage={showVoiceMessage}
          />

          <BuildStatus buildId={currentBuildId} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SecurityPanel buildId={currentBuildId} />
            <DownloadCenter buildId={currentBuildId} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AISuggestions 
              buildId={currentBuildId} 
              onVoiceMessage={showVoiceMessage}
            />
            <AIEnhancementEngine 
              buildId={currentBuildId} 
              onVoiceMessage={showVoiceMessage}
            />
            <SecurityStatus />
          </div>

          <QuantumAnalytics />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmailAlerts />
            <BlockchainVerification buildId={currentBuildId} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemStats />
            <BuildHistory />
          </div>
        </main>
      </div>
    </div>
  );
}
