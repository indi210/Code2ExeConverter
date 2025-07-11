import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, File } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  acceptedTypes?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export default function FileUpload({
  onFileSelect,
  disabled = false,
  acceptedTypes = {
    'text/x-python': ['.py'],
    'application/javascript': ['.js'],
    'text/typescript': ['.ts'],
    'text/x-java-source': ['.java'],
    'text/x-c': ['.c'],
    'text/x-c++src': ['.cpp'],
    'text/x-csharp': ['.cs'],
    'text/x-go': ['.go'],
    'text/x-rust': ['.rs'],
    'text/x-ruby': ['.rb'],
    'text/x-php': ['.php']
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  className
}: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    accept: acceptedTypes,
    maxSize,
    multiple: false,
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
        isDragActive
          ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          : "border-slate-600 hover:border-slate-500",
        isDragReject && "border-red-400 bg-red-50 dark:bg-red-950/20",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-6 h-6 text-blue-400" />
          ) : (
            <File className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-white">
            {isDragActive
              ? "Drop your file here..."
              : "Upload Python, JS, Java, C++ or other source files"}
          </p>
          <p className="text-xs text-slate-400">
            Drag & drop or click to browse • Max {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
        {isDragReject && (
          <p className="text-xs text-red-400">
            File type not supported or file too large
          </p>
        )}
      </div>
    </div>
  );
}