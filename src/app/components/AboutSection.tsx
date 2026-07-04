import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

import caveImg     from "../../assets/about-me/cave.jpg";
import skiTourImg  from "../../assets/about-me/ski-tour.JPG";
import trailRunImg from "../../assets/about-me/trail-run.jpg";
import climbingImg from "../../assets/about-me/climbing.jpg";

const STEPS = [
  {
    image: caveImg,
    alt: "Cave exploration",
    text: "I'm not afraid to say the hard things. I love a bad idea almost as much as a good one — bad ideas are how you find the edges of the real one. I won't move without a strategy, and I won't pretend a system is elegant if it's untested and based on subjective feelings.",
  },
  {
    image: skiTourImg,
    alt: "Ski touring in the mountains",
    text: "That instinct comes from cartography. Maps are systems that have to hold under pressure — every symbol, every line weight is a trade-off someone made on purpose. I studied Geography at UC Berkeley, then spent my career making that same kind of decision at FATMAP, MapQuest, and now Strava.",
  },
  {
    image: trailRunImg,
    alt: "Trail running near Chamonix",
    text: "Outside of work, I find my inspiration in the mountains above Chamonix — trail running, climbing, or just staring at terrain long enough to let my mind wander.",
  },
  {
    image: climbingImg,
    alt: "Rock climbing",
    text: "Climbing especially mirrors how I work: performance when it matters, deep dedication, calculated risk, and an unrelenting desire to keep improving. It's the same curiosity — staying with a problem, failing at it, and coming back sharper.",
  },
];

// ─── Desktop: pinned scrollytelling ──────────────────────────────────────────
function DesktopPinned() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track height = (STEPS.length + 1) × 100vh so that with offset
  // ["start start", "end end"] the scroll range is exactly
  // STEPS.length × 100vh — one full viewport-height of scroll per step.
  const trackHeight = `${(STEPS.length + 1) * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Maps [0, 1] → [0, STEPS.length]; floor + clamp gives discrete step index.
  const rawStep = useTransform(scrollYProgress, [0, 1], [0, STEPS.length]);

  useMotionValueEvent(rawStep, "change", (val) => {
    const next = Math.max(0, Math.min(Math.floor(val), STEPS.length - 1));
    setActiveStep(next);
    if (next > 0) setHasScrolled(true);
  });

  return (
    <div ref={trackRef} style={{ height: trackHeight }}>
      {/* Sticky stage — 100vh, releases naturally when the track ends */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="flex h-full">
          {/* ── Left: crossfading photos ── */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ width: "50%", background: "#edeae5" }}
          >
            {STEPS.map((step, i) => (
              <motion.img
                key={i}
                src={step.image}
                alt={step.alt}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: activeStep === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeStep === i ? 1 : 0 }}
              />
            ))}
          </div>

          {/* ── Right: text panel ── */}
          <div
            className="flex flex-col justify-center flex-shrink-0"
            style={{
              width: "50%",
              background: "#faf9f7",
              padding: "0 80px",
            }}
          >
            <div style={{ maxWidth: 480 }}>
              {/* Paragraph — slides up + fades in on each step change */}
              <div style={{ minHeight: 200 }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStep}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      fontSize: 18,
                      lineHeight: 1.78,
                      color: "rgba(3, 2, 19, 0.68)",
                    }}
                  >
                    {STEPS[activeStep].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div
                className="flex items-center"
                style={{ gap: 10, marginTop: 36 }}
              >
                {STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    style={{ background: "#030213" }}
                    animate={{
                      opacity: i === activeStep ? 1 : 0.18,
                      scale: i === activeStep ? 1.35 : 1,
                      width: 8,
                      height: 8,
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  />
                ))}
              </div>

              {/* Scroll hint — fades out once reader has advanced past step 0 */}
              <motion.p
                animate={{ opacity: hasScrolled ? 0 : 1 }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  marginTop: 28,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(3, 2, 19, 0.3)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                keep scrolling ↓
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile: stacked image + text pairs (no pin) ──────────────────────────────
function MobileStacked() {
  return (
    <div style={{ padding: "8px 28px 64px" }}>
      <div className="flex flex-col" style={{ gap: 52 }}>
        {STEPS.map((step, i) => (
          <div key={i} className="flex flex-col" style={{ gap: 20 }}>
            <img
              src={step.image}
              alt={step.alt}
              style={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
                borderRadius: 16,
                display: "block",
              }}
            />
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(3, 2, 19, 0.68)",
              }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function AboutSection() {
  const [isWide, setIsWide] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 860 : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener("change", handler);
    setIsWide(mq.matches); // sync to actual viewport on mount
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div>
      {/* ── Lead-in (normal scroll, not pinned) ── */}
      <div
        className="mx-auto"
        style={{ maxWidth: 880, padding: "88px 28px 64px" }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(3, 2, 19, 0.38)",
            marginBottom: 18,
          }}
        >
          About Me
        </p>
        <h2
          style={{
            fontSize: "clamp(30px, 4.5vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.13,
            letterSpacing: "-0.025em",
            color: "#030213",
            maxWidth: 700,
          }}
        >
          I think design is a balance of risk and consequences.
        </h2>
      </div>

      {/* ── Pinned scrollytelling (wide) / stacked column (narrow) ── */}
      {isWide ? <DesktopPinned /> : <MobileStacked />}
    </div>
  );
}
