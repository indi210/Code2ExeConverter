import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Bell, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function EmailAlerts() {
  const [email, setEmail] = useState("radosavlevici210@icloud.com");
  const [isEnabled, setIsEnabled] = useState(true);
  const { toast } = useToast();

  const toggleAlertsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/email/toggle", { 
        email, 
        enabled: !isEnabled 
      });
      return response.json();
    },
    onSuccess: () => {
      setIsEnabled(!isEnabled);
      toast({
        title: isEnabled ? "Email Alerts Disabled" : "Email Alerts Enabled",
        description: `Build notifications will ${!isEnabled ? "be sent to" : "stop being sent to"} ${email}`,
      });
    },
  });

  return (
    <Card className="bg-slate-750 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span>Email Alert System</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Status</span>
          <Badge variant={isEnabled ? "default" : "secondary"}>
            {isEnabled ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </>
            ) : (
              <>
                <Bell className="w-3 h-3 mr-1" />
                Disabled
              </>
            )}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-300">
            Alert Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="Enter email for alerts"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-300">Alert Types</div>
          <div className="space-y-1 text-xs text-slate-400">
            <div>• Build completion notifications</div>
            <div>• Security alerts and tamper detection</div>
            <div>• Unauthorized access attempts</div>
            <div>• System status updates</div>
          </div>
        </div>

        <Button
          onClick={() => toggleAlertsMutation.mutate()}
          disabled={toggleAlertsMutation.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          {toggleAlertsMutation.isPending ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Bell className="w-4 h-4 mr-2" />
          )}
          {isEnabled ? "Disable" : "Enable"} Email Alerts
        </Button>
      </CardContent>
    </Card>
  );
}