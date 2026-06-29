import { Download, Linkedin, Instagram } from "lucide-react";
import resumePdf from "../../assets/Marcea_Ennamorato_CV.pdf";

const EPATH_TOP = "M20.4539 24.0442L28.7536 40.3638H40.9233L20.4539 0L0 40.3638H12.1853L20.4539 24.0442Z";
const EPATH_BOT = "M34.9693 52.5667L28.8766 40.4125L19.7998 40.428L34.9693 70.4871L50.1232 40.4125H41.0464L34.9693 52.5667Z";

function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 51 71" fill="currentColor" className={className} aria-hidden>
      <path d={EPATH_TOP} />
      <path d={EPATH_BOT} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t border-black/[0.07] px-8 md:px-16 lg:px-24 py-10"
      id="contact"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
        <a
          href="mailto:marcea.irene@gmail.com"
          className="text-sm text-black/50 hover:text-black transition-colors duration-200 tracking-wide"
        >
          marcea.irene@gmail.com
        </a>

        <div className="flex items-center gap-6">
          <a
            href={resumePdf}
            download
            aria-label="Download resume"
            className="text-black/35 hover:text-black transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/marceaennamorato"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black/35 hover:text-black transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/marcea___irene"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-black/35 hover:text-black transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.strava.com/athletes/23923315"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Strava"
            className="text-black/35 hover:text-black transition-colors duration-200"
          >
            <StravaIcon className="w-5 h-5" />
          </a>
          <span className="text-xs text-black/25 font-medium">
            © 2026 Marcea Ennamorato
          </span>
        </div>
      </div>
    </footer>
  );
}
