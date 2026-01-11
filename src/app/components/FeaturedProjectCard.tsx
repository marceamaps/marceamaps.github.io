import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

type FeaturedProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  external?: boolean;
  linkText?: string;
};

export default function FeaturedProjectCard({
  title,
  description,
  imageUrl,
  link = "#",
  external = false,
  linkText = "Read More",
}: FeaturedProjectCardProps) {
  const stickyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end start"],
  });

  // Scale from 1 to 0.8 as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Border radius from 0 to 24px
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);

  return (
    <>
      {/* Sticky animation section */}
      <div
        ref={stickyRef}
        className="relative bg-white h-[120vh] md:h-[140vh] lg:h-[160vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-end">
          {/* Scaling header section */}
          <motion.div
            className="w-full flex flex-col items-center"
            style={{
              scale,
              transformOrigin: "center bottom",
            }}
          >
            {/* Title */}
            <h2 className="font-['Playfair_Display',serif] font-bold italic text-center mb-4 md:mb-6 lg:mb-8 text-4xl md:text-7xl lg:text-9xl px-4 md:px-8">
              Featured Work
            </h2>

            {/* Hero Image */}
            <motion.figure
              className="w-full max-w-7xl overflow-hidden bg-gray-900"
              style={{ borderRadius }}
            >
              <img src={imageUrl} alt={title} className="w-full h-auto" />
            </motion.figure>
          </motion.div>
        </div>
      </div>

      {/* Text content - OUTSIDE the sticky container */}
      <div className="relative bg-white pt-2 md:pt-6 lg:pt-8 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="font-['Playfair_Display',serif] font-bold text-2xl md:text-3xl mb-6">
            {title}
          </h3>

          <p className="font-['Playfair_Display',serif] text-base md:text-lg leading-relaxed mb-8">
            {description}
          </p>

          {link && (
            <a
              href={link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="font-['Inter',sans-serif] tracking-wider uppercase inline-flex items-center gap-2 justify-center px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-white text-black border border-gray-200 hover:shadow-lg"
            >
              {linkText || "read me"}{" "}
              {external && <ExternalLink className="w-4 h-4" />}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
