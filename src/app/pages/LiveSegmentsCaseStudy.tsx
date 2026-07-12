import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import LiveSegmentsPrototype, { type LiveSegmentsPrototypeHandle } from "../components/LiveSegmentsPrototype";
import { Eyebrow, FadeUp, TYPE } from "../components/caseStudyKit";

// ── Assets ────────────────────────────────────────────────────────────────────
import finalDesignImg      from "../../assets/live-segments/live-segment-final-design.png";
import segmentsIntroImg    from "../../assets/live-segments/segments-intro.png";
import liveSegmentFinalMp4 from "../../assets/live-segments/live-segment-final.mp4";
import visualizationsImg   from "../../assets/live-segments/live-segment-visualizations.png";
import oldMobile01         from "../../assets/live-segments/live-segments-old-01.png";
import oldMobile03         from "../../assets/live-segments/live-segments-old-03.png";
import oldMobile05         from "../../assets/live-segments/live-segments-old-05.png";
import wavelightExampleImg from "../../assets/live-segments/Wavelight-example.png";
// @ts-ignore – Vite resolves spaces in asset paths correctly
import wavelightGif        from "../../assets/live-segments/Original Wavelight.gif";
import appleVisitImg       from "../../assets/live-segments/apple-visit.jpg";
// @ts-ignore
import adaptedWavelight4   from "../../assets/live-segments/Adapated Wavelight 4.mov";
// @ts-ignore
import chasingGif          from "../../assets/live-segments/Adapted Wavelight Chasing.gif";
// @ts-ignore
import avatarArcGif        from "../../assets/live-segments/Avatar Wavelight.gif";
// @ts-ignore
import outerRingGif        from "../../assets/live-segments/Outer Ring High Res GIF.gif";

const BLUE = "#738CC7";

// ── Prototype tab data ────────────────────────────────────────────────────────
type TabId = "approaching" | "competing" | "celebration";

const PROTOTYPE_TABS: { id: TabId; label: string; title: string; body: string }[] = [
  {
    id: "approaching",
    label: "Approaching",
    title: "The horseshoe drains as you close in.",
    body: "A large arc fills most of the screen — full means you're far out, nearly empty means you're at the start line. Distance lives inside the arc for those who want precision. The PR badge in the top-left frames the competition before you cross the start. No numbers competing for attention. The shape itself is the signal.",
  },
  {
    id: "competing",
    label: "Competing",
    title: "You are the arc. Color is the race.",
    body: "The arc fills at your pace — not the PR's. Green means ahead, red means behind. Your avatar rides the tip. The arrow and time delta give the margin without asking you to do math. Everything lands in one glance. The PR has no visual presence on the ring. You don't see where it is. You just see whether your color is green.",
  },
  {
    id: "celebration",
    label: "Celebration",
    title: "The moment the whole design was built to earn.",
    body: "The arc completes. The result — PR time, delta against previous best — surfaces without ceremony. Win or lose, the screen acknowledges what you just did. That's the design's job: to make the effort feel counted.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LiveSegmentsCaseStudy() {
  const protoRef   = useRef<LiveSegmentsPrototypeHandle>(null);
  const [activeTab, setActiveTab] = useState<TabId>("approaching");

  const handlePhaseChange = useCallback((phase: string) => {
    if (phase === "competing") setActiveTab("competing");
    else if (phase === "finished") setActiveTab("celebration");
    else setActiveTab("approaching");
  }, []);

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
          className="text-[10px] tracking-[0.14em] text-black/40 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
          style={{ outlineColor: BLUE }}
        >← Marcea · Work</Link>
        <span className="text-[10px] tracking-[0.14em] text-black/35 font-medium uppercase">
          Live Segments
        </span>
      </nav>

      {/* ── White column: hero + first three sections ── */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* Hero */}
        <section className="pt-[76px] pb-[80px]">
          <FadeUp>
            <Eyebrow>Strava · Live Segments · Apple Watch</Eyebrow>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(46px,8vw,84px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
            >
              Live Segments.<br />A race against yourself.
            </h1>
            <p
              className="mt-7 text-black/70 leading-snug"
              style={{ fontSize: "clamp(19px,2.6vw,24px)", maxWidth: 680, marginBottom: 48 }}
            >
              Taking a Strava classic and designing it to the native Strava apple watch app for the first time, ever.
            </p>
            <dl className="flex flex-wrap gap-x-8 gap-y-2 mb-14">
              {[
                { term: "Role",     desc: "Senior Product Designer" },
                { term: "Surface",  desc: "Apple Watch" },
                { term: "Launched", desc: "August 2025" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-[6px] text-sm">
                  <dt className="text-black/30 font-medium">{term}</dt>
                  <dd className="text-black/55 font-medium">— {desc}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{
                padding: "5px 14px",
                borderRadius: 100,
                background: BLUE,
                color: "white",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
              }}>After</span>
            </div>
            <video
              src={liveSegmentFinalMp4}
              autoPlay
              loop
              muted
              playsInline
              style={{ display: "block", width: "50%", borderRadius: 16, margin: "0 auto" }}
            />
          </FadeUp>
        </section>


        {/* Context */}
        <section className="py-[80px]">
          <FadeUp>
            <div style={{ marginBottom: 44 }}>
              <img
                src={segmentsIntroImg}
                alt="Segments intro"
                style={{ display: "block", width: "100%", borderRadius: 12 }}
              />
            </div>
            <Eyebrow>Context</Eyebrow>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(0,0,0,0.8)" }}>
              Strava segments are invisible race courses laid over roads and trails. Before Live Segments came to Apple Watch, you wouldn't know you'd PR'd a segment until after you uploaded. Live Segments changed that — alerting you the moment a segment is ahead, counting you down, and switching into race mode the instant you cross the start line, all on your wrist.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              Live Segments did exist on 3rd party bike computers and watches, and for people interested in competing, this was a primary method of engaging with them. Live Segments also existed on the mobile application, but competing with your phone out wasn't as ergonomic as using a watch, especially when you're going all out.
            </p>
          </FadeUp>
        </section>


        {/* The case for losing */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The case for losing</Eyebrow>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(0,0,0,0.8)" }}>
              Live Segments are often misunderstood — thought of as something for only the most competitive people. They are, after all, stretches of road and trail where every athlete's effort is recorded and ranked. Philosophically, they're the same thing people have been chasing since the first Fastest Known Time: a known stretch of path, and the desire to see what you're capable of on it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              I push back on the stereotype. Segments aren't just for world record holders. They're for the person who gets slightly surprised by a silver medal trophy on their daily commute. They're a marker of everywhere you've been, and an invitation to go somewhere you haven't.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              Of course, not every time you compete will you beat your PR. But there's more to learn from losing than from winning. I believe learning to lose is really, really wonderful. Every time you lose is proof you did something, just for you. Proof you got out there and did the damn thing.
            </p>
            <div style={{
              borderLeft: `4px solid ${BLUE}`,
              background: "rgba(115,140,199,0.04)",
              borderRadius: "0 12px 12px 0",
              padding: "28px 32px",
              marginTop: 44,
            }}>
              <h3 style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 700, marginBottom: 12 }}>
                Designing to align with our users' motivations — not the other way around.
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)" }}>
                Strava saw an opportunity to bring one of our most unique features to the watch as part of the greater redesign we were working on. For too long, Segments had been presented singularly. This was our chance to give it new life — and to make it more accessible and easier to compete than ever before.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
              {["Apple Watch", "Real-time racing", "Data visualization", "Motion design", "User testing", "Accessibility"].map(tag => (
                <span key={tag} style={{
                  padding: "6px 14px", borderRadius: 100,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: 10, fontWeight: 500, letterSpacing: "0.14em",
                  textTransform: "uppercase" as const, color: "rgba(0,0,0,0.55)",
                }}>{tag}</span>
              ))}
            </div>
          </FadeUp>
        </section>


        {/* The problem */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The problem</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              The metaphor was the same everywhere.<br />And it wasn't working.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 24 }}>
              Across every implementation — Garmin, Wahoo, Strava mobile — the visual metaphor was identical: linear progress where your avatar and PR move along the vertical line. Multiple numbers visible at the same time. The design didn't fit the form factor on a rounded watch screen, the vibe was like a late 90's video game.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              On a cycling computer mounted to handlebars, these problems are manageable. You have a few seconds and you can scan. On a 45mm watch screen, at pace, in a glance — none of it works. The information has to land before you have time to read anything.
            </p>
            <div style={{ marginTop: 40 }}>
              <img
                src={visualizationsImg}
                alt="Third-party segment visualization reference — Garmin and Wahoo dense data views"
                style={{ display: "block", width: "100%", borderRadius: 12 }}
              />
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 24, letterSpacing: "0.04em" }}>
                The existing visualization across platforms: linear progress bars, dense stats, multiple simultaneous numbers. Right for a handlebar computer. Insufficient for a glance.
              </p>
            </div>
          </FadeUp>
        </section>


        {/* Where it started */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Where it started</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              The mobile version had the same underlying logic.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 24 }}>
              Strava's mobile Live Segment experience was designed seven years ago, and it shows its age. It's comprehensible when you're stationary — but reading a phone screen while running at a hard effort is a different problem entirely. At max exertion, attention narrows to the essentials: breathing, footing, pace. Fine details on a screen are the first thing to go.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              Compress that to a 45mm screen, at pace, in a glance — and the linear metaphor collapses. You can't scan left to right when you have half a second and your heart rate is at 170.
            </p>
            <div style={{ marginTop: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  { src: oldMobile01, alt: "Mobile approaching state" },
                  { src: oldMobile03, alt: "Mobile linear competing — ahead" },
                  { src: oldMobile05, alt: "Mobile competing — behind" },
                ].map(({ src, alt }) => (
                  <img key={alt} src={src} alt={alt} style={{ display: "block", width: "100%", borderRadius: 40, filter: "drop-shadow(0 10px 24px rgba(26,26,26,.12))" }} />
                ))}
              </div>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 24, letterSpacing: "0.04em" }}>
                Mobile: approaching (left), competing ahead (center), competing behind (right). Linear, readable, phone-native. None of it translates to a glance.
              </p>
            </div>
          </FadeUp>
        </section>

      </div>{/* end white column 1 */}

      {/* ── Metaphors through track meets (dark) ─────────────────────────────── */}
      <section className="pb-[100px]" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[880px] mx-auto px-7" style={{ paddingTop: 64 }}>
          <FadeUp>
            <div style={{ marginBottom: 64 }}>
              <img
                src={wavelightExampleImg}
                alt="Wavelight at a track meet — a pulse of light at the inside lane marking goal pace"
                style={{ display: "block", width: "100%", borderRadius: 12 }}
              />
            </div>
            <Eyebrow dark>Metaphors through track meets</Eyebrow>
            <h2 style={{ color: "white", fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em", maxWidth: 680, marginBottom: 32 }}>
              I'm a track and field fan — thanks to my former competitive runner partner.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(255,255,255,0.8)", maxWidth: 640, marginBottom: 20 }}>
              Learning a sport which in theory is simple — people running on a track — but has rules, nuances, and modern technology that added an unexpected learning curve. One of the first things I noticed watching track and field was the light that runs alongside the track: Wavelight, built by <a href="https://www.wavelight-technologies.com/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", textDecorationColor: "rgba(255,255,255,0.3)" }}>Wavelight Technologies</a>.
            </p>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(255,255,255,0.8)", maxWidth: 640 }}>
              The moment I saw it, I understood the race in a way no split or number on a screen had given me. I didn't need to know the pace or glance at a clock. I just knew — who was ahead, by how much, was the race a slow one or a fast one? It felt less like computing and more like feeling the race, and it seemed to help the runners, too.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.50)", marginTop: 20, maxWidth: 640 }}>
              When faced with designing the Live Segment experience on the watch, that memory reframed the whole design problem for me. After a conversation with my partner, it clicked. I'd been asked to show a Live Segment on a 45mm screen. The question was: how do I give someone that same feeling — of racing, in a glance, at pace — without making them read anything at all.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── White column 2: adapting the metaphor ── */}
      <div className="max-w-[880px] mx-auto px-7">
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Adapting the metaphor</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              Metaphorical iterations to the solution
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              Early on I understood that the Wavelight solves a real problem for track and field. For athletes, it lets them chase a pace and cuts cognitive load. For spectators, it shows whether a record's about to fall, and by how much.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The Wavelight does this through position. It runs alongside the runners, tuned to a set pace, and a separate light marks the goal pace itself. Chasing the pace is visual and immediate — you're ahead of it or behind it, and you can see it at a glance without ever checking a number.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              What I borrowed wasn't the metaphor exactly — it was the solve. Athletes on the watch needed the same thing: a way to chase pace with less cognitive load. But position didn't translate. Measuring pixel distance from a PR icon was harder to read at a glance than a physical light stream next to you on the track.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The adaptation was color: using it to encode chasing progress instead of position. That solved the legibility problem but created an accessibility one — solvable with iconography and numbers layered on top.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The other adjustment was goal pace itself. On the track, it's a second Wavelight running alongside you. On the watch, a second visual element split attention — people didn't know where to look. Merging it into a single, unified element simplified the animation and delivered the actual reduction in cognitive load I was after.
            </p>
            <div style={{ marginTop: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[
                  { src: chasingGif,        label: "Detached Ghost",      kept: false, isVideo: false },
                  { src: avatarArcGif,      label: "Detached Avatar",     kept: false, isVideo: false },
                  { src: outerRingGif,      label: "Detached Wavelight",  kept: false, isVideo: false },
                  { src: adaptedWavelight4, label: "Dispersed wavelight", kept: false, isVideo: true },
                ].map(({ src, label, kept, isVideo }) => (
                  <div key={label}>
                    {isVideo ? (
                      <video src={src} autoPlay loop muted playsInline style={{ display: "block", width: "100%", borderRadius: 10 }} />
                    ) : (
                      <img src={src} alt={label} style={{ display: "block", width: "100%", borderRadius: 10 }} />
                    )}
                    <p style={{
                      marginTop: 10, fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.14em", textTransform: "uppercase" as const,
                      color: kept ? "rgba(60,200,100,0.8)" : "rgba(0,0,0,0.4)",
                      textAlign: "center" as const,
                    }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>
      </div>{/* end white column 2 */}

      {/* ── The model that didn't survive (dark) ─────────────────────────────── */}
      <section className="py-[100px]" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[880px] mx-auto px-7">
          <FadeUp>
            <Eyebrow dark>User research · Kevin La · July 2025 · 7 participants</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "stretch", marginTop: 8 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "clamp(72px,12vw,140px)", fontWeight: 700, color: "white", lineHeight: 0.9, letterSpacing: "-0.04em" }}>0</div>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.6 }}>
                  of 7 athletes chose the Ghost model — your PR pacer on the ring, your avatar tracking your own position. Two objects. One ring. The most faithful translation of the race metaphor.
                </p>
                <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontStyle: "italic" }}>"Two icons overwhelming at pace. Users glance at colour, not icons."</p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.25)", marginTop: 8, letterSpacing: "0.14em", textTransform: "uppercase" as const }}>Research finding</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "clamp(72px,12vw,140px)", fontWeight: 700, color: "white", lineHeight: 0.9, letterSpacing: "-0.04em" }}>4</div>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.6 }}>
                  of 7 chose the Attached model — one element on the ring, color as the signal, avatar at the arc tip. No PR pacer visible. No second object to track.
                </p>
                <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontStyle: "italic" }}>"Reduced areas trying to get user's attention. Easily gauge stats while glancing."</p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.25)", marginTop: 8, letterSpacing: "0.14em", textTransform: "uppercase" as const }}>Research finding</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 60, paddingTop: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                <div>
                  <div style={{ background: "#111", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <img src={wavelightGif} alt="The Wavelight — the metaphor that started it all" style={{ display: "block", width: "100%", maxHeight: 400, objectFit: "cover" }} />
                  </div>
                  <p style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textAlign: "center" }}>
                    The Ghost: two objects, one ring. Selected by 0 of 7 athletes.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 20 }}>
                  <h3 style={{ color: "white", fontSize: 22, lineHeight: 1.45, fontWeight: 600, marginBottom: 20 }}>
                    Two athletes on the same screen, racing in real time. The most honest translation of the metaphor. And the one that failed.
                  </h3>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.50)", lineHeight: 1.65 }}>
                    At running pace, nobody could answer the first question fast enough: <em style={{ color: "rgba(255,255,255,0.65)" }}>which one am I?</em> The identification problem killed the design before anyone got to the racing.
                  </p>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.50)", lineHeight: 1.65, marginTop: 16 }}>
                    The answer wasn't a better two-object system. It was removing one of the objects entirely.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Prototype / Full experience ──────────────────────────────────────── */}
      <section className="py-[100px]">
        <div className="max-w-[880px] mx-auto px-7">
          <FadeUp>
            <Eyebrow>The full experience</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              The ring doesn't represent the PR.<br />The ring is you.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(0,0,0,0.8)", marginTop: 24 }}>
              The arc fills at <em>your</em> pace. Your avatar rides the tip of it. Color — green or red — is the entire signal for ahead or behind. The PR has no presence on the ring at all. You don't see where it is. You just see whether your color is green.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The design stopped trying to show the race and started trying to encode the feeling of it.
            </p>
            <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginTop: 64, marginBottom: 12 }}>
              Three states. One coherent race.
            </h3>
            <p style={{ fontSize: 17, color: "rgba(0,0,0,0.55)", lineHeight: 1.65, maxWidth: 580, marginBottom: 52 }}>
              The design isn't just the competing view — it's a sequence. Each state has its own job.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LiveSegmentsPrototype ref={protoRef} onPhaseChange={handlePhaseChange} />
            </div>

            {/* Tab bar */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 44 }}>
              {PROTOTYPE_TABS.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (id === "approaching") protoRef.current?.jumpToApproaching();
                      else if (id === "competing") protoRef.current?.jumpToCompeting();
                      else protoRef.current?.jumpToFinished();
                    }}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 100,
                      background: isActive ? "rgba(0,0,0,0.07)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.08)"}`,
                      color: isActive ? "#1a1a1a" : "rgba(0,0,0,0.40)",
                      fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >{label}</button>
                );
              })}
            </div>

            {/* Animated description */}
            <div style={{ marginTop: 32, minHeight: 110 }}>
              <AnimatePresence mode="wait">
                {PROTOTYPE_TABS.filter(t => t.id === activeTab).map(({ id, title, body }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}
                  >
                    <h3 style={{ color: "#1a1a1a", fontSize: 17, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>{title}</h3>
                    <p style={{ fontSize: 15, color: "rgba(0,0,0,0.50)", lineHeight: 1.65 }}>{body}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── The anatomy ── */}
      <div className="max-w-[880px] mx-auto px-7">
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The anatomy</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              Five elements. Each one earned its place.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20, marginBottom: 16 }}>
              The design went through many stat combinations — time left, distance remaining, pace, time ahead/behind — before landing on a final configuration. Nothing survived by default. Every element had to justify its pixel count at a glance.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginBottom: 48 }}>
              We prioritized elements based on accessibility. The color signal — green or red — is intuitive but creates problems for athletes with color vision impairments. We needed an element equally prominent that communicated ahead or behind independently of color. And crucially, that element had to work for both the fullscreen segment page and the live segment indicator that carries across other navigational pages.
            </p>
            <div>
              <img
                src={finalDesignImg}
                alt="Final design anatomy — annotated Apple Watch Live Segments"
                style={{ display: "block", width: "100%", borderRadius: 12, marginBottom: 48 }}
              />
              <div>
                {[
                  { color: BLUE,               name: "PR Badge",         desc: "Top-left, fixed. Your target. Not on the ring — the ring belongs to you. It fills at your pace, not the PR's." },
                  { color: "rgba(0,0,0,0.15)",   name: "Horseshoe arc",    desc: "The segment — start to finish. Always the same shape. The track the race happens on." },
                  { color: "#4ade80",             name: "Arc fill",         desc: "Fills at your pace. Green = ahead of PR. Red = behind. The only signal you need to read the race." },
                  { color: BLUE,               name: "User avatar",      desc: "Rides the tip of the arc. You are the light. No identification problem — your position is self-evident." },
                  { color: "#1a1a1a",            name: "Arrow + time delta", desc: "▲/▼ is the accessible signal — ahead or behind, no color required. The number gives the margin. Together they work across the fullscreen page and the compact cross-page indicator." },
                ].map(({ color, name, desc }, i, arr) => (
                  <div key={name} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    padding: "16px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 5 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 3 }}>{name}</div>
                      <div style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>
      </div>{/* end anatomy */}

      {/* ── White column 4: outcome + reviews + credits + footer ── */}
      <div className="max-w-[880px] mx-auto px-7">

        {/* The result */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>The result</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              Athletes raced. And they finished.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The feature launched August 2025. The completion rate was the number I cared most about — if the design was confusing, athletes would dismiss it mid-effort and never look back.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginTop: 48 }}>
              {[
                { num: "95K", label: "Athletes started a Live Segment after launch" },
                { num: "18%", label: "Of all Apple Watch run and ride starts used Live Segments" },
                { num: "76%", label: "Completion rate — athletes who finished the segment they started" },
              ].map(({ num, label }) => (
                <div key={num}>
                  <div style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>{num}</div>
                  <div style={{ width: 28, height: 3, background: BLUE, borderRadius: 2, margin: "12px 0" }} />
                  <div style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{
              borderLeft: `4px solid ${BLUE}`,
              background: "rgba(115,140,199,0.04)",
              borderRadius: "0 12px 12px 0",
              padding: "28px 32px",
              marginTop: 48,
            }}>
              <h3 style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 700, marginBottom: 12 }}>
                76% completion tells you the design didn't make athletes want to stop looking at it.
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)" }}>
                Live Segments is a feature you interact with mid-effort. If the visualization was confusing or distracting, the instinct is to dismiss it. 76% stayed with it through to the end — on a screen they can only glance at.
              </p>
            </div>
          </FadeUp>
        </section>


        {/* Apple Park design reviews */}
        <section className="py-[80px]">
          <FadeUp>
            <div style={{ marginBottom: 44 }}>
              <img
                src={appleVisitImg}
                alt="At Apple Park for the design review"
                style={{ display: "block", width: "100%", borderRadius: 12 }}
              />
            </div>
            <Eyebrow>Working with Apple</Eyebrow>
            <h2 style={{ fontSize: TYPE.h2.fontSize, fontWeight: 700, lineHeight: TYPE.h2.lineHeight, letterSpacing: "-0.02em" }}>
              My job in the room wasn't to defend the design — it was to keep everyone rowing in the same direction.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              Across three sessions at Apple Park, I ran point on facilitating: sharing the work, pulling honest feedback out of the room instead of polite nods, finding where we actually had consensus, and following up on the open threads between sessions so nothing stalled.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              A good chunk of that time went to explaining what Live Segments even was before we could talk about how it looked — why athletes care about racing themselves, why feedback on a live, mid-effort experience works differently than reviewing static screens. I was in the room representing Strava's athletes as much as the design itself.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The one instinct that shaped almost everything downstream: never make someone decide anything mid-effort if we could help it. Don't force a mode switch. Don't ask someone to commit to a goal under pressure. Let people stay exactly where they are, and drill into a segment only if they want to.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 20 }}>
              The moments that worked showed up immediately, not just in the results later. The first time we shared the finished visualization with the room, someone said: "This looks like such a beautiful screen."
            </p>
          </FadeUp>
        </section>


        {/* Credits */}
        <section className="py-[80px]">
          <FadeUp>
            <Eyebrow>Some stuff I did</Eyebrow>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: "rgba(0,0,0,0.8)" }}>
              Concept development from the Wavelight observation through to the horseshoe arc · information architecture of the 5-component anatomy · stat combination testing · motion design spec across all animation states · go/no-go on the Ghost model · three Apple Park design reviews.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(0,0,0,0.55)", marginTop: 16 }}>
              Research by Kevin La, July 2025 · shipped as part of the Apple Watch redesign.
            </p>
          </FadeUp>
        </section>


        {/* Footer */}
        <footer className="py-[42px] flex items-center justify-between">
          <span className="text-[10px] tracking-[0.14em] text-black/30 font-medium uppercase">
            Strava · Live Segments
          </span>
          <Link
            to="/"
            className="text-[10px] tracking-[0.14em] text-black/35 font-medium uppercase hover:text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
            style={{ outlineColor: BLUE }}
          >Marcea — Selected Work</Link>
        </footer>

      </div>{/* end white column 4 */}

    </div>
  );
}
