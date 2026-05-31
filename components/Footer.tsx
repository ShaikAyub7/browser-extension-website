import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-snow-200 bg-white py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center">
              <Image src="/image.png" alt="TabTime Logo" width={24} height={24} />
            </div>
            <span className="font-display font-bold text-ink-900">
              Tab<span className="text-violet-500">Time</span> Tracker
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-ink-400">
            <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
            <a href="#faq" className="hover:text-violet-600 transition-colors">FAQ</a>
            <Link href="/whats-new" className="hover:text-violet-600 transition-colors flex items-center gap-1.5">
              What&apos;s new
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"/>
            </Link>
            <a href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe" target="_blank" rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors">Edge Add-on</a>
            <Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy</Link>
          </div>

          <p className="text-ink-400 text-xs font-mono">
            © {new Date().getFullYear()} TabTime Tracker · v3.4.6
          </p>
        </div>
      </div>
    </footer>
  );
}
