import { Atom, Home, Settings, History, Shield, AlertTriangle } from "lucide-react";

export default function Sidebar() {
  const navigationItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Settings, label: "Build Tools", active: false },
    { icon: History, label: "Build History", active: false },
    { icon: Shield, label: "Security", active: false },
    { icon: AlertTriangle, label: "Alerts", active: false },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-750 border-r border-slate-600 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 quantum-gradient rounded-lg flex items-center justify-center">
            <Atom className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Quantum Intel</h1>
            <p className="text-xs text-slate-400">Code2EXE Builder</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-650 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-400">System Online</span>
          </div>
          <p className="text-xs text-slate-400">Voice Assistant Ready</p>
        </div>
      </div>
    </div>
  );
}
