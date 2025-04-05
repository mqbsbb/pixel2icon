import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image, File } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 scale-102"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div
          className={`p-4 rounded-full mb-4 transition-all duration-300 ${
            isDragActive ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {isDragActive ? (
            <Upload className="h-12 w-12 text-blue-500" />
          ) : (
            <Image className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-xl font-medium mb-2">
          {isDragActive ? "Drop your image here" : "Upload your image"}
        </h3>
        <p className="text-gray-600 mb-4">
          {isDragActive
            ? "Release to upload"
            : "Drag & drop or click to browse"}
        </p>
        <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center">
            <File className="h-4 w-4 mr-1" />
            <span>PNG</span>
          </div>
          <div className="flex items-center">
            <File className="h-4 w-4 mr-1" />
            <span>JPG</span>
          </div>
          <div className="flex items-center">
            <File className="h-4 w-4 mr-1" />
            <span>SVG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
