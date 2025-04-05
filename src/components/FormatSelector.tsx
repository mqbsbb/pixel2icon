import { Info, Check } from "lucide-react";
import { FormatOption, OutputFormat } from "../types";

const formatOptions: FormatOption[] = [
  {
    value: "png",
    label: "PNG",
    description: "Best for icons with transparency",
    estimatedSize: "~2-10KB",
    supportedInput: ["png", "jpg", "jpeg", "svg"],
  },
  {
    value: "jpeg",
    label: "JPEG",
    description: "Smallest file size, no transparency",
    estimatedSize: "~1-5KB",
    supportedInput: ["png", "jpg", "jpeg", "svg"],
  },
  {
    value: "svg",
    label: "SVG",
    description: "Vector format, perfect scaling",
    estimatedSize: "~1-3KB",
    supportedInput: ["svg"],
  },
];

interface FormatSelectorProps {
  selectedFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
  currentInputFormat: string;
}

export default function FormatSelector({
  selectedFormat,
  onFormatChange,
  currentInputFormat,
}: FormatSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formatOptions.map((format) => {
          const isSupported = format.supportedInput.includes(
            currentInputFormat.split("/")[1]
          );

          return (
            <button
              key={format.value}
              onClick={() => isSupported && onFormatChange(format.value)}
              className={`p-5 rounded-lg border-2 transition-all duration-200 relative 
                ${
                  selectedFormat === format.value
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : isSupported
                    ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    : "border-gray-200 opacity-50 cursor-not-allowed"
                }`}
              disabled={!isSupported}
            >
              {selectedFormat === format.value && (
                <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="flex items-center mb-3">
                <span className="text-xl font-semibold">{format.label}</span>
                <div className="group relative ml-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {format.description}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 mb-3">
                <div className="text-sm text-gray-600">Typical size:</div>
                <div className="font-medium">{format.estimatedSize}</div>
              </div>
              {!isSupported && (
                <p className="text-xs text-red-500 mt-2">
                  Not supported for current input
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
