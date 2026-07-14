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
    text: "Moving hundreds of meters above the soil is not natural, but it's also surreal. I love entering into places that feel hidden away from normal life.",
  },
  {
    image: skiTourImg,
    alt: "Ski touring in the mountains",
    text: "Morning ski tours amidst glaciers is one sure way to feel small. Something about moving uphill on snow always feels so slow and insecure to me, and the transition to downhill, an anticipation that builds into excitement.",
  },
  {
    image: trailRunImg,
    alt: "Trail running near Chamonix",
    text: "Moving with just your legs and a light pack is empowering... until your knees give out. I may not be made for ultra long distances (yet) but I love the feeling of moving simply like this.",
  },
  {
    image: climbingImg,
    alt: "Rock climbing",
    text: "Touching rock is like touching mother earth's heart, truly. Featured, detailed, beautiful, diverse: sandstone, granite, limestone, pockets, tufas, slabs. There is no end to the challenges that climbing will throw you — there can be no ego in climbing, the rock will always win.",
  },
];

// ─── Desktop: pinned scrollytelling ──────────────────────────────────────────
function DesktopPinned() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
  });

  return (
    <div ref={trackRef} style={{ height: trackHeight }}>
      {/* Sticky stage — 100vh so the pin math works, but the actual content
          is contained to max-w-7xl/px-8 and vertically centered, same as
          every other section on the site (Hero is the one deliberate
          full-bleed exception — this shouldn't be a second one). */}
      <div
        className="sticky top-0 overflow-hidden px-8 max-w-7xl mx-auto"
        style={{ height: "100vh" }}
      >
        <div className="flex items-center h-full gap-16">
          {/* ── Photo — contained, rounded, real aspect ratio (not 100vh) ── */}
          <div
            className="relative overflow-hidden rounded-[14px] flex-shrink-0"
            style={{
              width: 440,
              aspectRatio: "4 / 5",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
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

          {/* ── Text panel ── */}
          <div className="flex-1 flex flex-col justify-center">
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
      {/* ── Pinned scrollytelling (wide) / stacked column (narrow) ── */}
      {isWide ? <DesktopPinned /> : <MobileStacked />}
    </div>
  );
}
