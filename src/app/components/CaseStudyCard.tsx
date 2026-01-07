import { ExternalLink } from "lucide-react";

type CaseStudyCardProps = {
  number: number;
  title: string;
  vibe: string;
  trends: string[];
  tip: string;
  illustrationUrl: string;
  link?: string;
  external?: boolean;
};

export default function CaseStudyCard({
  number,
  title,
  vibe,
  trends,
  tip,
  illustrationUrl,
  link,
  external
}: CaseStudyCardProps) {
  return (
    <article className="relative w-full overflow-hidden rounded-2xl" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* Left side - Text content */}
        <div className="p-8 md:p-12 flex flex-col gap-6">
          <h2 className="font-['Playfair_Display',serif] font-bold text-4xl md:text-5xl">
            {number}. {title}
          </h2>

          <div>
            <h3 className="font-['Inter',sans-serif] text-xs tracking-wider uppercase mb-2">
              YOUR VIBE:
            </h3>
            <p className="font-['Playfair_Display',serif] text-base leading-relaxed">
              {vibe}
            </p>
          </div>

          <div>
            <h3 className="font-['Inter',sans-serif] text-xs tracking-wider uppercase mb-2">
              TRENDS THAT SUIT YOU:
            </h3>
            <ul className="font-['Playfair_Display',serif] text-base leading-relaxed space-y-1">
              {trends.map((trend, index) => (
                <li key={index}>#{index + 1} {trend}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Inter',sans-serif] text-xs tracking-wider uppercase mb-2">
              OUR 2026 TIP:
            </h3>
            <p className="font-['Playfair_Display',serif] text-base leading-relaxed">
              {tip}
            </p>
          </div>

          {link && (
            <a 
              href={link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="font-['Inter',sans-serif] tracking-wider uppercase inline-flex items-center gap-2 justify-center mt-4 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden hover:shadow-2xl"
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

        {/* Right side - Illustration */}
        <div className="relative bg-black overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={illustrationUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative elements - dotted patterns and sparkles */}
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-50"
            style={{
              backgroundImage: 'radial-gradient(circle, #F5F0E8 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />
          
          {/* Sparkle decorations */}
          <div className="absolute top-1/4 left-8 text-yellow-300 text-2xl">✦</div>
          <div className="absolute bottom-1/3 right-12 text-yellow-300 text-xl">✦</div>
          <div className="absolute top-1/2 right-1/4 text-yellow-300 text-lg">✦</div>
        </div>
      </div>
    </article>
  );
}