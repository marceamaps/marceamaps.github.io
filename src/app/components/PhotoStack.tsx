import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import heroImg1 from "../../assets/hero-strava-award.png";
import heroImg2 from "../../assets/hero-rock-climbing.png";
import heroImg3 from "../../assets/hero-trail-running.png";
import heroImg4 from "../../assets/strava-editors-choice.png";

export default function PhotoStack() {
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
    <motion.div
      className="relative w-full max-w-[420px] min-h-[820px] mx-auto lg:mx-0 lg:w-[380px] lg:min-h-[760px] lg:pt-4"
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
        className="absolute top-[520px] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-[560px] lg:right-0 w-56 md:w-64 h-auto object-cover rounded-[22px] shadow-xl"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        style={{ rotate: 1, x: x4, zIndex: 10 }}
        whileHover={{ rotate: 2, scale: 1.02, y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      />
    </motion.div>
  );
}