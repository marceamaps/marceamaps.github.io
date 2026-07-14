import { useEffect, useState } from "react";

export default function CursorDot() {
  const [pos, setPos]         = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  // Hide the native cursor everywhere on the site
  useEffect(() => {
    const style = document.createElement("style");
    style.id    = "cursor-none-global";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);
    return () => { document.getElementById("cursor-none-global")?.remove(); };
  }, []);

  useEffect(() => {
    const onMove  = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left:      pos.x,
          top:       pos.y,
          transform: "translate(-50%, -50%)",
          opacity:   visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          style={{
            width:        8,
            height:       8,
            borderRadius: "50%",
            background:   "#2E6DB4",
            animation:    "dot-pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </>
  );
}
