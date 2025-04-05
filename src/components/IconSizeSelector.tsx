import { IconSize } from "../types";
import { Check, Square } from "lucide-react";

interface IconSizeSelectorProps {
  sizes: IconSize[];
  onSizeToggle: (index: number) => void;
}

export default function IconSizeSelector({
  sizes,
  onSizeToggle,
}: IconSizeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sizes.map((size, index) => (
        <button
          key={`${size.width}x${size.height}`}
          onClick={() => onSizeToggle(index)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
            ${
              size.checked
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{size.label}</span>
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                size.checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
              }`}
            >
              {size.checked && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            <Square
              className="text-gray-400"
              style={{
                width: `${Math.min(48, Math.max(16, size.width / 8))}px`,
                height: `${Math.min(48, Math.max(16, size.height / 8))}px`,
              }}
              strokeWidth={1}
            />
          </div>
          <div className="mt-2 text-xs text-center text-gray-500">
            {size.width}x{size.height}px
          </div>
        </button>
      ))}
    </div>
  );
}
