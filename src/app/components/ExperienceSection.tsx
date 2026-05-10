import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Strava",
      role: "Product Designer",
      date: "2022–Present",
      location: "Chamonix-mont-blanc",
      description: "Following the acquisition of FATMAP, continued designing map-centric and activity experiences across web, mobile, and wearables at Strava. Focused on activity recording, mapping, live experiences, and post-activity storytelling—balancing real-world athlete needs, platform constraints, and long-term product strategy at scale."
    },
    {
      company: "FATMAP",
      role: "Product Designer",
      date: "2021–2022",
      location: "Chamonix-mont-blanc",
      description: "Worked closely with founder Misha Gopaul in a small, high-ownership team to evolve FATMAP's core product ahead of its acquisition by Strava. One of two designers on the mobile (react) and web platform, focusing on subscription growth, onboarding, and complex map-driven features. Key work included improving subscription upsell flows, designing avalanche forecasting experiences, and introducing a community heatmap, and contributing to a full native rebuild of the app."
    },
    {
      company: "OuterSpatial (Trailhead Labs)",
      role: "Product Designer",
      date: "June 2018–2021",
      location: "Denver",
      description: "Led end-to-end product design for web, iOS, and Android in a small startup environment. Owned UX, UI, and cartographic design systems, including basemaps, map styles, and geospatial features. Collaborated closely with founders, engineers, and users to ship new functionality and validate designs in-market."
    },
    {
      company: "MapQuest",
      role: "Cartographer",
      date: "April 2017–May 2018",
      location: "Denver",
      description: "Led the full redesign of MapQuest's mobile map experience, used by tens of millions of monthly users. Researched navigation trends, applied cartographic conventions, and delivered features such as real-time parking. Presented design decisions cross-functionally and company-wide."
    },
    {
      company: "The San Francisco Public Press",
      role: "Freelance Cartographer",
      date: "January 2015–March 2017",
      location: "San Francisco",
      description: "Produced data-driven cartographic work focused on sea-level rise and urban development in the San Francisco Bay Area. Analyzed complex spatial datasets, uncovered data issues, and collaborated with journalists to deliver clear, accurate visual storytelling."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section className="px-8 py-20 max-w-7xl mx-auto relative" id="experience">
      <h2 className="text-5xl md:text-6xl mb-20">Experience</h2>

      <motion.div
        className="space-y-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-6 md:gap-12"
            variants={itemVariants}
          >
            <div className="text-2xl md:text-3xl leading-tight">
              {exp.date}
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl leading-tight">
                {exp.company}
              </h3>
              <p className="text-2xl md:text-3xl leading-tight">
                {exp.role}
              </p>
              <p className="text-base leading-relaxed mt-6 max-w-3xl">
                {exp.description}
              </p>
            </div>

            <div className="text-2xl md:text-3xl leading-tight md:text-right">
              {exp.location}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}