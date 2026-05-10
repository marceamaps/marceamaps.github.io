import heroImg1 from "../../assets/hero-strava-award.png";
import heroImg2 from "../../assets/hero-rock-climbing.png";
import heroImg3 from "../../assets/hero-trail-running.png";
import heroImg4 from "../../assets/strava-editors-choice.png";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

export default function Hero() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const imageVariants = {
    hidden: (index: number) => ({
      y: -index * 56,
      opacity: 0.85,
    }),
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section className="px-8 pt-36 pb-24 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="flex flex-col items-start gap-10 flex-1">
          <h1 className="text-3xl md:text-5xl font-bold">Hi, I'm Marcea</h1>

          <p className="text-lg md:text-3xl text-black leading-relaxed">
            I'm a product designer at{" "}
            <a
              href="https://strava.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2 transition-all hover:italic"
              style={{ color: "#fc5200" }}
            >
              Strava
            </a>
            , where I design how athletes record, experience, and relive their
            activities across web, mobile, and wearables. My work on Strava's
            Apple Watch app won the{" "}
            <a
              href="https://www.apple.com/newsroom/2025/12/apple-unveils-the-winners-of-the-2025-app-store-awards/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2 transition-all hover:italic"
            >
              2026 Apple Watch App of the Year
            </a>
            , and is used by millions of athletes worldwide.
          </p>

          <p className="text-lg md:text-3xl text-black leading-relaxed">
            With 8+ years across startups and established products, I've shipped
            everything from foundational systems to high-impact features at
            global scale. I approach design with a perspective of
            experimentation and risk assessment, balancing velocity with the
            details.
          </p>

          <p className="text-lg md:text-3xl text-black leading-relaxed">
            I live at the intersection of passion and craft in{" "}
            <a
              href="https://en.wikipedia.org/wiki/Chamonix"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2 transition-all hover:italic"
            >
              Chamonix
            </a>
            , designing in motion through trail runs and rock climbs in the
            mountains that shape the moments I design — real life, off the
            screen.
          </p>
        </div>

        <motion.div
          className="relative w-full md:w-[340px] lg:w-[380px] min-h-[560px] md:pt-4"
          ref={ref}
        >

          <motion.img
            src={heroImg3}
            alt="Trail running in mountains"
            className="absolute top-0 right-0 w-72 md:w-80 h-auto object-cover rounded-[22px] shadow-xl"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ rotate: 3, x: x1, zIndex: 30 }}
            whileHover={{ rotate: 4, scale: 1.02, y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          />

          <motion.img
            src={heroImg1}
            alt="Marcea at Strava"
            className="absolute top-[180px] left-0 w-64 md:w-72 h-auto object-cover object-top rounded-[22px] shadow-xl"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ rotate: -3, x: x2, zIndex: 20 }}
            whileHover={{ rotate: -4, scale: 1.02, y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          />


          <motion.img
            src={heroImg4}
            alt="Strava Editors' Choice award"
            className="absolute top-[560px] right-0 w-56 md:w-64 h-auto object-cover rounded-[22px] shadow-xl"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            style={{ rotate: 1, x: x4, zIndex: 10 }}
            whileHover={{ rotate: 2, scale: 1.02, y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          />

        </motion.div>
      </div>
    </section>
  );
}