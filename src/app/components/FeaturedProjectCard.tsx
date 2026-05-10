import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type FeaturedProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

export default function FeaturedProjectCard({
  title,
  description,
  imageUrl,
  link,
}: FeaturedProjectCardProps) {
  const stickyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <section ref={stickyRef} className="bg-white px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-16 items-start pb-28 md:pb-36">
          <motion.figure
            className="overflow-hidden rounded-[28px] bg-black"
            style={{ scale }}
            whileHover={{ y: -4 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-contain"
              whileHover={{ scale: 1.02 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </motion.figure>

          <div className="lg:sticky lg:top-32">
            <h3 className="font-bold text-3xl md:text-4xl leading-tight mb-6">
              {title}
            </h3>

            <p className="text-base md:text-lg leading-relaxed text-black/75">
              {description}
            </p>
          </div>
        </div>
      </section>
    </a>
  );
}