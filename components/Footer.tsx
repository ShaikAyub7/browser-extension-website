export default function Footer() {
  return (
    <footer className="relative border-t border-violet-900/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.5 5H9v4l3.5 2.1.75-1.23L10.5 10.5V7z"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-white">
              Tab<span className="text-violet-400">Time</span> Tracker
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chrome Store</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>

          {/* Right */}
          <p className="text-slate-600 text-xs font-mono">
            © {new Date().getFullYear()} TabTime Tracker · v3.4.6
          </p>
        </div>
      </div>
    </footer>
  );
}
