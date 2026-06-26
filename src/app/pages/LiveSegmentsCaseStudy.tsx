import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import LiveSegmentsPrototype from "../components/LiveSegmentsPrototype";

const STRAVA = "#FC5200";

// ─── Primitives (same pattern as MobileRecordCaseStudy) ───────────────────

function Eyebrow({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div aria-hidden className="flex-shrink-0 w-[26px] h-[3px] rounded-sm" style={{ background: STRAVA }} />
      <p className="text-xs tracking-[0.2em] font-medium uppercase leading-none"
        style={{ color: accent ? STRAVA : "rgba(0,0,0,0.35)" }}>
        {children}
      </p>
    </div>
  );
}

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
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
    >{children}</motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function LiveSegmentsCaseStudy() {
  return (
    <div className="min-h-screen bg-white">

      {/* Sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-11 flex items-center justify-between px-7 border-b border-black/[0.08]"
        style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)" }}
        aria-label="Case study navigation"
      >
        <Link
          to="/"
          className="text-xs tracking-[0.2em] text-black/40 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
          style={{ outlineColor: STRAVA }}
        >← Marcea · Work</Link>
        <span className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase">
          Live Segments
        </span>
      </nav>

      {/* Centred column */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* Hero */}
        <section className="pt-[76px] pb-[42px]">
          <FadeUp>
            <Eyebrow>Strava · Apple Watch · Live Segments</Eyebrow>
            <h1
              className="font-bold tracking-tight mt-0"
              style={{ fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96 }}
            >
              Live Segments
            </h1>
            <p
              className="mt-5 text-black/70 leading-snug"
              style={{ fontSize: "clamp(19px,2.6vw,24px)" }}
            >
              Turning a post-workout metric into a pre-effort ritual — a wrist-first approach to segment racing.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {[
                { term: "Role", desc: "Design lead" },
                { term: "Surface", desc: "Apple Watch (46mm)" },
                { term: "Status", desc: "Shipped" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-[6px] text-sm">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </section>

        <hr className="border-0 border-t border-black/[0.12]" />

        {/* Context */}
        <section className="py-[42px]">
          <FadeUp>
            <Eyebrow>Context</Eyebrow>
            <p className="text-[20px] leading-[1.66] text-black/80">
              Strava Segments are invisible racecourses laid over every road and trail. Before Live Segments, you only knew you'd PR'd after you uploaded. Live Segments flipped that — alerting you the moment a segment is ahead, counting you down, and switching into race mode the instant you cross the start line.
            </p>
            <p className="mt-6 text-[17px] leading-[1.66] text-black/55">
              The Watch was the right surface. It's on your wrist while you run, it has GPS, and it lets your phone stay in your pocket. The challenge wasn't the race itself — it was the 30–90 seconds before it.
            </p>
          </FadeUp>
        </section>

        <hr className="border-0 border-t border-black/[0.12]" />

        {/* The problem */}
        <section className="py-[42px]">
          <FadeUp>
            <Eyebrow>The problem</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              The approaching state is a micro-experience designed to be almost invisible.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              You're already in motion. You shouldn't be staring at your wrist. The screen needs to communicate proximity without demanding precision reading, prime you for a competitive effort without breaking your rhythm, and handle the messy reality of GPS — what if you turn around? What if you drift off-route?
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Distance as a number demands attention — ambient signals don't.",
                "The PR target has to surface before the effort starts, not during.",
                "Moving away from a segment mid-run is a real edge case, not an exception.",
                "The GO! moment is a transition — needs to feel earned, not clinical.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[0.55em] flex-shrink-0 w-[6px] h-[6px] rounded-full" style={{ background: STRAVA }} />
                  <span className="text-[17px] leading-[1.66] text-black/55">{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </section>
      </div>

      {/* ── Prototype section (full-width dark) ─────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-[880px] mx-auto px-7">
          <FadeUp>
            <div className="mb-3 flex items-center gap-3">
              <div aria-hidden className="flex-shrink-0 w-[26px] h-[3px] rounded-sm" style={{ background: STRAVA }} />
              <p className="text-xs tracking-[0.2em] font-medium uppercase leading-none" style={{ color: "rgba(255,255,255,0.35)" }}>
                Prototype · Approaching state
              </p>
            </div>
            <h2
              className="font-bold tracking-tight mb-3"
              style={{ fontSize: "clamp(24px,3.8vw,34px)", lineHeight: 1.2, color: "white" }}
            >
              The approaching experience
            </h2>
            <p className="text-[15px] leading-[1.66] mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
              The horseshoe is pre-filled and unwinds counter-clockwise as you close the distance.
              Hit "Simulate moving away" to see the edge-case behavior.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <LiveSegmentsPrototype />
          </FadeUp>
        </div>
      </section>

      {/* Back to centred column */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* Design decisions */}
        <section className="py-[42px]">
          <FadeUp>
            <Eyebrow>Design decisions</Eyebrow>
          </FadeUp>

          <div className="space-y-10 mt-2">
            {[
              {
                num: "01",
                title: "Horseshoe as proximity signal",
                body: "A large arc that fills the screen communicates distance without a number. At a glance you know roughly how far — full ring means you're a mile out, half-ring means you're close. The exact number is secondary and sits inside the arc for those who want precision.",
              },
              {
                num: "02",
                title: "PR target before the effort",
                body: "The PR badge sits in the top-left nav position — visible the moment the approaching screen appears. It frames the segment as a competition before you cross the start. If no PR exists yet, the badge is removed entirely. No empty state, no explanation.",
              },
              {
                num: "03",
                title: "Counter-clockwise unwind",
                body: "The horseshoe drains from the right tail, moving counter-clockwise toward the left. This mirrors the visual convention of a countdown — the ring empties as you get closer, so the moment it hits zero feels like a release, not an arrival.",
              },
              {
                num: "04",
                title: "Moving away: pause, don't dismiss",
                body: "If GPS detects you've turned around or drifted off-route, the countdown freezes and the horseshoe pulses. The screen reads 'Moving away from [Segment]' — acknowledging reality without killing the context. Once you're confirmed away, the UI returns to its empty state.",
              },
            ].map(({ num, title, body }, i) => (
              <FadeUp key={num} delay={i * 0.06}>
                <div className="grid grid-cols-[52px_1fr] gap-6">
                  <span
                    className="font-bold leading-none pt-1"
                    style={{ fontSize: "clamp(14px,1.8vw,17px)", color: STRAVA }}
                  >{num}</span>
                  <div>
                    <h3 className="font-bold text-[18px] leading-snug mb-2">{title}</h3>
                    <p className="text-[17px] leading-[1.66] text-black/55">{body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <hr className="border-0 border-t border-black/[0.12]" />

        {/* The GO! moment */}
        <section className="py-[42px]">
          <FadeUp>
            <Eyebrow>The transition</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              When the horseshoe hits zero, everything changes.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              "GO!" appears at the segment start — a single word, large, in Strava orange. At the same moment, the user's avatar appears on the horseshoe: a brief "buffer" state where GPS has placed you on the segment but the system doesn't yet have full confidence to switch into the live race experience. The copy shifts to "Starting [Segment Name]."
            </p>
            <p className="mt-4 text-[17px] leading-[1.66] text-black/55">
              This buffer is important. GPS isn't instant. The design holds a moment of transition rather than snapping abruptly — acknowledging that location confidence builds over the first few seconds of a segment.
            </p>
          </FadeUp>
        </section>

        <hr className="border-0 border-t border-black/[0.12]" />

        {/* What I'd change */}
        <section className="py-[42px]">
          <FadeUp>
            <Eyebrow>What I'd push further</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="rounded-[14px] border border-black/[0.12] p-7 sm:p-10">
              <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-black/30 mb-6">Field notes</p>
              <div className="space-y-5">
                {[
                  "The distance granularity question: the design shows 0.45 mi. Can we show feet or meters when under 0.1 mi? The last 500 feet before a segment start feel very different to the mile before it — the countdown should reflect that.",
                  "Haptic choreography: the Watch has a taptic engine. A gentle pulse as the horseshoe crosses key thresholds (0.5 mi, 0.1 mi, GO!) would make the ambient signal physical — no glance required.",
                  "The moving-away state currently times out after a fixed duration. A smarter version would watch heading and pace before deciding to dismiss — an athlete doing a U-turn to hit a segment correctly shouldn't see the same treatment as someone who genuinely left the area.",
                ].map((para, i) => (
                  <p key={i} className="text-[17px] leading-[1.66] text-black/55">{para}</p>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        <hr className="border-0 border-t border-black/[0.12]" />

        {/* Footer */}
        <footer className="py-[42px] flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-black/30 font-medium uppercase">
            Strava · Live Segments
          </span>
          <Link
            to="/"
            className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
            style={{ outlineColor: STRAVA }}
          >Marcea — Selected Work</Link>
        </footer>

      </div>
    </div>
  );
}
