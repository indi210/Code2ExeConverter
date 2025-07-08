import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Download, FileArchive, FileText, FileCode } from "lucide-react";

interface DownloadCenterProps {
  buildId: number | null;
}

export default function DownloadCenter({ buildId }: DownloadCenterProps) {
  const { data: files = [] } = useQuery({
    queryKey: ["/api/builds", buildId, "files"],
    enabled: !!buildId,
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "executable":
        return <FileArchive className="w-5 h-5 text-blue-400" />;
      case "license":
        return <FileText className="w-5 h-5 text-green-400" />;
      case "hash":
        return <FileCode className="w-5 h-5 text-yellow-400" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const getButtonColor = (fileType: string) => {
    switch (fileType) {
      case "executable":
        return "bg-blue-600 hover:bg-blue-700";
      case "license":
        return "bg-green-600 hover:bg-green-700";
      case "hash":
        return "bg-yellow-600 hover:bg-yellow-700";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDownload = (fileId: number) => {
    window.open(`/api/download/${fileId}`, '_blank');
  };

  return (
    <div className="bg-slate-750 rounded-xl border border-slate-600 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <Download className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">Downloads</h3>
      </div>

      <div className="space-y-3">
        {files.length > 0 ? (
          files.map((file: any) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-3">
                {getFileIcon(file.fileType)}
                <div>
                  <p className="text-white font-medium">{file.filename}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(file.filesize)}</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleDownload(file.id)}
                className={`${getButtonColor(file.fileType)} text-white px-3 py-1 text-sm`}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Download className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No files available for download</p>
            <p className="text-slate-500 text-sm mt-1">Complete a build to generate downloadable files</p>
          </div>
        )}
      </div>
    </div>
  );
}
