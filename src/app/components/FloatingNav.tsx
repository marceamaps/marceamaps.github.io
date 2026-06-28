import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const NAV_ITEMS = [
  { label: "About",    id: "about"    },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact"  },
] as const;

type SectionId = typeof NAV_ITEMS[number]["id"] | "home";

export default function FloatingNav() {
  const reduced                  = useReducedMotion();
  const [active, setActive]     = useState<SectionId>("home");
  const [visible, setVisible]   = useState(true);
  const [mounted, setMounted]   = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pillRef                 = useRef<HTMLSpanElement>(null);
  const itemRefs                = useRef<Record<string, HTMLButtonElement | null>>({});
  const trackRef                = useRef<HTMLDivElement>(null);
  const scrollTimer             = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll-spy ──────────────────────────────────────────────────────────
  useEffect(() => {
    const sections: SectionId[] = ["home", "about", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Track whether we've scrolled past the hero ──────────────────────────
  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  // ── Slide pill to active item (hide when home) ───────────────────────────
  useEffect(() => {
    const pill  = pillRef.current;
    const track = trackRef.current;
    if (!pill || !track) return;

    if (active === "home") {
      pill.style.opacity = "0";
      pill.style.width   = "0px";
      return;
    }

    const btn = itemRefs.current[active];
    if (!btn) return;

    const trackBox = track.getBoundingClientRect();
    const btnBox   = btn.getBoundingClientRect();
    pill.style.opacity = "1";
    pill.style.left    = `${btnBox.left - trackBox.left}px`;
    pill.style.width   = `${btnBox.width}px`;
  }, [active]);

  // ── Entrance: slide in from top after hero text has settled ────────────
  useEffect(() => {
    if (reduced) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(true), 1050);
    return () => clearTimeout(t);
  }, [reduced]);

  // ── Hide while scrolling ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setVisible(true), 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Logo — top left, fixed, independent of nav pill ── */}
      <button
        onClick={() => scrollTo("home")}
        aria-label="Back to top"
        className={`fixed top-8 left-8 z-50 transition-all duration-500 ease-out ${
          visible && mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
        style={{
          filter: pastHero
            ? "drop-shadow(0 1px 8px rgba(0,0,0,0.10))"
            : "none",
        }}
      >
        <svg width="52" height="24" viewBox="0 0 698 326" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M124 199.999C154 164.999 192 123.999 219 120.999C239 118.999 246 132.999 238 150.999C229 170.999 220 187.999 232 193.999C247 201.999 268 166.999 296 157.999C321 149.999 334 163.999 332 182.999C329 212.999 439 199.5 433 178C427 156.5 380 167.5 376 193.999C372 220.498 392.5 237 421 237C449.5 237 489.9 214.9 499.5 200.5"
            stroke="#232323"
            strokeWidth="17"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="558" cy="190" r="17" fill="#6F8DD5" />
        </svg>
      </button>

      {/* ── Nav pill — centred ── */}
      <nav
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          visible && mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        <div className="flex items-center bg-[rgba(249,246,241,0.85)] backdrop-blur-xl border border-black/[0.08] rounded-full px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.07)]">

          {/* Nav items */}
          <div ref={trackRef} className="relative flex items-center gap-0.5">

            {/* Sliding pill */}
            <span
              ref={pillRef}
              className="absolute top-0 h-full rounded-full bg-black/[0.07] pointer-events-none"
              style={{
                left: 0,
                width: 0,
                opacity: 0,
                transition:
                  "left 380ms cubic-bezier(0.34,1.56,0.64,1), width 380ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease",
              }}
              aria-hidden
            />

            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                ref={(el) => { itemRefs.current[id] = el; }}
                onClick={() => scrollTo(id)}
                className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ${
                  active === id
                    ? "text-black/85"
                    : "text-black/40 hover:text-black/65"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
