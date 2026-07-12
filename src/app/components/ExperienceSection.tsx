import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { LABEL_CLASS, TYPE } from "./caseStudyKit";

const AMBER = "#E8640A";

// ─── GPX elevation data ────────────────────────────────────────────────────────
// Mount Eva Ski Tour · Strava export · May 2021
// Downsampled to 199 points (every 15th of 2968 recorded).
const ELEV_RAW = [
  3093.3,3092.3,3091.6,3095.8,3101.3,3105.0,3108.7,3111.1,3111.6,3114.7,
  3118.4,3122.1,3127.7,3131.4,3136.1,3140.9,3149.4,3152.6,3158.7,3162.5,
  3168.1,3171.6,3179.2,3187.9,3193.4,3199.6,3207.5,3216.2,3222.0,3228.3,
  3235.1,3241.6,3248.2,3256.6,3262.6,3267.7,3273.7,3280.4,3288.7,3295.7,
  3303.6,3310.1,3315.2,3318.5,3322.0,3325.9,3328.4,3329.4,3336.1,3341.8,
  3351.0,3355.6,3353.2,3351.3,3351.4,3351.3,3351.3,3351.1,3351.5,3353.9,
  3366.4,3370.8,3370.6,3371.7,3376.7,3385.6,3390.4,3399.5,3405.7,3414.7,
  3427.3,3440.8,3450.4,3453.7,3454.5,3459.9,3464.1,3467.2,3475.2,3482.0,
  3493.2,3500.5,3503.6,3511.9,3525.6,3543.1,3551.3,3556.7,3574.3,3579.9,
  3597.8,3598.4,3601.1,3604.1,3606.5,3608.8,3611.7,3618.1,3624.0,3630.5,
  3633.8,3642.0,3647.5,3648.2,3649.0,3650.5,3666.8,3671.3,3679.9,3692.0,
  3703.5,3708.7,3735.7,3740.8,3752.0,3775.3,3782.9,3784.2,3784.2,3784.2,
  3784.2,3788.5,3797.7,3810.0,3816.4,3823.8,3830.5,3834.7,3840.9,3851.5,
  3861.8,3868.5,3877.3,3886.5,3898.5,3907.3,3914.5,3920.7,3929.2,3971.8,
  3969.4,3969.4,3969.4,3969.4,3969.4,3969.4,3969.4,3969.4,3911.8,3837.8,
  3810.8,3810.8,3783.9,3783.9,3777.2,3693.4,3626.9,3602.3,3601.4,3600.6,
  3598.6,3586.3,3557.0,3525.9,3502.9,3473.8,3463.8,3463.0,3461.4,3455.1,
  3444.2,3434.0,3412.4,3395.0,3384.7,3372.6,3361.8,3361.2,3358.4,3358.9,
  3361.6,3356.8,3342.2,3324.6,3303.7,3271.8,3243.6,3222.3,3198.3,3178.8,
  3158.5,3149.3,3133.4,3120.9,3112.0,3108.7,3101.6,3092.7,3092.1,
];

const ELEV_MIN = 3091.6;
const ELEV_MAX = 3975.1;

// ─── SVG geometry ─────────────────────────────────────────────────────────────
const VB_W    = 800;
const VB_H    = 172;
const BASELINE_Y = 154;
const USABLE_H   = 140;

function elevToY(e: number): number {
  return BASELINE_Y - ((e - ELEV_MIN) / (ELEV_MAX - ELEV_MIN)) * USABLE_H;
}
function indexToX(i: number): number {
  return (i / (ELEV_RAW.length - 1)) * VB_W;
}

// ─── Career milestones pinned to real track positions ─────────────────────────
const PEAK_DEFS = [
  { idx: 27,  label: "SF Public Press", expIdx: 4 },
  { idx: 51,  label: "MapQuest",        expIdx: 3 },
  { idx: 84,  label: "OuterSpatial",    expIdx: 2 },
  { idx: 114, label: "FATMAP",          expIdx: 1 },
  { idx: 139, label: "Strava",          expIdx: 0 },
] as const;

const PEAKS = PEAK_DEFS.map((p) => ({
  ...p,
  x: indexToX(p.idx),
  y: elevToY(ELEV_RAW[p.idx]),
}));

// ─── Catmull-Rom → cubic-Bézier path ─────────────────────────────────────────
function catmullRomPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const PROFILE_PTS = ELEV_RAW.map((e, i) => ({ x: indexToX(i), y: elevToY(e) }));
const LINE_PATH   = catmullRomPath(PROFILE_PTS);

// Summit x position — everything to the right is descent
const SUMMIT_IDX = 139;
const SUMMIT_X   = indexToX(SUMMIT_IDX);

// ─── Steepness gradient ───────────────────────────────────────────────────────
// Central difference slope at each point, normalized with a power curve so
// moderate gradients are visible, not just the sharpest spikes.
const SLOPES_RAW = ELEV_RAW.map((_, i) => {
  const prev = ELEV_RAW[Math.max(0, i - 1)];
  const next = ELEV_RAW[Math.min(ELEV_RAW.length - 1, i + 1)];
  return Math.abs(next - prev) / 2;
});
const SLOPE_MAX  = Math.max(...SLOPES_RAW);
const SLOPES_NORM = SLOPES_RAW.map(s => Math.pow(s / SLOPE_MAX, 0.6));

// Dot entrance delays: proportional to x position along ascent
// Range: 0.5s (leftmost) → 1.55s (summit)
function dotDelay(peakX: number): number {
  return 0.5 + (peakX / VB_W) * 1.2;
}

// ─── Experience data ───────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    company: "Strava",
    role: "Product Designer",
    date: "2022–Present",
    location: "Chamonix-Mont-Blanc",
    description:
      "Following the acquisition of FATMAP, continued designing map-centric and activity experiences across web, mobile, and wearables at Strava. Focused on activity recording, mapping, live experiences, and post-activity storytelling—balancing real-world athlete needs, platform constraints, and long-term product strategy at scale.",
    tags: ["0→1", "Mobile", "Wearables", "Maps"],
  },
  {
    company: "FATMAP",
    role: "Product Designer",
    date: "2021–2022",
    location: "Chamonix-Mont-Blanc",
    description:
      "Worked closely with founder Misha Gopaul in a small, high-ownership team to evolve FATMAP's core product ahead of its acquisition by Strava. One of two designers on the mobile and web platform, focusing on subscription growth, onboarding, and complex map-driven features. Key work included upsell flows, avalanche forecasting, a community heatmap, and contributing to a full native rebuild of the app.",
    tags: ["Startup", "Mobile", "Maps", "Growth"],
  },
  {
    company: "OuterSpatial",
    role: "Product Designer",
    date: "2018–2021",
    location: "Denver",
    description:
      "Led end-to-end product design for web, iOS, and Android in a small startup environment. Owned UX, UI, and cartographic design systems, including basemaps, map styles, and geospatial features. Collaborated closely with founders, engineers, and users to ship new functionality and validate designs in-market.",
    tags: ["Lead", "Mobile", "Web", "Cartography"],
  },
  {
    company: "MapQuest",
    role: "Cartographer",
    date: "2017–2018",
    location: "Denver",
    description:
      "Led the full redesign of MapQuest's mobile map experience, used by tens of millions of monthly users. Researched navigation trends, applied cartographic conventions, and delivered features such as real-time parking. Presented design decisions cross-functionally and company-wide.",
    tags: ["Scale", "Mobile", "Navigation"],
  },
  {
    company: "SF Public Press",
    role: "Freelance Cartographer",
    date: "2015–2017",
    location: "San Francisco",
    description:
      "Produced data-driven cartographic work focused on sea-level rise and urban development in the San Francisco Bay Area. Analyzed complex spatial datasets, uncovered data issues, and collaborated with journalists to deliver clear, accurate visual storytelling.",
    tags: ["Freelance", "Data", "Editorial"],
  },
];

// ─── Primitives ───────────────────────────────────────────────────────────────
// This section's Eyebrow uses a taller bottom margin (mb-10 vs. the shared
// component's mb-5) to match its larger vertical rhythm, so the label markup
// is inlined here rather than reusing <SharedEyebrow> directly. The label
// styling itself (10px / tracking-[0.14em] / font-medium / uppercase) comes
// from the shared LABEL_CLASS constant, so it can never drift from the rest
// of the site.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div
        aria-hidden
        className="flex-shrink-0 w-[26px] h-[3px] rounded-sm"
        style={{ background: AMBER }}
      />
      <p className={`${LABEL_CLASS} leading-none text-black/35`}>
        {children}
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const [selectedPeak, setSelectedPeak] = useState(4);
  const svgRef     = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const reduced    = useReducedMotion();

  // Lock the detail panel height to the tallest item seen so far so
  // AnimatePresence's mode="wait" gap never collapses the section.
  const detailMinHeightRef = useRef(0);
  const [detailMinHeight, setDetailMinHeight] = useState(0);
  const detailMeasureRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const h = node.offsetHeight;
    if (h > detailMinHeightRef.current) {
      detailMinHeightRef.current = h;
      setDetailMinHeight(h);
    }
  }, []);

  const [fired, setFired] = useState(false);

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || fired) return;
    setFired(true);
  }, [inView, fired]);

  const exp        = EXPERIENCES[PEAKS[selectedPeak].expIdx];
  const otherPeaks = [0, 1, 2, 3, 4].filter((i) => i !== selectedPeak);
  const isCurrent  = exp.date.includes("Present");

  const nearestPeak = useCallback((clientX: number) => {
    if (!svgRef.current) return 0;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * VB_W;
    return PEAKS.reduce(
      (best, p, i) =>
        Math.abs(p.x - svgX) < Math.abs(PEAKS[best].x - svgX) ? i : best,
      0
    );
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = true;
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
    setSelectedPeak(nearestPeak(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    setSelectedPeak(nearestPeak(e.clientX));
  };
  const onPointerUp = () => { dragging.current = false; };

  // Stagger for initial detail fade — waits for line + dots
  const detailDelay = reduced ? 0 : 2.2;

  return (
    <section
      ref={sectionRef}
      className="px-8 pt-32 pb-20 max-w-7xl mx-auto"
      id="experience"
    >
      {/* ── Elevation profile ────────────────────────────────────── */}
      <motion.div
        className="mb-14 select-none"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={inView || fired ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full overflow-visible touch-none"
          style={{ cursor: "crosshair" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          aria-label="Career timeline drawn on the Mount Eva Ski Tour elevation profile"
          role="img"
        >
          <defs>
            {/* Clip to ascent portion (left of summit) */}
            <clipPath id="ascentClip">
              <rect x="0" y="0" width={SUMMIT_X} height={VB_H} />
            </clipPath>

            {/* Clip to descent portion (right of summit) */}
            <clipPath id="descentClip">
              <rect x={SUMMIT_X} y="0" width={VB_W - SUMMIT_X} height={VB_H} />
            </clipPath>

            {/* Sweeping window gradients — soft leading & trailing edges */}
            <linearGradient id="flashMaskGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="white" stopOpacity="0" />
              <stop offset="30%"  stopColor="white" stopOpacity="1" />
              <stop offset="70%"  stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="glowMaskGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="white" stopOpacity="0" />
              <stop offset="28%"  stopColor="white" stopOpacity="1" />
              <stop offset="72%"  stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* Soft boundary fade — replaces hard clipPath for blurred layers.
                Fades to 0 at x=0 and x=SUMMIT_X so blur never bleeds into a
                hard clip edge. */}
            <linearGradient id="boundaryFadeGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
              <stop offset="0%"                                                    stopColor="white" stopOpacity="0" />
              <stop offset={`${(24 / VB_W * 100).toFixed(2)}%`}                   stopColor="white" stopOpacity="1" />
              <stop offset={`${((SUMMIT_X - 24) / VB_W * 100).toFixed(2)}%`}      stopColor="white" stopOpacity="1" />
              <stop offset={`${(SUMMIT_X / VB_W * 100).toFixed(2)}%`}             stopColor="white" stopOpacity="0" />
              <stop offset="100%"                                                  stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="boundaryFadeMask">
              <rect x="-10" y="-20" width={VB_W + 20} height={VB_H + 40} fill="url(#boundaryFadeGrad)" />
            </mask>

            {/* Steepness gradient — one stop per data point, intensity ∝ slope */}
            <linearGradient id="steepnessGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
              {SLOPES_NORM.map((s, i) => {
                const x = indexToX(i);
                const opacity = i <= SUMMIT_IDX
                  ? (0.06 + s * 0.85).toFixed(3)
                  : "0";
                return (
                  <stop
                    key={i}
                    offset={`${((x / VB_W) * 100).toFixed(2)}%`}
                    stopColor={AMBER}
                    stopOpacity={opacity}
                  />
                );
              })}
            </linearGradient>

            {/* Animated mask windows */}
            <mask id="flashMask">
              <motion.rect
                y="-10" width={460} height={VB_H + 20}
                fill="url(#flashMaskGrad)"
                initial={{ x: -460 }}
                animate={fired && !reduced ? { x: VB_W + 100 } : undefined}
                transition={{ duration: 1.0, ease: "linear" }}
              />
            </mask>
            <mask id="glowMask">
              <motion.rect
                y="-10" width={540} height={VB_H + 20}
                fill="url(#glowMaskGrad)"
                initial={{ x: -540 }}
                animate={fired && !reduced ? { x: VB_W + 100 } : undefined}
                transition={{ duration: 1.3, ease: "linear", delay: 0.05 }}
              />
            </mask>
          </defs>

          {/* ── Fill + baseline — fade in after the line draws ── */}
          <motion.g
            initial={reduced ? false : { opacity: 0 }}
            animate={inView || fired ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
          >
            {/* ── Descent line (faint — hints at the unknown) ── */}
            <path
              d={LINE_PATH}
              fill="none"
              stroke="rgba(0,0,0,0.07)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              clipPath="url(#descentClip)"
            />
            {/* Track attribution */}
            <text
              x={VB_W - 4}
              y={BASELINE_Y + 14}
              textAnchor="end"
              fontSize="7.5"
              fill="rgba(0,0,0,0.20)"
              fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
              style={{ letterSpacing: "0.06em" }}
            >
              MOUNT EVA SKI TOUR · 3,975 M
            </text>
          </motion.g>

          {/* ── Flash + glow — boundary mask replaces hard clipPath ── */}
          {!reduced && (
            <g mask="url(#boundaryFadeMask)">
              <path
                d={LINE_PATH}
                fill="none"
                stroke="rgba(255, 210, 60, 0.95)"
                strokeWidth="6"
                strokeLinejoin="round"
                mask="url(#flashMask)"
                style={{ filter: "blur(2px)" }}
              />
              <path
                d={LINE_PATH}
                fill="none"
                stroke={AMBER}
                strokeWidth="4"
                strokeLinejoin="round"
                mask="url(#glowMask)"
                style={{ filter: "blur(1.5px)" }}
              />
            </g>
          )}

          {/* ── Ascent line (solid, draws in) ── */}
          <motion.path
            d={LINE_PATH}
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            clipPath="url(#ascentClip)"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView || fired ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "linear", delay: 0.1 }}
          />

          {/* ── Steepness overlay — color intensity follows slope ── */}
          <path
            d={LINE_PATH}
            fill="none"
            stroke="url(#steepnessGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            clipPath="url(#ascentClip)"
          />

          {/* ── Per-peak elements ── */}
          {PEAKS.map((peak, i) => {
            const isSelected = i === selectedPeak;
            const isStrava   = i === 4;
            const startYear  = EXPERIENCES[peak.expIdx].date.split("–")[0];
            const delay      = isStrava ? 1.0 : dotDelay(peak.x);
            const labelDelay = delay + 0.28;

            return (
              <g
                key={i}
                onClick={() => setSelectedPeak(i)}
                style={{ cursor: "pointer" }}
              >
                {/* Oversized hit area */}
                <circle cx={peak.x} cy={peak.y} r={22} fill="transparent" />

                {/* Dashed drop-line to baseline */}
                {isSelected && (
                  <line
                    x1={peak.x} y1={peak.y + 8}
                    x2={peak.x} y2={BASELINE_Y}
                    stroke={AMBER}
                    strokeWidth="1"
                    strokeOpacity="0.22"
                    strokeDasharray="3 4"
                  />
                )}

                {/* Outer ring */}
                {isSelected && (
                  <circle
                    cx={peak.x} cy={peak.y} r={9}
                    fill="none"
                    stroke={AMBER}
                    strokeWidth="1.5"
                    strokeOpacity="0.30"
                  />
                )}

                {/* Summit dot — clean ease-out scale, no bounce */}
                <motion.circle
                  cx={peak.x}
                  cy={peak.y}
                  r={isSelected ? 4.5 : 3}
                  fill={isSelected ? AMBER : "rgba(0,0,0,0.22)"}
                  initial={reduced ? false : { scale: 0, opacity: 0 }}
                  animate={inView || fired ? { scale: 1, opacity: 1 } : {}}
                  transition={reduced ? undefined : {
                    scale:   { duration: 0.32, delay, ease: [0.25, 0.1, 0.25, 1] },
                    opacity: { duration: 0.16, delay },
                  }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transition: "fill 0.25s ease, r 0.25s ease",
                  }}
                />

                {/* Company label — fades in after dot */}
                <motion.text
                  x={peak.x}
                  y={peak.y - 17}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight={isSelected ? "600" : "400"}
                  fill={isSelected ? AMBER : "rgba(0,0,0,0.28)"}
                  fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
                  style={{ textTransform: "uppercase", letterSpacing: "0.14em", transition: "fill 0.25s ease" }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={inView || fired ? { opacity: 1 } : {}}
                  transition={reduced ? undefined : { duration: 0.35, delay: labelDelay }}
                >
                  {peak.label}
                </motion.text>

                {/* Year below baseline — fades in with label */}
                <motion.text
                  x={peak.x}
                  y={BASELINE_Y + 14}
                  textAnchor="middle"
                  fontSize="8"
                  fill={isSelected ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,0.18)"}
                  fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
                  style={{ transition: "fill 0.25s ease" }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={inView || fired ? { opacity: 1 } : {}}
                  transition={reduced ? undefined : { duration: 0.35, delay: labelDelay }}
                >
                  {startYear}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* ── Featured detail ──────────────────────────────────────── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={inView || fired ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: detailDelay }}
      >
        <div style={{ minHeight: detailMinHeight || undefined }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            ref={detailMeasureRef}
            key={selectedPeak}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="pb-12 mb-10"
          >
            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {isCurrent && (
                <span
                  className={`inline-block px-3 py-[5px] rounded-full text-white ${LABEL_CLASS}`}
                  style={{ background: AMBER }}
                >
                  Current
                </span>
              )}
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block px-3 py-[5px] rounded-full border border-black/20 text-black/50 ${LABEL_CLASS}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Company + meta */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 md:gap-12 items-start">
              <div>
                <h3
                  className="font-bold tracking-tight"
                  style={{ fontSize: TYPE.bigStatement, lineHeight: 1.0, color: "#1A1A1A" }}
                >
                  {exp.company}
                </h3>
                <p className="mt-2 text-lg font-medium text-black/40">{exp.role}</p>
                <p className="mt-6 text-[17px] leading-[1.7] text-black/55 max-w-2xl">
                  {exp.description}
                </p>
              </div>
              <div className="md:text-right pt-1">
                <p className="text-sm font-semibold text-black/55">{exp.date}</p>
                <p className="mt-1 text-sm text-black/40">{exp.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>

        {/* ── Compact row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {otherPeaks.map((peakIdx) => {
            const other = EXPERIENCES[PEAKS[peakIdx].expIdx];
            return (
              <motion.button
                key={peakIdx}
                onClick={() => setSelectedPeak(peakIdx)}
                className="text-left px-4 py-3 rounded-xl border border-black/[0.14] bg-black/[0.02] hover:border-black/25 hover:bg-black/[0.05] transition-all duration-200 group cursor-pointer"
                whileHover={reduced ? undefined : { y: -1 }}
                transition={{ duration: 0.15 }}
              >
                <p className={`text-black/40 mb-1.5 ${LABEL_CLASS}`}>
                  {other.date.split("–")[0]}
                </p>
                <p className="text-sm font-semibold text-black/55 group-hover:text-black/75 transition-colors leading-tight">
                  {other.company}
                </p>
                <p className="text-xs text-black/25 mt-0.5 leading-tight">{other.role}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
