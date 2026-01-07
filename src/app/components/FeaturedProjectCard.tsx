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
  linkText = "Read More"
}: FeaturedProjectCardProps) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale from 1 (full width) to 0.7 (70% width) - stops sooner, larger final size
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 24]);

  return (
    <div ref={containerRef} className="relative pt-16 md:pt-24 lg:pt-[100px]" style={{ minHeight: '300vh' }}>
      {/* Sticky container for the scaling image - overlays content initially */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible z-20">
        <motion.div 
          className="w-full"
          style={{ 
            scale,
          }}
        >
          <div className="flex flex-col items-center">
            <h2 className="font-['Playfair_Display',serif] font-bold italic text-center mb-8 md:mb-12 text-6xl md:text-9xl lg:text-[10rem]">
              Featured Work
            </h2>
            
            <motion.div
              className="relative w-full overflow-hidden bg-gray-900"
              style={{ borderRadius }}
            >
              <div className="aspect-[16/9] w-full">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Content that gets revealed - sticky and fixed in position behind the image */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="bg-white relative pointer-events-auto w-full mt-[80vh] md:mt-[115vh] lg:mt-[125vh]">
          <div className="max-w-4xl mx-auto text-center px-8 py-12">
            <h3 className="font-['Playfair_Display',serif] font-bold text-2xl md:text-3xl mb-4">
              {title}
            </h3>
            
            <p className="font-['Playfair_Display',serif] text-base md:text-lg leading-relaxed mb-6">
              {description}
            </p>
            
            {link && (
              <a 
                href={link}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-['Inter',sans-serif] tracking-wider uppercase inline-flex items-center gap-2 justify-center px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden hover:shadow-2xl"
                style={{
                  background: 'white',
                  color: 'black',
                  fontSize: '0.875rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                read me {external && <ExternalLink className="w-4 h-4" />}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}