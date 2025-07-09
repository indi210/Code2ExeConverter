import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, Star, Zap, Shield, Brain, Rocket, 
  Award, Trophy, Target, Cpu, Sparkles, Lock
} from "lucide-react";

export default function ProfessionalOverview() {
  const professionalMetrics = [
    { 
      title: "Build Engine Status", 
      value: "QUANTUM ULTIMATE", 
      icon: Crown, 
      status: "active",
      description: "Maximum performance mode engaged"
    },
    { 
      title: "Security Rating", 
      value: "A+ MAXIMUM", 
      icon: Shield, 
      status: "excellent",
      description: "Blockchain-ready protection active"
    },
    { 
      title: "AI Intelligence", 
      value: "ULTRA ADVANCED", 
      icon: Brain, 
      status: "optimized",
      description: "Machine learning enhancement ready"
    },
    { 
      title: "Performance Level", 
      value: "ENTERPRISE", 
      icon: Rocket, 
      status: "peak",
      description: "Professional-grade optimization"
    }
  ];

  const achievements = [
    { name: "Quantum Master", icon: Crown, rarity: "legendary" },
    { name: "Security Expert", icon: Shield, rarity: "epic" },
    { name: "AI Pioneer", icon: Brain, rarity: "legendary" },
    { name: "Build Champion", icon: Trophy, rarity: "epic" },
    { name: "Performance Guru", icon: Rocket, rarity: "rare" },
    { name: "Innovation Leader", icon: Sparkles, rarity: "legendary" }
  ];

  const features = [
    "🔥 Quantum Intelligence Engine v2.0",
    "🛡️ Maximum Security Blockchain Protection", 
    "🚀 AI-Powered Performance Optimization",
    "⚡ Ultra-Fast Build Processing",
    "💎 Professional Legal Protection Suite",
    "🧠 Machine Learning Enhancement",
    "🔐 Advanced Tamper Detection",
    "⭐ Enterprise-Grade Architecture"
  ];

  return (
    <div className="space-y-6">
      {/* Professional Status Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 rounded-xl p-6 border border-blue-500/30 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                QUANTUM INTELLIGENCE v2.0 ULTIMATE
              </h2>
              <p className="text-blue-200 font-medium">
                🏆 Professional Build Software - Maximum Security & Performance
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                  <Star className="w-3 h-3 mr-1" />
                  LEGENDARY
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                  <Lock className="w-3 h-3 mr-1" />
                  SECURE
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-POWERED
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-400">100%</div>
            <div className="text-sm text-blue-200">System Optimized</div>
          </div>
        </div>
      </div>

      {/* Professional Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {professionalMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-750 border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`w-6 h-6 ${
                  metric.status === 'active' ? 'text-green-400' :
                  metric.status === 'excellent' ? 'text-blue-400' :
                  metric.status === 'optimized' ? 'text-purple-400' :
                  'text-orange-400'
                }`} />
                <Badge variant="outline" className={`text-xs ${
                  metric.status === 'active' ? 'border-green-500/50 text-green-400' :
                  metric.status === 'excellent' ? 'border-blue-500/50 text-blue-400' :
                  metric.status === 'optimized' ? 'border-purple-500/50 text-purple-400' :
                  'border-orange-500/50 text-orange-400'
                }`}>
                  {metric.status.toUpperCase()}
                </Badge>
              </div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">{metric.title}</h3>
              <div className="text-lg font-bold text-white mb-1">{metric.value}</div>
              <p className="text-xs text-slate-400">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Features */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-750 border-slate-600 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg">🚀 Professional Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-slate-800 rounded-lg border border-slate-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-750 border-slate-600 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg">🏆 Professional Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-3 border border-slate-600 text-center">
                  <achievement.icon className={`w-6 h-6 mx-auto mb-2 ${
                    achievement.rarity === 'legendary' ? 'text-yellow-400' :
                    achievement.rarity === 'epic' ? 'text-purple-400' :
                    'text-blue-400'
                  }`} />
                  <div className="text-xs font-medium text-white">{achievement.name}</div>
                  <Badge variant="outline" className={`mt-1 text-xs ${
                    achievement.rarity === 'legendary' ? 'border-yellow-500/50 text-yellow-400' :
                    achievement.rarity === 'epic' ? 'border-purple-500/50 text-purple-400' :
                    'border-blue-500/50 text-blue-400'
                  }`}>
                    {achievement.rarity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Status Footer */}
      <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg p-4 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">QUANTUM INTELLIGENCE ACTIVE</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-300">All Systems Operational</div>
            <div className="text-xs text-green-500">Professional License: VERIFIED</div>
          </div>
        </div>
      </div>
    </div>
  );
}