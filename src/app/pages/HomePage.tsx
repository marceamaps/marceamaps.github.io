import Hero from "../components/Hero";
import FloatingNav from "../components/FloatingNav";
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

export default function HomePage() {
  return (
    <>
      <FloatingNav />

      {/* Home */}
      <section id="home">
        <Hero />
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {CASE_STUDIES.map((project) => (
            <CaseStudyCard key={project.index} {...project} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="pt-32">
        <ExperienceSection />
      </section>

      {/* Contact */}
      <Footer />
    </>
  );
}
