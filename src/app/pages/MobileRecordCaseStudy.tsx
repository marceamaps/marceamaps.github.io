import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
import recordLayers from "../../assets/mobile-record/mobile-record-layers.png";
import recordSequencing from "../../assets/mobile-record/mobile-record-sequencing.png";
import recordGestures from "../../assets/mobile-record/mobile-record-gestures.png";

const AMBER = "#E8640A";
const BLUE  = "#738CC7"; // Slate Blue from hero gradient

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

const BEFORE_SCREENS = [
  { src: oldPreRecord,          label: "Pre-record", alt: "Old pre-record screen with sport icons and a large Start button" },
  { src: oldRecordingMap,       label: "Map + stats", alt: "Old active recording view — map only, no stats overlay" },
  { src: oldRecordingFullscreen,label: "Full-screen", alt: "Old full-screen stats view during an active recording session" },
];

const AFTER_SCREENS = [
  { src: preRecord,          label: "Pre-record", alt: "Pre-record screen showing sport selection and GPS acquisition" },
  { src: recordingImg,       label: "Map + stats", alt: "Active recording view with live map and stats island overlay" },
  { src: recordingFullscreen,label: "Full-screen", alt: "Full-screen stats view during an active recording session" },
];

export default function MobileRecordCaseStudy() {
  const [view, setView] = useState<"before" | "after">("before");
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
        <section className="pt-[120px] pb-[100px]">
          <FadeUp delay={0.15}>
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
                <div key={term} className="flex gap-[6px] text-base">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* Before / After toggle */}
          <div className="mt-14">
            {/* Toggle pill */}
            <div className="flex items-center gap-1 w-fit p-1 rounded-full mb-6" style={{ background: "rgba(0,0,0,0.04)" }}>
              {(["before", "after"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="relative px-4 py-[7px] text-xs font-semibold uppercase tracking-[0.14em] rounded-full transition-colors duration-200 focus-visible:outline-none"
                  style={{ color: view === v ? "white" : "rgba(0,0,0,0.38)", zIndex: 1 }}
                >
                  {view === v && (
                    <motion.span
                      layoutId="ba-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: BLUE, zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                  {v === "before" ? "Before" : "After"}
                </button>
              ))}
            </div>

            {/* Subtitle */}
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/30 mb-6 text-center">
              {view === "before" ? "7 years untouched" : "The redesign"}
            </p>

            {/* Images only animate; labels stay static below */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex gap-4 sm:gap-6"
              >
                {(view === "before" ? BEFORE_SCREENS : AFTER_SCREENS).map(({ src, alt, label }) => (
                  <div key={label} className="flex-1 flex justify-center">
                    <img
                      src={src}
                      alt={alt}
                      style={{
                        height: "clamp(240px, 36vw, 460px)",
                        width: "auto",
                        maxWidth: "100%",
                        display: "block",
                        filter: "drop-shadow(0 10px 24px rgba(26,26,26,.12))",
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Static labels — not part of the transition */}
            <div className="flex gap-4 sm:gap-6 mt-4">
              {["Pre-record", "Map + stats", "Full-screen"].map((label) => (
                <div key={label} className="flex-1 text-center">
                  <span className="text-xs tracking-[0.12em] text-black/30 font-medium uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
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
              I'm a recording opportunist. I use a watch some days, a phone
              most days, and both when it's feeling more serious or I'm worried
              about safety. This behavior is not uncommon — based on user
              research, a lot of people opt to use their phone given it already
              has everything else on it: credit cards, passes, identification,
              and messaging capabilities. Whether you're in the backcountry or
              an urban environment, bringing your phone just makes sense.
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
              Record looks like one button.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              But don't be deceived. 40+ sport types, GPS sports vs non-GPS
              sports, permissions, live states — and a phone that gets mounted,
              pocketed, and buried in a backpack. Right hand users vs left hand
              users. Movement and designing for safety. I audited every path
              before touching anything.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Data informed that GPS sports were our immediate focus.",
                "Users switched to familiar mapping apps: our map wasn't easy to find or use.",
                "Retentive safety features were buried.",
                "Newer, younger Strava mobile recorders didn't come back a second time.",
                "The FATMAP map rendering engine needed to be integrated into the record screen.",
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

          {/* Audit image */}
          <FadeUp delay={0.08} className="mt-10">
            <img
              src={recordAudit}
              alt="Comprehensive audit map of every recording path — permissions, sport types, states, and error conditions"
              className="w-full h-auto block rounded-[14px] border border-black/[0.08]"
            />
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
              A speedy redesign with big impact.
            </p>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              We had committed to design, build, and deliver in 6 months. I
              strategized with the engineering manager and interim product
              manager to come up with focused initiatives — to unblock
              engineering and hold a cross-functional team to one direction.
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

          <FadeUp delay={0.08} className="mt-10">
            <img
              src={recordSequencing}
              alt="Initiative sequencing diagram showing the phased rollout of the Mobile Record redesign"
              className="w-full h-auto block rounded-[14px] border border-black/[0.08]"
            />
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
              Bring gestural unity between the map and the chrome on top.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Three users, one screen: some need the map, some need a
              full-screen view, some need both — without elements shifting every
              time the sport changes. After many runs spent tapping, pocketing,
              and pulling the phone back out, the unlock landed: interacting
              with the UI layers could feel exactly like interacting with the
              map. That insight is how the layers all came together.
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <img
              src={recordLayers}
              alt="Layer architecture diagram showing how the island, map, and stats screens relate"
              className="w-full h-auto block rounded-[14px] border border-black/[0.08]"
            />
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <img
              src={recordGestures}
              alt="Gesture diagram showing how map interactions map to UI layer interactions"
              className="w-full h-auto block rounded-[14px] border border-black/[0.08] mb-10"
            />
          </FadeUp>

          <FadeUp delay={0.08} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14 items-start">
              {/* Left: toggle */}
              <IslandToggle />

              {/* Right: note */}
              <div className="md:pt-0">
                <p
                  className="text-xs tracking-[0.2em] font-medium uppercase mb-4"
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
                  style={{ background: BLUE }}
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
                borderLeft: `4px solid ${BLUE}`,
                background: "rgba(115,140,199,0.07)",
              }}
            >
              <Eyebrow>
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
                "Off route alerts",
                "Instant workouts",
                "Runna workouts",
                "Elevation stats for trail users",
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

          {/* 2-up lifestyle photos — stacked vertically */}
          <div className="mt-10 flex flex-col gap-4">
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
              <p className="text-xs tracking-[0.2em] font-medium uppercase text-black/30 mb-6">
                Field notes
              </p>
              <div className="space-y-5">
                {[
                  "The controls sit on a sheet that moves — early on, we tested with different variations of controls, and the original set didn't reveal this problem in user testing. Through iteration larger buttons were selected, resulting in some users pausing by accident reaching for settings underneath. Complaints faded as people learned it either way, but the learning for me was clear: all iterations deserve to be usability tested, especially when relating to the most critical actions.",
                  "A post-launch metric dip primarily due to change aversion meant the initial release came with a lot of troubleshooting. I honed my skills in data analysis, problem solving and experimentation to keep the rollout moving forward. The biggest learning was about setting expectations early. In hindsight, such a large change on a surface where users engage in System 1 mechanics means a drop in initial metrics is expected — it's long-term retention and usability that matters, and that's what we tracked.",
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
            <Eyebrow>What I did</Eyebrow>
            <p className="text-[17px] leading-[1.66] text-black/80">
              Lead designer on the full end-to-end redesign, working with a
              design manager and a fellow designer — 0→1 design and architecture
              · stakeholder alignment to hold momentum and trust · extensive
              field testing, including IRL with runners in London (shoutout
              Kevin) · the post-release auto-pause investigation · shipped to
              100%.
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
