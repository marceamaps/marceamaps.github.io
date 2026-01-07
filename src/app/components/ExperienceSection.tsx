import { motion } from "motion/react";

export default function ExperienceSection() {
  const experiences = [
    { 
      company: "Strava", 
      role: "Product Designer", 
      date: "2022–Present",
      description: "Following the acquisition of FATMAP, continued designing map-centric and activity experiences across web, mobile, and wearables at Strava. Focused on activity recording, mapping, live experiences, and post-activity storytelling—balancing real-world athlete needs, platform constraints, and long-term product strategy at scale."
    },
    { 
      company: "FATMAP", 
      role: "Product Designer", 
      date: "2021–2022",
      description: "Worked closely with founder Misha Gopaul in a small, high-ownership team to evolve FATMAP's core product ahead of its acquisition by Strava. One of two designers on the mobile (react) and web platform, focusing on subscription growth, onboarding, and complex map-driven features. Key work included improving subscription upsell flows, designing avalanche forecasting experiences, and introducing a community heatmap, and contributing to a full native rebuild of the app."
    },
    { 
      company: "OuterSpatial (Trailhead Labs)", 
      role: "Product Designer", 
      date: "June 2018–2021",
      description: "Led end-to-end product design for web, iOS, and Android in a small startup environment. Owned UX, UI, and cartographic design systems, including basemaps, map styles, and geospatial features. Collaborated closely with founders, engineers, and users to ship new functionality and validate designs in-market."
    },
    { 
      company: "MapQuest", 
      role: "Cartographer", 
      date: "April 2017–May 2018",
      description: "Led the full redesign of MapQuest's mobile map experience, used by tens of millions of monthly users. Researched navigation trends, applied cartographic conventions, and delivered features such as real-time parking. Presented design decisions cross-functionally and company-wide."
    },
    { 
      company: "The San Francisco Public Press", 
      role: "Freelance Cartographer", 
      date: "January 2015–March 2017",
      description: "Produced data-driven cartographic work focused on sea-level rise and urban development in the San Francisco Bay Area. Analyzed complex spatial datasets, uncovered data issues, and collaborated with journalists to deliver clear, accurate visual storytelling."
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="px-8 py-12 max-w-7xl mx-auto relative" id="experience">
      <div className="relative">
        <h2 className="font-['Inter',sans-serif] text-xs tracking-widest mb-8">
          EXPERIENCE
        </h2>
        
        <motion.div 
          className="space-y-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="flex items-start gap-4 pl-6"
              variants={itemVariants}
            >
              <span className="font-['Playfair_Display',serif] text-4xl font-bold italic min-w-[50px]">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-['Playfair_Display',serif] font-bold text-lg">
                  {exp.company} • {exp.date}
                </h3>
                <p className="font-['Playfair_Display',serif] text-sm mt-1 italic">
                  {exp.role}
                </p>
                <p className="font-['Playfair_Display',serif] text-sm mt-3 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}