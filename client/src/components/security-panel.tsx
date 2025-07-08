import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Fingerprint, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityPanelProps {
  buildId: number | null;
}

export default function SecurityPanel({ buildId }: SecurityPanelProps) {
  const { toast } = useToast();
  const { data: build } = useQuery({
    queryKey: ["/api/builds", buildId],
    enabled: !!buildId,
  });

  const copyHash = () => {
    if (build?.hash) {
      navigator.clipboard.writeText(build.hash);
      toast({
        title: "Hash Copied",
        description: "SHA256 hash copied to clipboard",
      });
    }
  };

  const displayHash = build?.hash || "No hash available";
  const truncatedHash = displayHash.length > 32 ? `${displayHash.substring(0, 32)}...` : displayHash;

  return (
    <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <Fingerprint className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">Security Verification</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">SHA256 Hash</label>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 flex items-center justify-between">
            <span className="font-mono text-sm text-green-400 flex-1 mr-2">
              {truncatedHash}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyHash}
              disabled={!build?.hash}
              className="text-slate-400 hover:text-white p-1"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
            <div className="text-lg font-semibold text-white">{build?.fileCount || 0}</div>
            <div className="text-xs text-slate-400">Files Processed</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
            <div className="text-lg font-semibold text-white">
              {build?.buildTime ? `${build.buildTime}s` : "--"}
            </div>
            <div className="text-xs text-slate-400">Build Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
