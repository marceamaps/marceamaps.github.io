import React from "react";
import Hero from "./components/Hero";
import FloatingNav from "./components/FloatingNav";
import FeaturedProjectCard from "./components/FeaturedProjectCard";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import WorkGrid from "./components/WorkGrid";

import appleWatchImage from "../assets/apple-watch-award.png";
import awMapsVideo from "../assets/aw-maps-video.mp4";
import recordVideo from "../assets/record-mobile.mp4";

export default function App() {
  const [route, setRoute] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const featuredProject = {
    title: "Strava Watch App Redesign: 2025 App Store Award Winner",
    description:
      "Following a major Apple Watch redesign, the app received App Store recognition and saw meaningful growth in Apple Watch adoption and first-time use, alongside improved activity upload reliability through refined save flows and Live Segments.",
    imageUrl: appleWatchImage,
    link: "https://apps.apple.com/sa/iphone/story/id1847900442",
  };

  const workProjects = [
    {
      title: "Offline Maps for Apple Watch",
      mediaUrl: awMapsVideo,
      mediaType: "video" as const,
      link: "https://www.theverge.com/news/868418/strava-and-komoot-finally-bring-offline-maps-to-apple-watch",
    },
    {
      title: "Mobile Recording Redesign",
      mediaUrl: recordVideo,
      mediaType: "video" as const,
      background: "#DAF7ED",
      link: "https://www.t3.com/active/stravas-latest-update-fixes-a-problem-you-didnt-know-you-had",
    },
  ];

  return (
    <>
      <FloatingNav />

      {route === "#/work" ? (
        <>
          <div className="pt-36 px-8 max-w-7xl mx-auto">
            <FeaturedProjectCard {...featuredProject} />
            <WorkGrid projects={workProjects} />
          </div>

          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <ExperienceSection />
          <Footer />
        </>
      )}
    </>
  );
}