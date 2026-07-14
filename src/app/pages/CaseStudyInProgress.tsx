import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Eyebrow, LABEL_CLASS, TEXT, TYPE, BLUE } from "../components/caseStudyKit";

type CaseStudyInProgressProps = {
  /** Shown in the sticky nav, right side — e.g. "Heatmaps & Map Settings" */
  title: string;
  /** Accent color for the eyebrow bar — defaults to BLUE */
  accent?: string;
};

export default function CaseStudyInProgress({ title, accent = BLUE }: CaseStudyInProgressProps) {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Sticky nav ──────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-11 flex items-center justify-between px-7 border-b border-black/[0.08]"
        style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)" }}
        aria-label="Case study navigation"
      >
        <Link
          to="/"
          className={`${LABEL_CLASS} text-black/40 hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm`}
          style={{ outlineColor: accent }}
        >
          ← Marcea · Work
        </Link>
        <span className={`${LABEL_CLASS} text-black/35`}>{title}</span>
      </nav>

      {/* ── Centered message ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-7">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24, scale: 0.94 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={
              reduced
                ? undefined
                : {
                    y: [0, -10, 0],
                  }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7, // wait for the entrance to settle first
                  }
            }
          >
            <div className="flex items-center justify-center mb-6">
              <Eyebrow color={accent}>In progress</Eyebrow>
            </div>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: TYPE.h2.fontSize, lineHeight: TYPE.h2.lineHeight, color: TEXT.primary }}
            >
              This one's still being written.
            </h1>
            <p
              className="mt-4"
              style={{ fontSize: TYPE.body.fontSize, lineHeight: TYPE.body.lineHeight, color: TEXT.secondary }}
            >
              The metrics are already sourced — I just haven't finished the
              write-up yet. Check back soon.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-[42px] px-7 flex items-center justify-between">
        <span className={`${LABEL_CLASS} text-black/30`}>Strava · {title}</span>
        <Link
          to="/"
          className={`${LABEL_CLASS} text-black/35 hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm`}
          style={{ outlineColor: accent }}
        >
          Marcea — Selected Work
        </Link>
      </footer>
    </div>
  );
}
