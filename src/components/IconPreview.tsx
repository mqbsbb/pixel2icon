import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { ProcessedIcon } from "../types";

interface IconPreviewProps {
  icons: ProcessedIcon[];
  baseFileName: string;
}

export default function IconPreview({ icons, baseFileName }: IconPreviewProps) {
  const [actualSize, setActualSize] = useState(false);

  if (icons.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          {icons.length} icon{icons.length !== 1 ? "s" : ""} selected
        </p>
        <button
          onClick={() => setActualSize(!actualSize)}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {actualSize ? (
            <>
              <Minimize2 className="w-4 h-4 mr-2" />
              Scale to Fit
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 mr-2" />
              Actual Size
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {icons.map((icon) => (
          <div
            key={`${icon.size.width}x${icon.size.height}`}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex items-center justify-center mb-4 relative">
              <div
                className={`relative flex items-center justify-center ${
                  actualSize ? "" : "w-16 h-16"
                }`}
              >
                <img
                  src={icon.dataUrl}
                  alt={`${icon.size.width}x${icon.size.height}`}
                  className={`transition-all duration-300 ${
                    actualSize ? "" : "max-w-full max-h-full object-contain"
                  }`}
                  width={actualSize ? icon.size.width : undefined}
                  height={actualSize ? icon.size.height : undefined}
                />
                {actualSize && (
                  <div className="absolute inset-0 border border-dashed border-gray-300 pointer-events-none" />
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800 mb-1">
                {baseFileName}
                {icon.size.width}
              </p>
              <p className="text-sm text-gray-500">
                {icon.size.width}x{icon.size.height}px
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
