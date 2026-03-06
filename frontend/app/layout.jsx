import "./globals.css";

export const metadata = {
  title: "Upload & Extract",
  description: "Upload a PDF/image, extract text, calculate age.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-bg">
        <div className="min-h-screen">
          {/* Top bar */}
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <span className="text-sm font-semibold">UX</span>
                </div>
                <div>
                  <h1 className="text-sm font-semibold leading-tight text-slate-900">
                    File Upload Text Extractor
                  </h1>
                  <p className="text-xs text-slate-600">
                    PDF parsing + image OCR + age calculation
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="badge">Next.js</span>
                <span className="badge">Tailwind</span>
                <span className="badge">Express</span>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white/60 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-600">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span>Built with Next.js, Tailwind CSS, and Express.</span>
                <span>
                  API health: <span className="kbd">http://localhost:5000/health</span>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}