import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function SecurityStatus() {
  const { data: securityStatus, isLoading } = useQuery({
    queryKey: ["/api/security/status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      timeZone: 'UTC'
    });
  };

  return (
    <Card className="bg-slate-750 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span>Security & Tamper Detection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-3 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : securityStatus ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 text-center">
                <div className="text-lg font-semibold text-white">
                  {securityStatus.tamperDetected ? "DETECTED" : "SECURE"}
                </div>
                <div className="text-xs text-slate-400">Tamper Status</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 text-center">
                <div className="text-lg font-semibold text-white">
                  {securityStatus.totalAlerts}
                </div>
                <div className="text-xs text-slate-400">Total Alerts</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">System Status</span>
                <Badge variant={securityStatus.systemStatus === "online" ? "default" : "destructive"}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {securityStatus.systemStatus.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Last Security Check</span>
                <div className="flex items-center space-x-1 text-slate-400 text-sm">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(securityStatus.lastCheck)} UTC</span>
                </div>
              </div>
            </div>

            {securityStatus.recentAlerts.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-300">Recent Security Alerts</div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {securityStatus.recentAlerts.map((alert: any, index: number) => (
                    <div key={index} className="bg-slate-800 rounded p-2 border border-slate-600">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-slate-300">{alert.message}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {formatTimestamp(alert.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <Shield className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Security status unavailable</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}