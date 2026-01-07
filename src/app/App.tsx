import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import FeaturedProjectCard from "./components/FeaturedProjectCard";
import CaseStudyCard from "./components/CaseStudyCard";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import appleWatchImage from "figma:asset/399c37248aa7adda05f461d1e8aebca34d9ab0a4.png";

export default function App() {
  const featuredProject = {
    title: "Strava Watch App Redesign: 2025 App Store Award Winner",
    description:
      "Following a major Apple Watch redesign, the app received App Store recognition and saw meaningful growth in Apple Watch adoption and first-time use, alongside improved activity upload reliability through refined save flows and Live Segments.",
    imageUrl: appleWatchImage,
    link: "https://apps.apple.com/sa/iphone/story/id1847900442",
    external: true,
  };

  const caseStudies = [
    {
      number: 1,
      title: "Mobile Record Redesign",
      vibe: "You move mindfully and with intention. Every stretch, every breath is your reset. Balance is your superpower, and movement is your meditation.",
      trends: [
        "The New Mind-Body Wave (Reformer Pilates, Breathwork, Sound Healing)",
        "Fluidity Core (Gentle Yoga, Swimming)",
        "Next Level Recovery (Massage, Healthy Back)"
      ],
      tip: "A mobile record redesign drove meaningful increases in conversion, particularly among new and global users across Android and iOS, while establishing a scalable design system that unlocked future feature development.",
      illustrationUrl: "figma:asset/a8f7ca66babcdc4cb3c6920491fafcf9dc2cfede.png",
      link: "https://www.t3.com/active/stravas-latest-update-fixes-a-problem-you-didnt-know-you-had",
      external: true
    },
    {
      number: 2,
      title: "Activity Detail Page",
      vibe: "The louder the beat, the faster your pulse – that's your flow. You live for the sweat, the strength, and the next goal on the horizon.",
      trends: [
        "Healthy Performance & High-Fives (Hyrox, Functional Training)",
        "Urban Adventure & Nature-Reset (Outdoor Bootcamps, Bouldering)",
        "Fluidity Core (Dance)"
      ],
      tip: "Improvements to the activity detail page drove measurable increases in overall engagement, including higher page views and a significant lift in map interaction.",
      illustrationUrl: "figma:asset/80be7e08d8ed4b7654d0269ba0fca63b3ec02896.png",
      link: "https://press.strava.com/articles/strava-updates-features-to-help-users-easily-plan-and-share-their-activities",
      external: true
    },
    {
      number: 3,
      title: "Web Map Heatmaps",
      vibe: "For you, wellness is a ritual. From pre-workout matcha to post-sweat sauna, you know the secret is in the details.",
      trends: [
        "The New Mind-Body Wave (Cold Plunges, Infrared Saunas)",
        "Next Level Recovery (Massage, Cryotherapy)",
        "Healthy Performance (Nutrition Coaching)"
      ],
      tip: "Web routing trials grew over 100% year over year, with the strongest gains occurring during the April–September period when the majority of map improvements shipped.",
      illustrationUrl: "figma:asset/949fa6c0990c6e982ee3fffeefd4efdf02d3358a.png",
      link: "https://strava.com/maps",
      external: true
    }
  ];

  const projects = [
    {
      category: "MOBILE",
      title: "Mobile Record Redesign",
      description:
        "A mobile record redesign drove meaningful increases in conversion, particularly among new and global users across Android and iOS, while establishing a scalable design system that unlocked future feature development and supported a growing range of recording use cases.",
      date: "2025",
      imageUrl: "figma:asset/a8f7ca66babcdc4cb3c6920491fafcf9dc2cfede.png",
      link: "https://www.t3.com/active/stravas-latest-update-fixes-a-problem-you-didnt-know-you-had",
      external: true,
      linkText: "Read more",
      size: "small" as const,
    },
    {
      category: "MOBILE",
      title: "Strava's Activity Detail Page",
      description:
        "Improvements to the activity detail page drove measurable increases in overall engagement, including higher page views and a significant lift in map interaction. Achievement-based polyline highlights became one of the most interacted-with elements on the page.",
      date: "2024",
      imageUrl: "figma:asset/80be7e08d8ed4b7654d0269ba0fca63b3ec02896.png",
      link: "https://press.strava.com/articles/strava-updates-features-to-help-users-easily-plan-and-share-their-activities",
      external: true,
      size: "small" as const,
    },
    {
      category: "WEB",
      title: "Strava Web Map Heatmaps & Filtering",
      description:
        "Web routing trials grew over 100% year over year, with the strongest gains occurring during the April–September period when the majority of map improvements shipped.",
      date: "2025",
      imageUrl: "figma:asset/949fa6c0990c6e982ee3fffeefd4efdf02d3358a.png",
      link: "https://strava.com/maps",
      external: true,
      linkText: "Try it",
      size: "small" as const,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation hot links */}
      <nav className="bg-white py-4 px-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 md:gap-8 flex-wrap">
          <a
            href="#work"
            className="font-['Inter',sans-serif] text-xs tracking-wider text-black hover:underline hover:italic underline-offset-4 transition-all"
          >
            WORK
          </a>
          <a
            href="#experience"
            className="font-['Inter',sans-serif] text-xs tracking-wider text-black hover:underline hover:italic underline-offset-4 transition-all"
          >
            EXPERIENCE
          </a>
          <a
            href="#contact"
            className="font-['Inter',sans-serif] text-xs tracking-wider text-black hover:underline hover:italic underline-offset-4 transition-all"
          >
            CONTACT
          </a>
        </div>
      </nav>

      <Hero />

      {/* Featured Work Section */}
      <section className="relative py-12" id="work">
        <FeaturedProjectCard {...featuredProject} />
        
        <div className="max-w-6xl mx-auto px-8 mt-24 space-y-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.number} {...study} />
          ))}
        </div>
      </section>

      <ExperienceSection />
      
      <Footer />
    </div>
  );
}