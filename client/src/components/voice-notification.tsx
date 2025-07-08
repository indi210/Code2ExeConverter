import { Volume2, X } from "lucide-react";

interface VoiceNotificationProps {
  message: string;
  show: boolean;
  onDismiss: () => void;
}

export default function VoiceNotification({ message, show, onDismiss }: VoiceNotificationProps) {
  if (!show) return null;

  return (
    <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 flex items-center space-x-3">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <Volume2 className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-blue-200 font-medium">Voice Assistant</p>
        <p className="text-blue-300 text-sm">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-blue-400 hover:text-blue-200">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
