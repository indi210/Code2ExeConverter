import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle } from "lucide-react";

export default function BuildHistory() {
  const { data: builds = [], isLoading } = useQuery({
    queryKey: ["/api/builds"],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-900 text-green-300";
      case "failed":
        return "bg-red-900 text-red-300";
      case "building":
        return "bg-blue-900 text-blue-300";
      default:
        return "bg-gray-900 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "failed") {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <ExternalLink className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Builds</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Builds</h3>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {builds.length > 0 ? (
          builds.slice(0, 5).map((build: any) => (
            <div key={build.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  build.status === "success" ? "bg-green-400" :
                  build.status === "failed" ? "bg-red-400" :
                  build.status === "building" ? "bg-blue-400 animate-pulse" : "bg-gray-400"
                }`} />
                <div>
                  <p className="text-white font-medium">{build.filename}</p>
                  <p className="text-xs text-slate-400">
                    {formatDate(build.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusBadge(build.status)}`}>
                  {build.status}
                </span>
                <button className="text-slate-400 hover:text-white">
                  {getStatusIcon(build.status)}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-slate-400">No builds yet</p>
            <p className="text-slate-500 text-sm mt-1">Your build history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
