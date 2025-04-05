# Pixel2Icon

Efficient web application for converting images to icon assets for web and app development. With a simple and intuitive interface, it allows you to transform your images into multiple icon sizes at once.

## Features

- **Multiple Format Support**: Upload PNG, JPG, or SVG images
- **Customizable Icon Sizes**: Select from standard icon sizes or use custom dimensions
- **Live Preview**: Preview your icons before downloading
- **Format Options**: Convert to PNG, JPEG, or keep SVG format
- **Batch Download**: Download all selected icon sizes in a single ZIP file

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mqbsbb/pixel2icon.git
   cd pixel2icon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## How to Use

1. **Upload Image**: Drag and drop or select an image file (PNG, JPG, SVG)
2. **Choose Format**: Select your desired output format (PNG, JPEG, SVG)
3. **Select Sizes**: Choose from various standard icon sizes
4. **Set Base Filename**: Enter a base name for your icon files
5. **Download**: Preview and download all icons as a ZIP package

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- JSZip (for generating ZIP files)
- Canvas API (for image processing)

## Browser Compatibility

Pixel2Icon works on all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
