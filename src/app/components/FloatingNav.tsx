import React, { useState, useEffect } from "react";

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 150);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const navClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-3";

  const handleContactClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    if (window.location.hash !== "#/") {
      window.location.hash = "#/";

      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${navClass}`}
    >
      <div className="bg-white/70 backdrop-blur-2xl border border-black/5 rounded-full px-14 py-5 flex items-center gap-14 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <a
          href="#/work"
          className="relative text-lg font-semibold tracking-[-0.01em] text-black/75 hover:text-black transition-all duration-200 whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full"
        >
          Work
        </a>

        <a
          href="#/"
          className="relative text-lg font-semibold tracking-[-0.01em] text-black/75 hover:text-black transition-all duration-200 whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full"
        >
          About
        </a>

        <button
          onClick={() => {
            const contactSection = document.getElementById("contact");

            if (contactSection) {
              contactSection.scrollIntoView({
                behavior: "smooth",
              });
            }
          }}
          className="text-lg font-semibold tracking-[-0.01em] text-black/80 hover:text-black hover:scale-[1.04] transition-all duration-200 whitespace-nowrap"
        >
          Contact
        </button>
        
      </div>
    </nav>
  );
}