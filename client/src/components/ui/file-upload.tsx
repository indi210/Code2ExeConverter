import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, accept = ".py", disabled = false }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/x-python': ['.py'] },
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
        isDragActive
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-600 hover:border-blue-500"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      <CloudUpload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <p className="text-white font-medium mb-2">
        {isDragActive ? "Drop Python file here" : "Drop Python file here"}
      </p>
      <p className="text-slate-400 text-sm">
        or click to browse (.py files only)
      </p>
    </div>
  );
}
