import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// ─── Color tokens ─────────────────────────────────────────────────────────────
// A small text-color scale, not ad hoc opacity values. Use these instead of
// scattering black/NN opacities across pages.
export const TEXT = {
  primary: "rgba(0,0,0,0.8)",
  secondary: "rgba(0,0,0,0.55)",
  muted: "rgba(0,0,0,0.35)",
};

// Default accent — pages may override by passing their own color into
// Eyebrow's `color` prop (or the legacy `amber`/`dark` booleans), or by using
// their own accent constant for other elements (buttons, callouts, etc). Do
// NOT force one accent color across all pages — each case study intentionally
// uses its own (ADP: #738CC7 blue; others: amber/Strava orange or blue). Only
// centralize the NEUTRAL/label/text system, not the accent.
export const DEFAULT_ACCENT = "#738CC7";
export const AMBER = "#E8640A";
export const BLUE = "#738CC7";

// ─── Type scale ───────────────────────────────────────────────────────────────
// Use these values consistently. Do not introduce new sizes outside this set
// without updating this file first.
export const TYPE = {
  label: { fontSize: 10, letterSpacing: "0.14em" }, // uppercase eyebrows, badges, figcaptions, nav, footer
  body: { fontSize: 17, lineHeight: 1.66 },
  bodyLarge: "clamp(19px,2.6vw,24px)",
  h3: 22,
  h2: { fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 },
  h1: { fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96 },
  stat: "clamp(34px,4.8vw,48px)",
  // "Big statement" heading — used by home-page sections that need a large,
  // punchy headline outside the case-study h1/h2 hierarchy (About's intro
  // line, Experience's swapping company name). Reconciled from two
  // near-identical values (clamp(30px,4.5vw,52px) and clamp(28px,5vw,52px))
  // that were serving the same visual role.
  bigStatement: "clamp(29px,4.7vw,52px)",
};

// Shared Tailwind class string for the uppercase label style — use this
// wherever a raw className is more convenient than the TYPE.label object.
export const LABEL_CLASS = "text-[10px] tracking-[0.14em] font-medium uppercase";

// ─── Shared primitives ──────────────────────────────────────────────────────

type EyebrowProps = {
  children: ReactNode;
  /** Explicit color override — takes precedence over amber/dark flags. */
  color?: string;
  /** Legacy convenience flag: renders the label in amber (#E8640A). */
  amber?: boolean;
  /** Legacy convenience flag: renders the label in the page's accent color. */
  dark?: boolean;
};

export function Eyebrow({ children, color, amber = false, dark = false }: EyebrowProps) {
  const resolvedColor =
    color ?? (amber ? AMBER : dark ? DEFAULT_ACCENT : TEXT.muted);
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        aria-hidden
        className="flex-shrink-0 w-[26px] h-[3px] rounded-sm"
        style={{ background: color ?? DEFAULT_ACCENT }}
      />
      <p
        className={`${LABEL_CLASS} leading-none`}
        style={{ color: resolvedColor }}
      >
        {children}
      </p>
    </div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-black/[0.04] border border-dashed border-black/15 rounded-[14px] flex items-center justify-center py-16">
      <p className="text-xs tracking-[0.1em] text-black/30 font-medium uppercase">
        {label}
      </p>
    </div>
  );
}
