import { Atom, Home, Settings, History, Shield, AlertTriangle, UserCog } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Sidebar() {
  const [location] = useLocation();
  
  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/", active: location === "/" },
    { icon: UserCog, label: "Admin Panel", path: "/admin", active: location === "/admin" },
    { icon: Settings, label: "Build Tools", path: "/tools", active: location === "/tools" },
    { icon: History, label: "Build History", path: "/history", active: location === "/history" },
    { icon: Shield, label: "Security", path: "/security", active: location === "/security" },
    { icon: AlertTriangle, label: "Alerts", path: "/alerts", active: location === "/alerts" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-750 border-r border-slate-600 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">🔥</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quantum Intel
            </h1>
            <p className="text-xs text-slate-400 font-medium">v2.0 ULTIMATE Builder</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-650 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-400">System Online</span>
          </div>
          <p className="text-xs text-slate-400">Voice Assistant Ready</p>
          <p className="text-xs text-slate-500 mt-1">Tamper Detection Active</p>
          <p className="text-xs text-slate-600 mt-1">Blockchain Protection Enabled</p>
        </div>
      </div>
    </div>
  );
}
