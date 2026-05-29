import { useEffect, useState, useRef } from "react";
import contours from "../../assets/contours.svg";

export default function Hero() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const sectionRef = useRef<HTMLElement>(null);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    document.body.style.cursor = inHero ? "none" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [inHero]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center cursor-none">

      {/* Contour layer — revealed by cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
        }}
      >
        <img
          src={contours}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Coordinates */}
      <p className="absolute top-8 left-8 text-xs tracking-[0.3em] text-black/40">
        45.9237° N &nbsp; 6.8694° E &nbsp;—&nbsp; Chamonix, France
      </p>

      {/* Name */}
      <h1 className="relative text-center text-6xl md:text-8xl lg:text-[112px] font-bold tracking-[-0.03em] leading-none">
        Marcea Ennamorato
      </h1>

      {/* Tagline */}
      <p className="relative mt-6 text-base md:text-xl text-black/50 tracking-[0.02em]">
        product designer. maps, motion, mountains.
      </p>

      {/* Scroll hint */}
      <p className="absolute bottom-8 text-xs tracking-[0.3em] text-black/30">
        ↓ &nbsp; scroll
      </p>


      {/* GPS location cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          opacity: pos.x === -999 || !inHero ? 0 : 1,
        }}
      >
        {/* Outer pulsing ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 36,
            height: 36,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1.5px solid rgba(30, 20, 10, 0.25)",
            animation: "gps-pulse 2s ease-out infinite",
          }}
        />
        {/* Second ring, offset in timing */}
        <div
          className="absolute rounded-full"
          style={{
            width: 36,
            height: 36,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1.5px solid rgba(30, 20, 10, 0.15)",
            animation: "gps-pulse 2s ease-out infinite 0.8s",
          }}
        />
        {/* Inner accuracy circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: 16,
            height: 16,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(30, 20, 10, 0.08)",
            border: "1px solid rgba(30, 20, 10, 0.2)",
          }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(30, 20, 10, 0.7)",
          }}
        />
      </div>

      <style>{`
        @keyframes gps-pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
      `}</style>

    </section>


  );
} 