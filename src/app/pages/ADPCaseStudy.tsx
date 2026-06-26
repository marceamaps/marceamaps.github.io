import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

// Image imports — uncomment as assets arrive in src/assets/adp/
// import adpMapView from "../../assets/adp/adp-map-view.png";
// import adpHighlights from "../../assets/adp/adp-highlights.png";
// import adpTrophyDetail from "../../assets/adp/adp-trophy-detail.png";
// import adpPermutationMatrix from "../../assets/adp/adp-permutation-matrix.png";
// import adpMidSheet from "../../assets/adp/adp-mid-sheet.png";
// import adpHighlightFocused from "../../assets/adp/adp-highlight-focused.png";
// import adpFullSubscriber from "../../assets/adp/adp-full-subscriber.png";
// import adpPolylineFocused from "../../assets/adp/adp-polyline-focused.png";

// TODO(design token): #E8640A is the brand amber from the mockup spec.
// No matching token found in theme.css. Add a --color-amber token if this
// colour is formalised in the design system.
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

// ─── Image placeholder ────────────────────────────────────────────────────────

function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-black/[0.04] border border-dashed border-black/15 rounded-[14px] flex items-center justify-center py-16">
      <p className="text-xs tracking-[0.1em] text-black/30 font-medium uppercase">
        {label}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ADPCaseStudy() {
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
          Activity Details Page
        </span>
      </nav>

      {/* ── Centered column ─────────────────────────────────────────────── */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-[76px] pb-[80px]">
          <FadeUp>
            <Eyebrow>Strava · Activity Details Page</Eyebrow>
            <h1
              className="font-bold tracking-tight mt-0"
              style={{ fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96 }}
            >
              The most-clicked thing I didn't plan to build.
            </h1>
            <p
              className="mt-5 text-black/70 leading-snug"
              style={{ fontSize: "clamp(19px,2.6vw,24px)" }}
            >
              I joined the Activity Details Page redesign halfway through
              implementation — after the lead designer had moved on, with the
              vision mostly set but the details unresolved. What I shipped
              wasn't fully his vision, and it wasn't a brief I'd written from
              scratch. It was something I had to make my own, under time
              pressure, with a team ready to move on.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {[
                { term: "Role", desc: "Senior Product Designer" },
                { term: "Surface", desc: "iOS & Android" },
                { term: "Timeline", desc: "Late 2024 → March 2025" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-[6px] text-sm">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* After label + 3-up device shots */}
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
                // src: adpMapView,
                label: "Map view",
                alt: "Activity Details Page map view with MRE-rendered route polyline",
              },
              {
                // src: adpHighlights,
                label: "Polyline highlights",
                alt: "Polyline highlights chip bar showing segments, trophies, and local legends",
              },
              {
                // src: adpTrophyDetail,
                label: "Trophy detail",
                alt: "Trophy detail sheet — tapping a polyline trophy chip frames the route to that effort",
              },
            ].map(({ label, alt }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <figure>
                  <ImgPlaceholder label={label} />
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
            <Eyebrow>Why it mattered</Eyebrow>
            <p className="text-[20px] leading-[1.66] text-black/80">
              The Activity Details Page is where every Strava activity lands
              after it's done. Not the feed — the ADP. It's where athletes
              check splits, relive the route, find out if they got a trophy. At
              Strava's scale, it's one of the most-visited surfaces on the
              platform.
            </p>
            <p className="mt-6 text-[17px] leading-[1.66] text-black/55">
              In 2024, the team had been working to rebuild it: bring in the
              Map Rendering Engine for the first time, integrate FATMAP's 3D
              terrain data, and redesign the experience from the ground up. The
              goal was a page that felt as alive as the activity it documented.
            </p>
          </FadeUp>
        </section>

        {/* ── The Situation ───────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Walking in mid-implementation</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              The vision existed. The details didn't.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Andrew Courter had set the design direction and completed the
              foundational experiments before leaving the team. I stepped in
              during active implementation. The Figma files were there, the
              direction was clear — but dev specs were incomplete, and
              leadership couldn't see how the redesign held together across the
              full permutation space: free users versus subscribers, cyclists
              versus runners, with a map or without, with media or without. The
              ADP isn't one screen. It's dozens of configurations, and the seams
              weren't visible in what existed.
            </p>
            <p className="mt-6 text-[17px] leading-[1.66] text-black/55">
              At one point the project was at real risk of being cut. ADP views
              are a primary team metric, and leadership needed confidence that
              rebuilding one of Strava's most-viewed pages wasn't going to hurt
              them. Getting the project back on track meant proving we had a
              plan — comprehensively, not conceptually.
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <figure>
              <ImgPlaceholder label="adp-permutation-matrix.png" />
              <figcaption className="mt-2 text-xs tracking-[0.05em] text-black/40 font-medium">
                Mapping every configuration — user state, content state,
                platform — is what got leadership back on board.
              </figcaption>
            </figure>
          </FadeUp>
        </section>

        {/* ── The Decision ────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The depth</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              Two calls that changed the project.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                beat: "01 — Make it legible",
                heading: "Map every permutation. Then show leadership.",
                body: "The thing that got leadership back on board wasn't a new concept — it was comprehensiveness. I mapped every configuration: user state, content state, platform. Once leadership could see exactly how the page behaved in every state, the ambiguity that had been stalling approval collapsed. Focused reviews — one area at a time — replaced the broader discussions that had been going in circles.",
              },
              {
                beat: "02 — Make it mine",
                heading: "Polyline highlights — the signature call.",
                body: "Tap a segment, a best effort, a trophy, or a local legend on the map, and the view focuses to that exact moment of your activity. Getting it right meant rethinking micro-interactions the MRE integration had reopened: how the map repositions when you drop the ADP sheet, how the polyline is framed on load, what the correct focus area is when a highlight is selected. These decisions compound — each one changes the behavior of the others.",
              },
            ].map(({ beat, heading, body }, i) => (
              <FadeUp key={beat} delay={i * 0.1}>
                <p
                  className="text-[10px] tracking-[0.2em] font-medium uppercase mb-4"
                  style={{ color: AMBER }}
                >
                  {beat}
                </p>
                <h3 className="font-bold tracking-tight text-[22px] leading-snug">
                  {heading}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.66] text-black/55">
                  {body}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.08} className="mt-10">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "adp-mid-sheet.png", caption: "Mid-height" },
                { label: "adp-highlight-focused.png", caption: "Highlight focused" },
              ].map(({ label, caption }, i) => (
                <figure key={label}>
                  <ImgPlaceholder label={label} />
                  <figcaption className="mt-2 text-[10px] tracking-[0.12em] text-black/30 font-medium uppercase text-center">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-xs tracking-[0.05em] text-black/40 font-medium">
              The map repositions differently depending on sheet height and
              which highlight is selected — details that required close
              collaboration with Myles Cook on the cartographic implementation.
            </p>
          </FadeUp>
        </section>

        {/* ── Interactive centerpiece — TODO ──────────────────────────── */}
        {/* Interaction: tap a polyline highlight chip → map frames to that   */}
        {/* segment. See adp-case-study-mockup.html for the working scaffold. */}
        <section className="py-[80px]">
          {/* TODO(interactive): build polyline highlight prototype */}
          <div
            className="rounded-[20px] border-2 border-dashed p-8"
            style={{ borderColor: AMBER, background: "rgba(232,100,10,0.02)" }}
          >
            <span
              className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase rounded-full px-3 py-1 mb-4"
              style={{ color: AMBER, background: "rgba(232,100,10,0.10)" }}
            >
              Interactive — build in Claude Code
            </span>
            <p className="text-sm text-black/40">
              Polyline highlight interaction: tap a highlight → map reframes to
              that moment.
            </p>
          </div>
        </section>

        {/* ── Outcome ─────────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>What it proved</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              The concern going in was ADP views. They went up.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              +9.22% lift in ADPs viewed after launch. Map interaction jumped
              +27% on Android and +11.8% on iOS — proof the MRE integration
              delivered on what it promised. And 12.3% of ADP viewers click a
              polyline icon, making map interactions the second most-clicked
              element on the page after media.
            </p>
          </FadeUp>

          {/* Metrics band — 3 across */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "+9.22%",
                label: "Lift in ADPs viewed — the metric leadership was protecting",
              },
              {
                num: "+27%",
                label: "Map interaction, Android (+11.8% iOS) — MRE integration validated",
              },
              {
                num: "12.3%",
                label: "Of ADP viewers click a polyline highlight — 2nd most-clicked element after media",
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

          {/* Amber callout */}
          <FadeUp delay={0.1} className="mt-10">
            <div
              className="pl-6 py-6 pr-6 rounded-r-md"
              style={{
                borderLeft: `4px solid ${AMBER}`,
                background: "rgba(232,100,10,0.04)",
              }}
            >
              <Eyebrow amber>The loop closes</Eyebrow>
              <p className="font-bold text-[20px] leading-snug">
                The thing leadership was worried about got better. The thing I
                built because I believed in it became the feature athletes
                actually use.
              </p>
            </div>
          </FadeUp>

          {/* 2-up image grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "adp-full-subscriber.png",
                alt: "Full ADP subscriber view — complete redesigned page",
              },
              {
                label: "adp-polyline-focused.png",
                alt: "Polyline highlight focused state — map framed to selected segment",
              },
            ].map(({ label, alt }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <ImgPlaceholder label={label} />
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Field Notes ─────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Honest reflection</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="rounded-[14px] border border-black/[0.12] p-7 sm:p-10">
              <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-black/30 mb-6">
                Field notes
              </p>
              <div className="space-y-5">
                {[
                  "We didn't fully execute Andrew's vision — engineering ran out of time, and product and leadership needed us to move on. We shipped what we could, and some of the original vision stayed in Figma. That's a real constraint, not a failure, but it's worth naming.",
                  "What I'd do differently: start with the permutation matrix on day one, not as a recovery move. And I'd have pushed harder for scope protection earlier — once the timeline compressed, a few things that would have made the experience more cohesive got left on the table.",
                ].map((para, i) => (
                  <p key={i} className="text-[17px] leading-[1.66] text-black/55">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Credits ─────────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Some stuff I did</Eyebrow>
            <p className="text-[17px] leading-[1.66] text-black/80">
              Stepped in mid-implementation to close design gaps and rebuild
              leadership alignment · mapped the full permutation space ·
              designed the polyline highlight interaction and micro-map
              behaviors · conducted focused design reviews by area · visual QA
              and engineering support through launch.
            </p>
            <p className="mt-4 text-[17px] leading-[1.66] text-black/40">
              Original concept and vision: <strong>Andrew Courter.</strong>{" "}
              Cartographic implementation of polyline highlights:{" "}
              <strong>Myles Cook.</strong> I built on their work, made it my
              own, and shipped it — with a team.
            </p>
          </FadeUp>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="py-[42px] flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-black/30 font-medium uppercase">
            Strava · Activity Details Page
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
