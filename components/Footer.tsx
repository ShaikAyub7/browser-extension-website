import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-violet-900/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center">
              <Image src="/image.png" alt="Logo" className="w-7 h-7 object-cover" width={16} height={16} />
            </div>
            <span className="font-display font-semibold text-white">
              Tab<span className="text-violet-400">Time</span> Tracker
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Edge Add-ons</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
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
