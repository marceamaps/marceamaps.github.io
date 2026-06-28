import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type CaseStudyCardProps = {
  index: number;
  title: string;
  subtitle: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  link: string;
};

export default function CaseStudyCard({
  index,
  title,
  subtitle,
  mediaUrl,
  mediaType,
  link,
}: CaseStudyCardProps) {
  return (
    <Link
      to={link}
      className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch"
    >
      {/* Left — text, outside the card */}
      <div className="flex flex-col py-2">
        <div className="flex flex-col gap-5">
          <span className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase">
            {String(index).padStart(2, "0")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1]">
            {title}
          </h2>
          <p className="text-base md:text-lg text-black/55 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 px-5 py-[9px] rounded-full border border-black/20 text-xs font-semibold uppercase tracking-[0.14em] text-black/50 group-hover:border-black/40 group-hover:text-black transition-colors duration-200">
            View case study
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      {/* Right — media card, image fills completely */}
      <div className="relative rounded-2xl overflow-hidden bg-[#EDE8DF] min-h-[360px]">
        {mediaType === "video" ? (
          <video
            src={mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-[1.002]"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover scale-[1.002]"
          />
        )}
      </div>
    </Link>
  );
}
