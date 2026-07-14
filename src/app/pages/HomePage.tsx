import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Hero from "../components/Hero";
import FloatingNav from "../components/FloatingNav";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import CaseStudyCard from "../components/CaseStudyCard";
import { FadeUp } from "../components/caseStudyKit";

import adpImage        from "../../assets/ADP.png";
import awRedesignVideo from "../../assets/apple-watch-re-design.mp4";
import liveSegVideo    from "../../assets/live-segments.mp4";
import heatmapsVideo   from "../../assets/map-settings-heatmaps.mp4";
import mobileRecVideo  from "../../assets/mobile-record.mp4";
import awMapsVideo     from "../../assets/apple-watch-maps.mp4";

const CASE_STUDIES = [
  // ── Done ────────────────────────────────────────────────────────────────────
  {
    index: 1,
    title: "Apple Watch Redesign",
    subtitle: "A platform redesign that earned Apple's 2025 App Store Award, drove sustained growth in daily active athletes, and was featured across 22 global outlets with 96% positive sentiment.",
    mediaUrl: awRedesignVideo,
    mediaType: "video" as const,
    link: "/case-study/apple-watch-redesign",
  },
  {
    index: 2,
    title: "Live Segments",
    subtitle: "Brought live segments to Apple Watch for the first time — designing natively for the wrist so segment racing feels alive on the smallest screen.",
    mediaUrl: liveSegVideo,
    mediaType: "video" as const,
    link: "/case-study/live-segments",
  },
  {
    index: 3,
    title: "Recording, Revamped",
    subtitle: "A ground-up rebuild of Strava's highest-volume recording surface — where the majority of first uploads happen — driving measurable lifts in map engagement and laying the foundation for features that grew weekly active users.",
    mediaUrl: mobileRecVideo,
    mediaType: "video" as const,
    link: "/case-study/mobile-record",
  },
  {
    index: 4,
    title: "Activity Details Page",
    subtitle: "Stepped in as design lead to ship a FATMAP integration, driving meaningful lifts in map interaction and overall page engagement — with map icons becoming the second most-clicked element on the page.",
    mediaUrl: adpImage,
    mediaType: "image" as const,
    link: "/case-study/adp",
  },
  // ── Work in progress ────────────────────────────────────────────────────────
  {
    index: 5,
    title: "Maps on Apple Watch",
    subtitle: "Brought glanceable navigation to athletes' wrists for the first time — with strong early engagement among route-followers, already outpacing mobile route starts.",
    mediaUrl: awMapsVideo,
    mediaType: "video" as const,
    link: "/case-study/apple-watch-maps",
  },
  {
    index: 6,
    title: "Heatmaps & Map Settings",
    subtitle: "A new map settings infrastructure and heatmap redesign that became a key driver of Maps Tab subscriber growth, contributing to Strava's strongest year of maps engagement to date.",
    mediaUrl: heatmapsVideo,
    mediaType: "video" as const,
    link: "/case-study/heatmaps",
  },
];

function IdentityReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto"
    >
      {/* Intro — medium size */}
      <motion.p
        className="text-black/80 leading-snug max-w-3xl mb-10"
        style={{ fontSize: "clamp(28px, 2.8vw, 40px)", letterSpacing: "-0.015em" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Hi, I'm Marcea Ennamorato. I'm staff product designer and lead of maps experiences at Strava. Welcome to my space, where I've crafted stories of my work while simultaneously discovering the speed and finesse of what AI enabled coding can unlock. This began as a journey to better harness the power of AI. It became a self reflection on all the work I've done over the past few years.
      </motion.p>

      {/* Biography — body size */}
      <motion.p
        className="text-xl leading-relaxed text-black/50 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      >
        I began my career studying geomorphology and geography (read: mountains) — which led me to Strava, where I've spent the last several years as a product designer on the Maps and Navigation team. I live in Chamonix-mont-blanc, surrounded by mountains and endless athletic pursuits. I relish the moments I get to design for — living life, outdoors.
      </motion.p>

      {/* Personality — body size, staggered */}
      <motion.p
        className="mt-6 text-xl leading-relaxed text-black/50 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      >
        I'm not afraid to say the hard things and I love a bad idea almost as much as a good one. I'm a pursuer of truth at whatever cost, I'm not interested in ego or subjective findings, and I pair best with those that love a good, healthy debate about pretty much anything, especially coffee, definitely design.
      </motion.p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <FloatingNav />

      {/* Home */}
      <section id="home">
        <Hero />
      </section>

      {/* Identity */}
      <IdentityReveal />

      {/* Projects */}
      <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {CASE_STUDIES.map((project) => (
            <FadeUp key={project.index}>
              <CaseStudyCard {...project} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about">
        <AboutSection />
        <ExperienceSection />
      </section>

      {/* Contact */}
      <Footer />
    </>
  );
}
