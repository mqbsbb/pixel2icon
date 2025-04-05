export interface IconSize {
  width: number;
  height: number;
  label: string;
  checked: boolean;
}

export interface ProcessedIcon {
  size: IconSize;
  dataUrl: string;
}

export type OutputFormat = "png" | "jpeg" | "svg";

export interface FormatOption {
  value: OutputFormat;
  label: string;
  description: string;
  estimatedSize: string;
  supportedInput: string[];
}
