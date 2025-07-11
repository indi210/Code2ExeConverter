import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, HardDrive, Cpu, MemoryStick, Zap } from "lucide-react";

export default function SystemStats() {
  const { data: stats } = useQuery({
    queryKey: ["/api/system/stats"],
    refetchInterval: 5000, // Update every 5 seconds
  });

  // Mock system stats for demo
  const systemStats = {
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    uptime: "2d 14h 32m",
    buildQueue: 0,
    activeConnections: 1
  };

  return (
    <Card className="bg-slate-750 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span>System Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">CPU</span>
              </div>
              <span className="text-sm text-white">{systemStats.cpuUsage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.cpuUsage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MemoryStick className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">RAM</span>
              </div>
              <span className="text-sm text-white">{systemStats.memoryUsage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.memoryUsage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-300">Disk</span>
              </div>
              <span className="text-sm text-white">{systemStats.diskUsage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.diskUsage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-300">Queue</span>
              </div>
              <span className="text-sm text-white">{systemStats.buildQueue}</span>
            </div>
            <div className="bg-slate-800 rounded p-1 text-center">
              <span className="text-xs text-slate-400">builds waiting</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-600">
          <span className="text-sm text-slate-300">System Uptime</span>
          <Badge variant="secondary" className="bg-emerald-900 text-emerald-300">
            {systemStats.uptime}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Active Connections</span>
          <Badge variant="secondary" className="bg-blue-900 text-blue-300">
            {systemStats.activeConnections}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}