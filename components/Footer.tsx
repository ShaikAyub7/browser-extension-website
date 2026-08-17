import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative py-6 px-6"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-soft)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center">
              <Image
                src="/image.png"
                alt="TabTime Logo"
                width={24}
                height={24}
              />
            </div>
            <span
              className="font-display font-bold"
              style={{ color: "var(--text-heading)" }}
            >
              Tab<span className="text-violet-500">Time</span> Tracker
            </span>
          </div>

          <div
            className="flex items-center gap-6 text-sm"
            style={{ color: "var(--text-faint)" }}
          >
            <Link
              href="/about"
              className="hover:text-violet-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-violet-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="hover:text-violet-500 transition-colors"
            >
              Terms
            </Link>

            <a
              href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-500 transition-colors"
            >
              Edge Add-on
            </a>
            <Link
              href="/privacy"
              className="hover:text-violet-500 transition-colors"
            >
              Privacy
            </Link>
          </div>

          <p
            className="text-xs font-mono"
            style={{ color: "var(--text-faint)" }}
          >
            © {new Date().getFullYear()} TabTime Tracker · v3.4.6
          </p>
        </div>
      </div>
    </footer>
  );
}
