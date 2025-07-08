import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link2, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BlockchainVerificationProps {
  buildId: number | null;
}

export default function BlockchainVerification({ buildId }: BlockchainVerificationProps) {
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [blockchainHash, setBlockchainHash] = useState<string>("");
  const { toast } = useToast();

  const { data: build } = useQuery({
    queryKey: ["/api/builds", buildId],
    enabled: !!buildId,
  });

  const verifyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/blockchain/verify", { 
        buildId,
        hash: build?.hash 
      });
      return response.json();
    },
    onSuccess: (data) => {
      setVerificationStatus("verified");
      setBlockchainHash(data.blockchainHash);
      toast({
        title: "Blockchain Verification Complete",
        description: "Build has been registered on blockchain",
      });
    },
    onError: () => {
      setVerificationStatus("failed");
      toast({
        title: "Verification Failed",
        description: "Unable to verify on blockchain",
        variant: "destructive",
      });
    },
  });

  const handleVerify = () => {
    if (!buildId || !build?.hash) {
      toast({
        title: "No Build Available",
        description: "Complete a build first to enable blockchain verification",
        variant: "destructive",
      });
      return;
    }
    
    setVerificationStatus("verifying");
    verifyMutation.mutate();
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "verified": return "text-green-400";
      case "failed": return "text-red-400";
      case "verifying": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "verified": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "failed": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "verifying": return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-slate-750 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span>Blockchain Verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Status</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm capitalize ${getStatusColor()}`}>
              {verificationStatus}
            </span>
          </div>
        </div>

        {verificationStatus === "verifying" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Registering on blockchain...</span>
              <span className="text-slate-400">60%</span>
            </div>
            <Progress value={60} className="bg-slate-800" />
          </div>
        )}

        {build?.hash && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">File Hash (SHA256)</div>
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
              <span className="font-mono text-xs text-green-400 break-all">
                {build.hash}
              </span>
            </div>
          </div>
        )}

        {blockchainHash && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">Blockchain Transaction ID</div>
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
              <span className="font-mono text-xs text-cyan-400 break-all">
                {blockchainHash}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 text-center">
            <div className="text-lg font-semibold text-white">
              {verificationStatus === "verified" ? "✓" : "--"}
            </div>
            <div className="text-xs text-slate-400">Verified</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 text-center">
            <div className="text-lg font-semibold text-white">
              {verificationStatus === "verified" ? new Date().toLocaleDateString() : "--"}
            </div>
            <div className="text-xs text-slate-400">Date</div>
          </div>
        </div>

        <Button
          onClick={handleVerify}
          disabled={!buildId || !build?.hash || verificationStatus === "verifying"}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          {verificationStatus === "verifying" ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Link2 className="w-4 h-4 mr-2" />
          )}
          {verificationStatus === "verified" ? "Re-verify on Blockchain" : "Verify on Blockchain"}
        </Button>

        <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center space-x-2 text-sm text-cyan-400">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Legal Protection Active</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Blockchain verification provides immutable proof of creation and ownership
          </p>
        </div>
      </CardContent>
    </Card>
  );
}