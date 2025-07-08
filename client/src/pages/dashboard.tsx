import { useState } from "react";
import AuthModal from "@/components/auth-modal";
import Sidebar from "@/components/sidebar";
import BuildInterface from "@/components/build-interface";
import BuildStatus from "@/components/build-status";
import SecurityPanel from "@/components/security-panel";
import DownloadCenter from "@/components/download-center";
import BuildHistory from "@/components/build-history";
import VoiceNotification from "@/components/voice-notification";
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
        <header className="bg-slate-750 border-b border-slate-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Welcome back, Ervin</h2>
              <p className="text-sm text-slate-400">Quantum builder is ready for deployment</p>
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

          <BuildHistory />
        </main>
      </div>
    </div>
  );
}
