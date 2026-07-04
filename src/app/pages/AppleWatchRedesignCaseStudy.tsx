import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import SaveFlowPrototype from "../components/SaveFlowPrototype";

import redesignAllVideo from "../../assets/apple-watch-redesign/redesign-all.mp4";
import appleFeature from "../../assets/apple-feature.png";
import editorsChoice from "../../assets/strava-editors-choice.png";
import beforeControls from "../../assets/apple-watch-redesign/Before-controls.png";
import beforeSportpicker from "../../assets/apple-watch-redesign/Before-sportpicker.png";
import beforeStats from "../../assets/apple-watch-redesign/Before-stats.png";

const AMBER = "#E8640A";
const BLUE  = "#738CC7";

// ─── Primitives ───────────────────────────────────────────────────────────────

function Eyebrow({
  children,
  amber = false,
}: {
  children: React.ReactNode;
  amber?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        aria-hidden
        className="flex-shrink-0 w-[26px] h-[3px] rounded-sm"
        style={{ background: BLUE }}
      />
      <p
        className="text-xs tracking-[0.2em] font-medium uppercase leading-none"
        style={{ color: amber ? AMBER : "rgba(0,0,0,0.35)" }}
      >
        {children}
      </p>
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppleWatchRedesignCaseStudy() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky nav ──────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-11 flex items-center justify-between px-7 border-b border-black/[0.08]"
        style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)" }}
        aria-label="Case study navigation"
      >
        <Link
          to="/"
          className="text-xs tracking-[0.2em] text-black/40 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
          style={{ outlineColor: AMBER }}
        >
          ← Marcea · Work
        </Link>
        <span className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase">
          Apple Watch Redesign
        </span>
      </nav>

      {/* ── Centered column ─────────────────────────────────────────────── */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-[120px] pb-[100px]">
          <FadeUp>
            <Eyebrow>Strava · Platform Redesign · watchOS</Eyebrow>
            <h1
              className="font-bold tracking-tight mt-0"
              style={{ fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96 }}
            >
              Apple Watch Redesign
            </h1>
            <p
              className="mt-5 text-black/70 leading-snug"
              style={{ fontSize: "clamp(19px,2.6vw,24px)" }}
            >
              A platform redesign that earned Apple's 2025 App Store Award,
              drove sustained growth in daily active athletes, and was featured
              across 22 global outlets with 96% positive sentiment.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {[
                { term: "Role", desc: "Design lead, 0→1" },
                { term: "Surface", desc: "watchOS" },
                { term: "Timeline", desc: "2025 · Jun–Aug" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-[6px] text-base">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* Hero video */}
          <FadeUp delay={0.1} className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-[5px] rounded-full text-white"
                style={{ background: AMBER }}
              >
                Before &amp; After
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/30">
                The redesign
              </span>
            </div>
            <div
              className="overflow-hidden rounded-[18px]"
              style={{ background: "#1A1A1A" }}
            >
              <video
                src={redesignAllVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </FadeUp>
        </section>

        {/* ── Context ─────────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Context</Eyebrow>
            <p className="text-[20px] leading-[1.66] text-black/80">
              Before 2025, Strava's Apple Watch experience was mostly dormant.
              The recording screen was unbranded, couldn't be extended, and
              the Apple partnership had gone quiet. Apple Watch was becoming
              Strava's fastest-growing upload source — and the surface deserved more.
            </p>
            <p className="mt-6 text-[17px] leading-[1.66] text-black/55">
              This wasn't a cleanup project. It was a platform investment —
              building a design system extensible enough that Maps, Live Segments,
              and whatever came next could ship without reinventing the visual
              foundation each time.
            </p>
          </FadeUp>

        </section>

        {/* ── The Problem ─────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The problem</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              An unbranded screen that couldn't grow — and athletes losing their runs.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              The old recording experience had two compounding problems: a design
              system that had no room to extend, and a save flow so unreliable
              that 75% of all Apple Watch support tickets were athletes asking
              where their run went.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No design language — unbranded, nothing reusable.",
                "75% of CS tickets: activities not syncing to Strava.",
                "8% of athletes manually syncing through settings — a terrible fallback experience.",
                "A dormant Apple partnership with no design-to-design relationship.",
                "Live Segments — a key retention feature — didn't exist on Watch.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="flex-shrink-0 font-medium text-[17px] leading-[1.66]"
                    style={{ color: AMBER }}
                  >
                    →
                  </span>
                  <span className="text-[17px] leading-[1.66] text-black/55">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <figure>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-[5px] rounded-full bg-black/[0.07] text-black/40">
                  Before
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/30">
                  pre-redesign experience
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { src: beforeSportpicker, label: "Sport picker", alt: "Old Apple Watch sport picker screen before the redesign" },
                  { src: beforeStats,       label: "Stats",        alt: "Old Apple Watch stats recording screen before the redesign" },
                  { src: beforeControls,    label: "Controls",     alt: "Old Apple Watch controls screen before the redesign" },
                ].map(({ src, label, alt }) => (
                  <figure key={label}>
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto block"
                      style={{ filter: "drop-shadow(0 10px 24px rgba(26,26,26,.12))" }}
                    />
                    <figcaption className="mt-5 text-[10px] tracking-[0.12em] text-black/30 font-medium uppercase text-center">
                      {label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </figure>
          </FadeUp>
        </section>

        {/* ── The Approach ────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The approach</Eyebrow>
            <p
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(30px,6vw,54px)", lineHeight: 1.1 }}
            >
              A new design language. A fixed save flow. Live Segments.
            </p>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              The work had three threads running in parallel — rebuilding the
              recording system, making save flow reliable, and shipping the first
              new feature under the new design language.
            </p>
          </FadeUp>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "design language",
              "recording screen rebuild",
              "save flow",
              "live segments",
              "Apple workshop validation",
              "extensible components",
              "reliability as UX",
            ].map((pill, i) => (
              <FadeUp key={pill} delay={i * 0.04}>
                <span className="inline-block px-3 py-[6px] rounded-full border border-black/20 text-[11px] font-medium uppercase tracking-[0.1em] text-black/60">
                  {pill}
                </span>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.05} className="mt-10">
            <Link
              to="/case-study/live-segments"
              className="group flex items-center justify-between gap-4 rounded-[14px] px-6 py-5 no-underline transition-colors duration-200"
              style={{
                border: `1.5px solid ${BLUE}`,
                background: "rgba(115,140,199,0.05)",
                outlineColor: BLUE,
              }}
            >
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1.5"
                  style={{ color: BLUE }}
                >
                  First feature built on this system
                </p>
                <p className="text-[18px] font-bold text-black/80 leading-snug">
                  Live Segments case study
                </p>
              </div>
              <span
                className="text-2xl font-light text-black/25 group-hover:text-black/50 transition-colors duration-200 flex-shrink-0"
                aria-hidden
              >
                →
              </span>
            </Link>
          </FadeUp>
        </section>

        {/* ── The Decision ────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The decision</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              Design for the split second an athlete looks down.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Every watchOS design decision had to work in a glance — no
              keyboard, a 1.9" screen, hands occupied, often mid-effort. The
              new design language was built as reusable components so future
              Watch features could ship without reinventing the visual system
              each time.
            </p>
            <p className="mt-4 text-[17px] leading-[1.66] text-black/55">
              Reliability was treated as a UX problem, not just an engineering
              one. The branded save animation, persistent failure instructions,
              and automatic re-sync on reconnect were design decisions — not
              side effects of engineering work. That reframe is what drove the
              support ticket reduction.
            </p>
          </FadeUp>

          {/* ── Save flow interactive centerpiece ──────────────────────────── */}
          {/* Shows: recording → saving → synced, plus failure/re-sync state.   */}
          {/* The story: 75% of CS tickets were about this moment. This is the  */}
          {/* design that fixed them.                                            */}
          <FadeUp delay={0.1} className="mt-12">
            <div
              className="rounded-[20px] border-2 border-dashed p-8"
              style={{ borderColor: BLUE, background: "rgba(115,140,199,0.03)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase rounded-full px-3 py-1"
                  style={{ color: BLUE, background: "rgba(115,140,199,0.10)" }}
                >
                  Interactive — save flow states
                </span>
              </div>
              <p className="text-sm text-black/40 mb-8 max-w-sm">
                Tap Save to see the flow: saving animation → confirmation.
                The design that ended 75% of Apple Watch support tickets.
                After saving, reveal the failure state that previously had no design.
              </p>
              <SaveFlowPrototype />
            </div>
          </FadeUp>
        </section>

        {/* ── Outcome ─────────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Outcome</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              Apple's 2025 App Store Award.
            </h2>
          </FadeUp>

          {/* Top metrics — 3 up */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "+19%",
                label: "YoY growth in Apple Watch athletes",
              },
              {
                // TODO(marcea): +90K is an absolute count derived from
                // "Sustained +10% lift in daily users after comms (+90K daily
                // users)". Consider expressing as the underlying % (+10%)
                // instead of the absolute for public-facing portfolio copy.
                num: "+90K",
                label: "Sustained lift in daily users after launch comms",
              },
              {
                num: "-55%",
                label: "CS tickets — vs. a goal of -15%. Beat it by 3.7×",
              },
            ].map(({ num, label }, i) => (
              <FadeUp key={num} delay={i * 0.1}>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(34px,4.8vw,48px)",
                    lineHeight: 1,
                    color: "#1A1A1A",
                  }}
                >
                  {num}
                </p>
                <div
                  aria-hidden
                  className="mt-3 mb-3 w-[26px] h-[3px] rounded-sm"
                  style={{ background: BLUE }}
                />
                <p className="text-sm leading-snug text-black/55">{label}</p>
              </FadeUp>
            ))}
          </div>

          {/* Save flow callout */}
          <FadeUp delay={0.1} className="mt-10">
            <div
              className="pl-6 py-6 pr-6 rounded-r-md"
              style={{
                borderLeft: `4px solid ${BLUE}`,
                background: "rgba(115,140,199,0.07)",
              }}
            >
              <Eyebrow amber>Save flow — fixing the most painful moment</Eyebrow>
              <p className="font-bold text-[20px] leading-snug">
                75% of all Apple Watch support tickets were about activities
                not syncing. Treating the save flow as a design problem —
                not just an engineering one — is what drove the result.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  {
                    num: "94%→95%",
                    label: "Save to upload success rate after save flow shipped",
                  },
                  {
                    num: "8%→2%",
                    label: "Athletes manually syncing via settings — down sharply",
                  },
                  {
                    num: "0.0025%",
                    label: "% of AW athletes with CM tickets — the lowest ever recorded",
                  },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-baseline gap-3">
                    <span
                      className="font-bold flex-shrink-0"
                      style={{
                        fontSize: "clamp(22px,2.8vw,28px)",
                        color: BLUE,
                        lineHeight: 1,
                      }}
                    >
                      {num}
                    </span>
                    <span className="text-sm text-black/55">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Live Segments callout */}
          <FadeUp delay={0.05} className="mt-10">
            <div
              className="pl-6 py-6 pr-6 rounded-r-md"
              style={{
                borderLeft: `4px solid rgba(0,0,0,0.12)`,
                background: "rgba(0,0,0,0.02)",
              }}
            >
              <Eyebrow>Live Segments — the first feature built on the new system</Eyebrow>
              <p className="text-[17px] leading-[1.66] text-black/55">
                95K athletes started a Live Segment since launch — 18% of all
                Apple Watch run/ride starts, with a 76% completion rate.
                Athletes who complete a live segment have +1.8% higher current
                user retention and +4% higher time-to-second-record.
              </p>
              <p className="mt-4 text-[17px] leading-[1.66] text-black/55">
                47% of athletes starting a run or ride will encounter a Live
                Segment (rides: 53%, runs: 41%). The system the redesign
                established is already compounding.
              </p>
            </div>
          </FadeUp>

          {/* Press */}
          <FadeUp delay={0.05} className="mt-10">
            <div className="flex flex-col gap-4">
              {[
                { src: appleFeature,   alt: "Strava featured on Apple's App Store — Apple Watch Redesign" },
                { src: editorsChoice,  alt: "Strava's 2025 App Store Award recognition" },
              ].map(({ src, alt }) => (
                <div key={alt} className="overflow-hidden rounded-[14px]">
                  <img src={src} alt={alt} className="w-full h-auto block" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs tracking-[0.05em] text-black/40 font-medium">
              Apple spotlighted the redesign across 5 surfaces — .com, newsroom,
              and more. Coverage across 22 outlets, 96% positive/neutral sentiment.
            </p>
          </FadeUp>
        </section>

        {/* ── What I'd Change ─────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>What I'd change</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="rounded-[14px] border border-black/[0.12] p-7 sm:p-10">
              <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-black/30 mb-6">
                Field notes
              </p>
              <div className="space-y-5">
                {[
                  "The Apple Watch work ran in parallel with Mobile Record — two of Strava's highest-visibility projects at the same time. I managed the context-switch, but the competing priorities compressed the feedback loops. More structured handoff time between the two would've helped both.",
                  "The save flow earned a lot of the headline metrics. Looking back, I'd have pushed for earlier engineering alignment on the reliability problem — we found the framing late. Treating reliability as a UX problem from day one would have been faster.",
                  "The redesign unlocked a design-to-design relationship with Apple that didn't exist before. I'm proud of that — but it also means there's now a higher bar for everything that follows on Watch. That's a good problem to have.",
                  "I built this with one staff engineer to whom I owe a lot.",
                ].map((para, i) => (
                  <p key={i} className="text-[17px] leading-[1.66] text-black/55">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Some stuff I did ────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Some stuff I did</Eyebrow>
            <p className="text-[17px] leading-[1.66] text-black/80">
              0→1 design system for watchOS · Apple workshop preparation and
              facilitation · reliability reframe for the save flow · Live
              Segments design end-to-end · concurrent execution with Mobile
              Record · shipped to 100%.
            </p>
            <p className="mt-4 text-[17px] leading-[1.66] text-black/40">
              I built this with a team — and the Apple partnership that came
              out of it belongs to everyone who worked on it.
            </p>
          </FadeUp>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="py-[42px] flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-black/30 font-medium uppercase">
            Strava · Apple Watch Redesign
          </span>
          <Link
            to="/"
            className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
            style={{ outlineColor: AMBER }}
          >
            Marcea — Selected Work
          </Link>
        </footer>

      </div>
    </div>
  );
}
