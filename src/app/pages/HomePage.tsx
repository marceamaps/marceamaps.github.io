import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Hero from "../components/Hero";
import FloatingNav from "../components/FloatingNav";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import CaseStudyCard from "../components/CaseStudyCard";

import adpImage        from "../../assets/ADP.png";
import awRedesignVideo from "../../assets/apple-watch-re-design.mp4";
import liveSegVideo    from "../../assets/live-segments.mp4";
import heatmapsVideo   from "../../assets/map-settings-heatmaps.mp4";
import mobileRecVideo  from "../../assets/mobile-record.mp4";
import awMapsVideo     from "../../assets/apple-watch-maps.mp4";

const CASE_STUDIES = [
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
    title: "Maps on Apple Watch",
    subtitle: "Brought glanceable navigation to athletes' wrists for the first time — with strong early engagement among route-followers, already outpacing mobile route starts.",
    mediaUrl: awMapsVideo,
    mediaType: "video" as const,
    link: "/case-study/apple-watch-maps",
  },
  {
    index: 4,
    title: "Recording, Revamped",
    subtitle: "A ground-up rebuild of Strava's highest-volume recording surface — where the majority of first uploads happen — driving measurable lifts in map engagement and laying the foundation for features that grew weekly active users.",
    mediaUrl: mobileRecVideo,
    mediaType: "video" as const,
    link: "/case-study/mobile-record",
  },
  {
    index: 5,
    title: "Heatmaps & Map Settings",
    subtitle: "A new map settings infrastructure and heatmap redesign that became a key driver of Maps Tab subscriber growth, contributing to Strava's strongest year of maps engagement to date.",
    mediaUrl: heatmapsVideo,
    mediaType: "video" as const,
    link: "/case-study/heatmaps",
  },
  {
    index: 6,
    title: "Activity Details Page",
    subtitle: "Stepped in as design lead to ship a FATMAP integration, driving meaningful lifts in map interaction and overall page engagement — with map icons becoming the second most-clicked element on the page.",
    mediaUrl: adpImage,
    mediaType: "image" as const,
    link: "/case-study/adp",
  },
];

function IdentityReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="px-8 pt-28 pb-16 max-w-7xl mx-auto">
      <motion.p
        className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/35 mb-5"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Product Designer
      </motion.p>
      <motion.h1
        className="font-bold tracking-tight leading-[1.0]"
        style={{ fontSize: "clamp(52px, 9vw, 128px)", letterSpacing: "-0.03em" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Marcea Ennamorato
      </motion.h1>
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
            <CaseStudyCard key={project.index} {...project} />
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
