import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import IslandToggle from "../components/IslandToggle";

import preRecord from "../../assets/mobile-record/pre-record.png";
import recordingImg from "../../assets/mobile-record/recording.png";
import recordingFullscreen from "../../assets/mobile-record/recording-fullscreen.png";
import recordAudit from "../../assets/mobile-record/record-audit.png";
import oldPreRecord from "../../assets/mobile-record/old-pre-record.png";
import oldRecordingMap from "../../assets/mobile-record/old-recording-map.png";
import oldRecordingFullscreen from "../../assets/mobile-record/old-recording-fullscreen.png";
import recordImage from "../../assets/mobile-record/record-image.png";
import recordImage2 from "../../assets/mobile-record/record-image-2.png";

// TODO(design token): #E8640A is the brand amber from the mockup spec.
// No matching token found in theme.css. Add a --color-amber token if this
// color is formalised in the design system.
const AMBER = "#E8640A";

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
        style={{ background: AMBER }}
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

export default function MobileRecordCaseStudy() {
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
          Mobile Record
        </span>
      </nav>

      {/* ── Centered column ─────────────────────────────────────────────── */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-[76px] pb-[80px]">
          <FadeUp>
            <Eyebrow>Strava · 0→1 · Mobile Record</Eyebrow>
            <h1
              className="font-bold tracking-tight mt-0"
              style={{ fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96 }}
            >
              Mobile Record
            </h1>
            <p
              className="mt-5 text-black/70 leading-snug"
              style={{ fontSize: "clamp(19px,2.6vw,24px)" }}
            >
              Rebuilding Strava's seven-year-old recording screen into a system
              the whole team now builds on.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {[
                { term: "Role", desc: "Design lead, 0→1" },
                { term: "Surface", desc: "iOS & Android" },
                { term: "Timeline", desc: "~6 months to 100%" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-[6px] text-sm">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* 3-up device shots */}
          <div className="mt-12 flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-[5px] rounded-full text-white"
              style={{ background: AMBER }}
            >
              After
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/30">
              The redesign
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                src: preRecord,
                label: "Pre-record",
                alt: "Pre-record screen showing sport selection and GPS acquisition",
              },
              {
                src: recordingImg,
                label: "Map + stats",
                alt: "Active recording view with live map and stats island overlay",
              },
              {
                src: recordingFullscreen,
                label: "Full-screen",
                alt: "Full-screen stats view during an active recording session",
              },
            ].map(({ src, label, alt }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <figure>
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto block"
                    style={{
                      filter: "drop-shadow(0 10px 24px rgba(26,26,26,.12))",
                    }}
                  />
                  <figcaption className="mt-2 text-[10px] tracking-[0.12em] text-black/30 font-medium uppercase text-center">
                    {label}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Context ─────────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Context</Eyebrow>
            <p className="text-[20px] leading-[1.66] text-black/80">
              Most people who record a workout already carry the only device
              they need — a phone. Strava's recording experience lived there,
              untouched for nearly seven years. New users came to record for
              the first time, then didn't come back.
            </p>
            <p className="mt-6 text-[17px] leading-[1.66] text-black/55">
              I'm a recording opportunist — watch some days, phone most days,
              both when it's sketchy. This was the brief I'd been waiting for.
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
              Record looks like one button. Underneath, it's anything but.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Forty-plus sport types, GPS and non-GPS, permissions, live states
              — and a phone that gets mounted, pocketed, and buried in a
              backpack. I audited every path before redesigning a pixel.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "GPS is the focus — nearly every mobile recording uses it.",
                "Users bailed to Google Maps; ours wasn't usable.",
                "Retentive safety features were buried.",
                "Most people didn't come back.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.55em] flex-shrink-0 w-[6px] h-[6px] rounded-full"
                    style={{ background: AMBER }}
                  />
                  <span className="text-[17px] leading-[1.66] text-black/55">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Audit + before bands */}
          <FadeUp delay={0.08} className="mt-10 space-y-5">
            <figure>
              <img
                src={recordAudit}
                alt="Comprehensive audit map of every recording path — permissions, sport types, states, and error conditions"
                className="w-full h-auto block rounded-[14px] border border-black/[0.08]"
              />
              <figcaption className="mt-2 text-xs tracking-[0.05em] text-black/40 font-medium">
                I mapped every path — permissions, sports, states, errors —
                before redesigning a pixel.
              </figcaption>
            </figure>
            <figure>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-[5px] rounded-full bg-black/[0.07] text-black/40">
                  Before
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/30">
                  ~7 years untouched
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    src: oldPreRecord,
                    label: "Pre-record",
                    alt: "Old pre-record screen with sport icons and a large Start button",
                  },
                  {
                    src: oldRecordingMap,
                    label: "Map + stats",
                    alt: "Old active recording view — map only, no stats overlay",
                  },
                  {
                    src: oldRecordingFullscreen,
                    label: "Full-screen",
                    alt: "Old full-screen stats view during an active recording session",
                  },
                ].map(({ src, label, alt }) => (
                  <figure key={label}>
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto block"
                      style={{
                        filter: "drop-shadow(0 10px 24px rgba(26,26,26,.12))",
                      }}
                    />
                    <figcaption className="mt-2 text-[10px] tracking-[0.12em] text-black/30 font-medium uppercase text-center">
                      {label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <figcaption className="mt-3 text-xs tracking-[0.05em] text-black/40 font-medium">
                Before — the screens we inherited, untouched for ~7 years.
              </figcaption>
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
              An app in an app — in six months.
            </p>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              I split the work into focused initiatives — to unblock engineering
              and hold a cross-functional team to one direction.
            </p>
          </FadeUp>

          {/* Bordered pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "foundations",
              "pre-record",
              "map",
              "stats",
              "gestures",
              "pauses & states",
              "refinement",
              "onboarding",
              "live segments",
              "live activities",
              "finishing",
            ].map((pill, i) => (
              <FadeUp key={pill} delay={i * 0.04}>
                <span className="inline-block px-3 py-[6px] rounded-full border border-black/20 text-[11px] font-medium uppercase tracking-[0.1em] text-black/60">
                  {pill}
                </span>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── The Decision ────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The decision</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              Make the UI feel like the map.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Three users, one screen: some need the map, some need a
              full-screen view, some need both — without elements shifting every
              time the sport changes. After many runs spent tapping, pocketing,
              and pulling the phone back out, the unlock landed: interacting
              with the UI could feel exactly like interacting with the map. That
              insight is the floating island, the flyout, and the map.
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14 items-start">
              {/* Left: toggle placeholder */}
              <IslandToggle />

              {/* Right: note */}
              <div className="md:pt-6">
                <p
                  className="text-[10px] tracking-[0.2em] font-medium uppercase mb-4"
                  style={{ color: AMBER }}
                >
                  ← Try the toggle
                </p>
                <h3 className="font-bold tracking-tight text-[22px] leading-snug">
                  One architecture, every sport.
                </h3>
                <p className="mt-3 text-[17px] leading-[1.66] text-black/55">
                  Non-GPS activity? The island expands to full-screen — same
                  controls, no map. Want map and stats together? Stay put.
                  Nothing jumps around. That consistency is what aligned the
                  team.
                </p>
              </div>
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
              Success looks like a foundation.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Record shipped to 100% and it's live today.
            </p>
          </FadeUp>

          {/* Metrics band — 3 across */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "+21%",
                label:
                  "Athletes opening the map mid-activity — iOS (+12% Android, absolute)",
              },
              {
                num: "+30%",
                label:
                  "Beacon safety-sharing usage — iOS, relative (+14% Android)",
              },
              {
                num: "+15%",
                label:
                  "Repeat post-upload engagement — iOS (+8% Android)",
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
                  style={{ background: AMBER }}
                />
                <p className="text-sm leading-snug text-black/55">{label}</p>
              </FadeUp>
            ))}
          </div>

          {/* Growth callout */}
          <FadeUp delay={0.1} className="mt-10">
            <div
              className="pl-6 py-6 pr-6 rounded-r-md"
              style={{
                borderLeft: `4px solid ${AMBER}`,
                background: "rgba(232,100,10,0.04)",
              }}
            >
              <Eyebrow amber>
                The growth audience — exactly who Record was losing
              </Eyebrow>
              <p className="font-bold text-[20px] leading-snug">
                New registrations and younger athletes were the strongest
                positive drivers of conversion to record.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  {
                    num: "+2.18%",
                    label: "New registrations, Android (+1.01% iOS)",
                  },
                  {
                    num: "+1.47%",
                    label: "Athletes under 20, Android (+0.33% iOS)",
                  },
                  {
                    num: "+0.47%",
                    label: "Lower-frequency uploaders, Android",
                  },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-baseline gap-3">
                    <span
                      className="font-bold flex-shrink-0"
                      style={{
                        fontSize: "clamp(26px,3.4vw,34px)",
                        color: AMBER,
                        lineHeight: 1,
                      }}
                    >
                      {num}
                    </span>
                    <span className="text-sm text-black/55">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-black/40">
                Relative lift in conversion-to-record vs. control. Habituated,
                higher-frequency users showed mild change-aversion — expected
                when you move a UI that had sat still for seven years.
              </p>
            </div>
          </FadeUp>

          {/* Follow-up body + feature list */}
          <FadeUp delay={0.05} className="mt-10">
            <p className="text-[17px] leading-[1.66] text-black/55">
              The part I'm proudest of: the team I've since left keeps building
              on top of it.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Full-screen map view",
                "Turn-by-turn navigation",
                "Instant workouts",
                "Runna workouts",
                "Elevation stats for trail users",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex-shrink-0 w-[6px] h-[6px] rounded-full"
                    style={{ background: AMBER }}
                  />
                  <span className="text-[17px] leading-[1.66] text-black/55">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[17px] leading-[1.66] font-semibold text-black/80">
              The screen is scaling before my eyes — and I helped invent it,
              with my team.
            </p>
          </FadeUp>

          {/* 2-up lifestyle photos */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                src: recordImage,
                alt: "Strava Mobile Record in use — athlete recording a workout outdoors",
              },
              {
                src: recordImage2,
                alt: "Strava Mobile Record in use — second lifestyle shot showing the redesigned interface",
              },
            ].map(({ src, alt }, i) => (
              <FadeUp key={alt} delay={i * 0.1}>
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-auto block rounded-[14px]"
                />
              </FadeUp>
            ))}
          </div>
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
                  "The controls sit on a sheet that moves — early on, some users paused by accident reaching for the settings underneath. We're moving to a fixed bottom bar; the complaints faded as people learned it either way.",
                  "A post-launch metrics dip — change aversion plus a mishap in auto-pause — meant the initial release came with a lot of troubleshooting. That was my opening to dig deep into the data, problem-solve with the team, resolve the issues, and move the rollout forward.",
                  "That aversion wasn't evenly spread. Our most tenured, habituated users felt it hardest, while newer athletes took to the change. Next time I'd test earlier and more directly with long-time users — they have the most muscle memory to unlearn, and they're who a redesign puts most at risk.",
                  "Surfacing Beacon — our previously buried live-location safety feature — lifted its usage double digits, and exposed legacy SMS-delivery reliability issues. We traced them to the provider and handed clear next steps to the platform team, rather than paper over them.",
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
              0→1 design and architecture · stakeholder alignment to hold
              momentum and trust · extensive field testing, including IRL with
              runners in London (shoutout Kevin) · the post-release auto-pause
              investigation · shipped to 100%.
            </p>
            <p className="mt-4 text-[17px] leading-[1.66] text-black/40">
              I invented this with a team, not on my own — and saying so is
              part of telling it straight.
            </p>
          </FadeUp>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="py-[42px] flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-black/30 font-medium uppercase">
            Strava · Mobile Record
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
