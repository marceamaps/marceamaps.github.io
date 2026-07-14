import { Link } from "react-router-dom";
import { Eyebrow, FadeUp, ImgPlaceholder } from "../components/caseStudyKit";

// Image imports — uncomment as assets arrive in src/assets/adp/
import adpMediaView from "../../assets/adp/adp-media.png";
import adpHighlights from "../../assets/adp/adp-default.png";
import adpMap from "../../assets/adp/adp-map.png";
import adpPermutationMatrix from "../../assets/adp/adp-permutations-matrix.png";
import adpLoading from "../../assets/adp/adp-loading.png";
import adpNonGps from "../../assets/adp/adp-non-gps.png";
import polyHighlightsVideo from "../../assets/adp/poly-highlights.mp4";
import adpNonGpsNoMedia from "../../assets/adp/adp-non-gps-non-media.png";
import oldMap from "../../assets/adp/old-map.PNG";
import oldMedia from "../../assets/adp/old-adp-media.PNG";
import oldFullPage from "../../assets/adp/old-default.PNG";
// import adpMidSheet from "../../assets/adp/adp-mid-sheet.png";
// import adpHighlightFocused from "../../assets/adp/adp-highlight-focused.png";
// import adpFullSubscriber from "../../assets/adp/adp-full-subscriber.png";
// import adpPolylineFocused from "../../assets/adp/adp-polyline-focused.png";

const BLUE = "#738CC7";

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
          className="text-[10px] tracking-[0.14em] text-black/40 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
          style={{ outlineColor: BLUE }}
        >
          ← Marcea · Work
        </Link>
        <span className="text-[10px] tracking-[0.14em] text-black/35 font-medium uppercase">
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
              className="text-[10px] font-medium uppercase tracking-[0.14em] px-3 py-[5px] rounded-full text-white"
              style={{ background: BLUE }}
            >
              After
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/30">
              The redesign
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                src: adpHighlights,
                label: "Default ADP View",
                alt: "Polyline highlights chip bar showing segments, trophies, and local legends",
              },
              {
                src: adpMediaView,
                label: "Media view",
                alt: "Activity Details Page media view with photo carousel",
              },
              {
                src: adpMap,
                label: "Map view",
                alt: "Activity Details Page map view — MRE-powered, polyline highlight chips visible",
              },
            ].map(({ src, label, alt }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <figure>
                  {src ? (
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto block rounded-[14px]"
                      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                    />
                  ) : (
                    <ImgPlaceholder label={label} />
                  )}
                  <figcaption className="mt-5 text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase text-center">
                    {label}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>

          {/* Before label + 3-up device shots — pre-redesign experience */}
          <div className="mt-14 flex items-center gap-3 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] px-3 py-[5px] rounded-full bg-black/[0.07] text-black/40">
              Before
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/30">
              pre-redesign experience
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                src: oldFullPage,
                label: "Full activity page",
                alt: "Old Activity Details Page full view — map and stats, old app navigation visible",
              },
              {
                src: oldMedia,
                label: "Media view",
                alt: "Old Activity Details Page media view — small map thumbnail plus photo carousel",
              },
              {
                src: oldMap,
                label: "Map view",
                alt: "Old Activity Details Page map view — Mapbox-branded, Save Route action",
              },
            ].map(({ src, label, alt }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <figure>
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto block rounded-[14px] opacity-90"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                  />
                  <figcaption className="mt-5 text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase text-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <figure>
                <img
                  src={adpNonGps}
                  alt="Non-GPS Activity Details Page — no map, no polyline, workout stats and heart rate only"
                  className="w-full h-auto block rounded-[14px]"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                />
                <figcaption className="mt-5 text-xs tracking-[0.05em] text-black/40 font-medium">
                  One permutation made concrete: a non-GPS activity has no map
                  and no polyline at all — a completely different configuration
                  from the GPS-with-map case above, before even factoring in
                  media and subscriber state.
                </figcaption>
              </figure>
              <figure>
                <img
                  src={adpNonGpsNoMedia}
                  alt="ADP non-GPS, no-media variant — no map, no photo carousel, only workout stats"
                  className="w-full h-auto block rounded-[14px]"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                />
                <figcaption className="mt-5 text-xs tracking-[0.05em] text-black/40 font-medium">
                  A variant of the screen to the left — strip the map and media
                  and the system flexes to it. The ADP is one design that can
                  hold all of its permutations.
                </figcaption>
              </figure>
            </div>
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
                beat: "01 — Make it load",
                heading: "The map was new. The variability wasn't optional.",
                body: "Integrating the MRE — FATMAP's map rendering engine — into the ADP for the first time introduced a coordination problem we couldn't engineer away: the map, GraphQL, and other data structures resolved at different speeds, and the sequence was outside our control. The design answer was a loading state that made that variability invisible. A composed skeleton that athletes see from frame one, while the map, stats, and media resolve underneath. You don't experience loading. You experience the page arriving.",
              },
              {
                beat: "02 — Make it make sense",
                heading: "ADP Permutations: As diverse as our athlete stats.",
                body: "Activities with GPS, with maps hidden, with media, with videos, without media, non-GPS — you name it, we had to support it all. In order to ensure stakeholders were confident in our direction, I had to fully flesh out the permutations of the ADP, along with the above-the-fold states and below-the-fold states, across 44+ sport types.",
              },
            ].map(({ beat, heading, body }, i) => (
              <FadeUp key={beat} delay={i * 0.1}>
                <p
                  className="text-[10px] tracking-[0.14em] font-medium uppercase mb-4"
                  style={{ color: BLUE }}
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
              <figure>
                <img
                  src={adpLoading}
                  alt="ADP loading state — composed skeleton while MRE and GraphQL resolve"
                  className="w-full h-auto block rounded-[14px]"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                />
                <figcaption className="mt-5 text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase text-center">
                  Loading state
                </figcaption>
              </figure>
              <figure className="flex flex-col">
                <img
                  src={adpPermutationMatrix}
                  alt="ADP permutation matrix — every configuration mapped: user state, content state, platform"
                  className="w-full h-auto block rounded-[14px]"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                />
                <figcaption className="mt-auto pt-5 text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase text-center">
                  Permutation matrix
                </figcaption>
              </figure>
            </div>
          </FadeUp>
        </section>

        {/* ── Polyline Highlights ─────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The signature feature</Eyebrow>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(27px,4.2vw,37px)", lineHeight: 1.15 }}
            >
              Tap a moment. The map goes there.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-black/55">
              Polyline highlights give every notable moment on a route a
              physical address on the map. Each chip in the scrollable bar —
              a segment PR, a best effort, a trophy, a local legend — is a
              tappable anchor. Select one and the map reframes to that exact
              stretch, pulling your route into focus at the moment it
              mattered. It turns the ADP from a summary into a replay: a
              direct line between the stats athletes care about and the ground
              where they earned them.
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-10">
            <video
              src={polyHighlightsVideo}
              autoPlay
              muted
              loop
              playsInline
              className="block rounded-[14px] mx-auto w-auto"
              style={{ maxHeight: "80vh", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
            />
          </FadeUp>
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
                  style={{ background: BLUE }}
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
                borderLeft: `4px solid ${BLUE}`,
                background: "rgba(115,140,199,0.04)",
              }}
            >
              <Eyebrow color={BLUE}>The loop closes</Eyebrow>
              <p className="font-bold text-[20px] leading-snug">
                The thing leadership was worried about got better. The thing I
                built because I believed in it became the feature athletes
                actually use.
              </p>
            </div>
          </FadeUp>

        </section>

        {/* ── Field Notes ─────────────────────────────────────────────── */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Honest reflection</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="rounded-[14px] border border-black/[0.12] p-7 sm:p-10">
              <p className="text-[10px] tracking-[0.14em] font-medium uppercase text-black/30 mb-6">
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
          <span className="text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase">
            Strava · Activity Details Page
          </span>
          <Link
            to="/"
            className="text-[10px] tracking-[0.14em] text-black/35 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
            style={{ outlineColor: BLUE }}
          >
            Marcea — Selected Work
          </Link>
        </footer>

      </div>
    </div>
  );
}
