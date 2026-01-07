import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  category: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  link?: string;
  size?: "large" | "small";
  external?: boolean;
  linkText?: string;
};

export default function ProjectCard({ 
  category, 
  title, 
  description, 
  date, 
  imageUrl,
  link = "#",
  size = "small",
  external = false,
  linkText = "Read More"
}: ProjectCardProps) {
  const isLarge = size === "large";
  
  return (
    <article className={`flex flex-col gap-6 ${isLarge ? 'md:col-span-2' : ''}`}>
      <div className={`bg-gray-900 overflow-hidden rounded-lg ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <ImageWithFallback 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <p className="font-['Inter',sans-serif] text-[10px] tracking-widest uppercase">
          {date} • {category}
        </p>
        
        <h3 className={`font-['Playfair_Display',serif] font-bold ${isLarge ? 'text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className="font-['Playfair_Display',serif] text-sm leading-relaxed">
          {description}
        </p>
        
        {link && (
          <a 
            href={link}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="font-['Inter',sans-serif] text-xs tracking-wider uppercase hover:underline inline-flex items-center gap-2 mt-2"
          >
            {external ? linkText : "View Project"} {external ? <ExternalLink className="w-3 h-3" /> : "→"}
          </a>
        )}
      </div>
    </article>
  );
}