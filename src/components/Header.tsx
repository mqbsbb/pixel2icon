import { Github } from "lucide-react";
import iconImage from "../assets/icon.png";

export default function Header() {
  return (
    <header className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-700 text-white shadow-md">
      {/* Top highlight effect */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row items-center justify-between py-6">
          {/* Logo and branding */}
          <a
            href="/"
            className="flex items-center mb-4 md:mb-0 hover:opacity-85 transition-opacity"
          >
            <div className="mr-3 shadow-lg">
              <img
                src={iconImage}
                alt="Pixel2Icon Icon"
                className="h-8 w-8 relative z-10 transition-all duration-300"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="font-bold">Pixel2Icon</span>
              </h1>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="https://github.com/mqbsbb/pixel2icon"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              <span className="font-medium">GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
