import heroImg1 from "figma:asset/130184d19adfc28a5c381d6cdac0dfbef66553c1.png";
import heroImg2 from "figma:asset/9415dbeeec7649af67a4ce143eb4a44850122e85.png";
import heroImg3 from "figma:asset/65e725cca1b3b24286d59c34cdfcbe865104d991.png";
import heroImg4 from "figma:asset/8b4e6633269722bb249284dcccc1218be4a3e533.png";
import { Volume2 } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const x1 = useTransform(scrollYProgress, [0, 2], [0, -8]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Animation variants for the stacked card effect
  const imageVariants = {
    hidden: (index: number) => ({
      y: -index * 80, // Stack all cards at the top position
      opacity: 0.8,
    }),
    visible: (index: number) => ({
      y: 0, // Expand to natural position
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  return (
    <section className="px-8 py-20 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="flex flex-col items-start gap-10 flex-1">
          <div className="flex flex-col gap-12">
            <h1 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold">
              Hi, I'm Marcea
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <p className="font-['Inter',sans-serif] text-sm md:text-lg text-gray-400 font-light" style={{ fontStyle: 'italic' }}>
                  Sounds like
                  mar•see•uh
                </p>
              </div>
            </div>
          </div>
          <p className="font-['Playfair_Display',serif] text-lg md:text-3xl text-black leading-relaxed">
            I'm a product designer at <a href="https://strava.com" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 transition-all hover:italic" style={{ color: '#fc5200' }}>Strava</a>, where I design how athletes record, experience, and relive their activities across web, mobile, and wearables. My work on Strava's Apple Watch app won the <a href="https://www.apple.com/newsroom/2025/12/apple-unveils-the-winners-of-the-2025-app-store-awards/" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 transition-all hover:italic">2026 Apple Watch App of the Year</a>, and is used by millions of athletes worldwide.
          </p>
          <p className="font-['Playfair_Display',serif] text-lg md:text-3xl text-black leading-relaxed">
            With 8+ years across startups and established products, I've shipped everything from foundational systems to high-impact features at global scale. I approach design with a perspective of experimentation and risk assessment, balancing velocity with the details.
          </p>
          <p className="font-['Playfair_Display',serif] text-lg md:text-3xl text-black leading-relaxed">
            I live at the intersection of passion and craft in <a href="https://en.wikipedia.org/wiki/Chamonix" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 transition-all hover:italic">Chamonix</a>, designing in motion through trail runs and rock climbs in the mountains that shape the moments I design for—real life, off the screen.
          </p>
          </div>
        
        <motion.div 
          className="flex flex-col -space-y-20 items-end relative" 
          ref={ref}
          style={{ position: 'relative' }}
        >
          <motion.img 
            src={heroImg3} 
            alt="Trail running in mountains" 
            className="w-64 h-auto object-cover rounded-lg shadow-lg"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ 
              rotate: 4,
              x: x1,
              zIndex: 40
            }}
            whileHover={{ rotate: 8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img 
            src={heroImg1} 
            alt="Marcea at Strava" 
            className="w-64 h-auto object-cover rounded-lg shadow-lg"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ 
              rotate: -3,
              x: x2,
              zIndex: 10
            }}
            whileHover={{ rotate: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img 
            src={heroImg2} 
            alt="Rock climbing" 
            className="w-64 h-auto object-cover rounded-lg shadow-lg"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ 
              rotate: 4,
              x: x3,
              zIndex: 20
            }}
            whileHover={{ rotate: 8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img 
            src={heroImg4} 
            alt="Strava Editors' Choice award" 
            className="w-64 h-auto object-cover rounded-lg shadow-lg"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ 
              rotate: -2,
              x: x4,
              zIndex: 30
            }}
            whileHover={{ rotate: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      </div>
    </section>
  );
}