export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="text-center text-sm">
        <div>
          © {year} Pixel2Icon | Page loaded: {performance.now().toFixed(2)} ms
        </div>
      </div>
    </footer>
  );
}
