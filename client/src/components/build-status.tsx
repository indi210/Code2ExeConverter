import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Rocket } from "lucide-react";

interface BuildStatusProps {
  buildId: number | null;
}

export default function BuildStatus({ buildId }: BuildStatusProps) {
  const { data: build, isLoading } = useQuery({
    queryKey: ["/api/builds", buildId],
    enabled: !!buildId,
    refetchInterval: buildId ? 2000 : false, // Poll every 2 seconds while building
  });

  const buildSteps = [
    { label: "Authentication verified", completed: true },
    { label: "Dependencies analyzed", completed: true },
    { label: "Building executable...", completed: build?.status === "success", inProgress: build?.status === "building" },
    { label: "Generating security hash", completed: build?.status === "success", inProgress: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      case "building":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Build Status</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            build?.status === "building" ? "bg-blue-400 animate-pulse" :
            build?.status === "success" ? "bg-green-400" :
            build?.status === "failed" ? "bg-red-400" : "bg-gray-400"
          }`} />
          <span className={`text-sm ${getStatusColor(build?.status || "idle")}`}>
            {build?.status === "building" ? "Building" :
             build?.status === "success" ? "Complete" :
             build?.status === "failed" ? "Failed" : "Idle"}
          </span>
        </div>
      </div>

      {build && build.status !== "idle" ? (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Processing: {build.filename}</span>
              <span className="text-slate-400 text-sm">
                {build.status === "building" ? "In Progress" : 
                 build.status === "success" ? "100%" : "Failed"}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  build.status === "success" ? "bg-green-600" :
                  build.status === "failed" ? "bg-red-600" : "bg-blue-600"
                }`}
                style={{ 
                  width: build.status === "success" ? "100%" :
                         build.status === "failed" ? "100%" : "45%" 
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {buildSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                {step.inProgress ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : step.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <div className="w-4 h-4 border-2 border-slate-600 rounded-full" />
                )}
                <span className={step.completed ? "text-slate-300" : step.inProgress ? "text-white" : "text-slate-500"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {build.errorMessage && (
            <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-3">
              <p className="text-red-300 text-sm">{build.errorMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Rocket className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">Ready to build your next project</p>
          <p className="text-slate-500 text-sm mt-1">Upload a Python file or GitHub repository to get started</p>
        </div>
      )}
    </div>
  );
}
