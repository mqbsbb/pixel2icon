import { useState, useCallback, useEffect } from "react";
import { Download, AlertCircle } from "lucide-react";
import JSZip from "jszip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FileUploader from "./components/FileUploader";
import IconSizeSelector from "./components/IconSizeSelector";
import IconPreview from "./components/IconPreview";
import FormatSelector from "./components/FormatSelector";
import { IconSize, ProcessedIcon, OutputFormat } from "./types";

const defaultSizes: IconSize[] = [
  { width: 16, height: 16, label: "Favicon", checked: true },
  { width: 32, height: 32, label: "Small", checked: true },
  { width: 48, height: 48, label: "Medium", checked: true },
  { width: 64, height: 64, label: "Large", checked: true },
  { width: 128, height: 128, label: "Extra Large", checked: false },
  { width: 192, height: 192, label: "Android", checked: false },
  { width: 256, height: 256, label: "2x Large", checked: false },
  { width: 512, height: 512, label: "Maximum", checked: false },
];

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [baseFileName, setBaseFileName] = useState("icon");
  const [sizes, setSizes] = useState<IconSize[]>(defaultSizes);
  const [processedIcons, setProcessedIcons] = useState<ProcessedIcon[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");

  useEffect(() => {
    if (selectedFile) {
      processImage(selectedFile);
    }
  }, [sizes, outputFormat, selectedFile]);

  const handleFileSelect = useCallback(async (file: File) => {
    setSelectedFile(file);
    setError(null);
  }, []);

  const handleSizeToggle = useCallback((index: number) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = {
        ...newSizes[index],
        checked: !newSizes[index].checked,
      };
      return newSizes;
    });
  }, []);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    const processed: ProcessedIcon[] = [];

    const img = new window.Image();
    const reader = new FileReader();

    try {
      const imageUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not get canvas context");

      for (const size of sizes.filter((s) => s.checked)) {
        canvas.width = size.width;
        canvas.height = size.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size.width, size.height);

        const mimeType =
          outputFormat === "svg" && file.type === "image/svg+xml"
            ? file.type
            : `image/${outputFormat}`;

        const dataUrl = canvas.toDataURL(
          mimeType,
          outputFormat === "jpeg" ? 0.9 : undefined
        );
        processed.push({ size, dataUrl });
      }

      setProcessedIcons(processed);
    } catch (error) {
      console.error("Error processing image:", error);
      setError(
        "Failed to process image. Please try again with a different file or format."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormatChange = (format: OutputFormat) => {
    setOutputFormat(format);
    if (selectedFile) {
      processImage(selectedFile);
    }
  };

  const handleDownload = async () => {
    if (processedIcons.length === 0) return;

    const zip = new JSZip();

    processedIcons.forEach((icon) => {
      const fileName = `${baseFileName}${icon.size.width}.${outputFormat}`;
      const base64Data = icon.dataUrl.split(",")[1];
      zip.file(fileName, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseFileName}-icons.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center mb-12" id="features">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Create perfect icons in seconds
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upload an image, choose your sizes, and download all your icons at
              once.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for web apps, extensions, and mobile applications.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-3 font-bold">
                  1
                </span>
                Upload Image
              </h2>
              <FileUploader onFileSelect={handleFileSelect} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>

            {selectedFile && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-3 font-bold">
                      2
                    </span>
                    Choose Output Format
                  </h2>
                  <FormatSelector
                    selectedFormat={outputFormat}
                    onFormatChange={handleFormatChange}
                    currentInputFormat={selectedFile.type}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-3 font-bold">
                      3
                    </span>
                    Choose Icon Sizes
                  </h2>
                  <IconSizeSelector
                    sizes={sizes}
                    onSizeToggle={handleSizeToggle}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-3 font-bold">
                      4
                    </span>
                    Set Base Filename
                  </h2>
                  <div className="max-w-md">
                    <label
                      htmlFor="baseFileName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Base Filename
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="baseFileName"
                        value={baseFileName}
                        onChange={(e) =>
                          setBaseFileName(
                            e.target.value.replace(/[^a-zA-Z0-9-_]/g, "")
                          )
                        }
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        placeholder="Enter base filename"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      The size will be automatically appended (e.g.,{" "}
                      {baseFileName}
                      16, {baseFileName}32)
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-semibold flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-3 font-bold">
                        5
                      </span>
                      Preview & Download
                    </h2>
                    <button
                      onClick={handleDownload}
                      disabled={isProcessing || processedIcons.length === 0}
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:w-auto w-full justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All Icons
                    </button>
                  </div>
                  {isProcessing ? (
                    <div className="text-center py-16">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-6 text-gray-600 font-medium">
                        Processing your icons...
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        This should only take a moment
                      </p>
                    </div>
                  ) : (
                    <IconPreview
                      icons={processedIcons}
                      baseFileName={baseFileName}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
