import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Activity, Shield, Database, Terminal, TrendingUp, AlertTriangle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch system analytics
  const { data: analytics } = useQuery({
    queryKey: ['/api/quantum/analytics'],
    refetchInterval: 5000,
  });

  // Fetch system stats
  const { data: systemStats } = useQuery({
    queryKey: ['/api/system/stats'],
    refetchInterval: 3000,
  });

  // Fetch builds
  const { data: builds } = useQuery({
    queryKey: ['/api/builds'],
    refetchInterval: 5000,
  });

  // Fetch alerts
  const { data: security } = useQuery({
    queryKey: ['/api/security/status'],
    refetchInterval: 10000,
  });

  useEffect(() => {
    // Simulate active users counter
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 10);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const systemRestartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/system/restart", {});
    },
    onSuccess: () => {
      toast({
        title: "System Restart",
        description: "System restart initiated successfully",
      });
    },
  });

  const clearLogsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logs/clear", {});
    },
    onSuccess: () => {
      toast({
        title: "Logs Cleared",
        description: "System logs cleared successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/security/status'] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400">System management and monitoring</p>
        </div>
        <Badge variant="outline" className="bg-green-500/10 border-green-500/20 text-green-400">
          <Activity className="w-4 h-4 mr-2" />
          System Online
        </Badge>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeUsers}</div>
            <p className="text-xs text-slate-400">+2 from last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Builds</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{builds?.length || 0}</div>
            <p className="text-xs text-slate-400">All time builds</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{security?.totalAlerts || 0}</div>
            <p className="text-xs text-slate-400">System alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">CPU Usage</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats?.cpuUsage || 0}%</div>
            <p className="text-xs text-slate-400">Current load</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="builds">Builds</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
                <CardDescription>System performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Build Success Rate:</span>
                      <span className="text-green-400 font-semibold">{analytics.performanceMetrics.buildSuccessRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Score:</span>
                      <span className="text-green-400 font-semibold">{analytics.performanceMetrics.securityScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Optimization:</span>
                      <span className="text-blue-400 font-semibold">{analytics.performanceMetrics.aiOptimization}%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Real-time Stats</CardTitle>
                <CardDescription>Current system activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Builds:</span>
                      <Badge className="bg-blue-500/10 border-blue-500/20 text-blue-400">
                        {analytics.realTimeStats.activeBuilds}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Enhancements:</span>
                      <Badge className="bg-purple-500/10 border-purple-500/20 text-purple-400">
                        {analytics.realTimeStats.aiEnhancements}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blockchain Verifications:</span>
                      <Badge className="bg-green-500/10 border-green-500/20 text-green-400">
                        {analytics.realTimeStats.blockchainVerifications}
                      </Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-semibold">Ervin Remus Radosavlevici</h3>
                    <p className="text-slate-400 text-sm">System Owner</p>
                  </div>
                  <Badge className="bg-red-500/10 border-red-500/20 text-red-400">OWNER</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-semibold">Active Users</h3>
                    <p className="text-slate-400 text-sm">{activeUsers} currently online</p>
                  </div>
                  <Badge className="bg-green-500/10 border-green-500/20 text-green-400">ACTIVE</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builds" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Build Management</CardTitle>
              <CardDescription>Monitor and manage build processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {builds && builds.length > 0 ? (
                  builds.map((build: any) => (
                    <div key={build.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <h3 className="text-white font-semibold">{build.filename}</h3>
                        <p className="text-slate-400 text-sm">Build ID: {build.id}</p>
                      </div>
                      <Badge 
                        className={
                          build.status === 'success' 
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : build.status === 'failed'
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                        }
                      >
                        {build.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-8">No builds found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Security Center</CardTitle>
              <CardDescription>Security monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">System Protected</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">All security systems active</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-semibold">Data Secure</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">Owner data protected</p>
                  </div>
                </div>
                {security?.recentAlerts && security.recentAlerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Recent Alerts</h4>
                    {security.recentAlerts.map((alert: any, index: number) => (
                      <div key={index} className="p-3 bg-slate-700 rounded-lg">
                        <p className="text-slate-300 text-sm">{alert.message}</p>
                        <p className="text-slate-500 text-xs mt-1">{alert.type}</p>
                      </div>
                    ))}
                  </div>
                )}
                <Button 
                  onClick={() => clearLogsMutation.mutate()}
                  disabled={clearLogsMutation.isPending}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Clear Security Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Control</CardTitle>
              <CardDescription>System administration tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">CPU Usage</p>
                  <p className="text-2xl font-bold text-white">{systemStats?.cpuUsage || 0}%</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Memory Usage</p>
                  <p className="text-2xl font-bold text-white">{systemStats?.memoryUsage || 0}%</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Disk Usage</p>
                  <p className="text-2xl font-bold text-white">{systemStats?.diskUsage || 0}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={() => systemRestartMutation.mutate()}
                  disabled={systemRestartMutation.isPending}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Restart System
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  <Activity className="w-4 h-4 mr-2" />
                  View System Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Settings</CardTitle>
              <CardDescription>Configure system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Auto-build optimization</h4>
                    <p className="text-slate-400 text-sm">Enable automatic build optimization</p>
                  </div>
                  <Badge className="bg-green-500/10 border-green-500/20 text-green-400">ENABLED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Security monitoring</h4>
                    <p className="text-slate-400 text-sm">Real-time security monitoring</p>
                  </div>
                  <Badge className="bg-green-500/10 border-green-500/20 text-green-400">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Owner protection</h4>
                    <p className="text-slate-400 text-sm">Prevent unauthorized changes</p>
                  </div>
                  <Badge className="bg-red-500/10 border-red-500/20 text-red-400">LOCKED</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}