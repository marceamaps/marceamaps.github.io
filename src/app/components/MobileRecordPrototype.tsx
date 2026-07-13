import { useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Minimize2 } from "lucide-react";
import recordingIsland from "../../assets/mobile-record/recording.png";
import recordingFullscreen from "../../assets/mobile-record/recording-fullscreen.png";
import { FONT_DISPLAY_NUMERIC, FONT_BODY } from "./caseStudyKit";

type View = "island" | "fullscreen";

// iOS-style ease
const EASE = [0.32, 0.72, 0, 1] as const;
const DURATION = 0.55;

// Stats are positioned at SCREEN level (% of the 375×812 design canvas).
//
// Island positions are derived by projecting Figma card-relative coords onto the screen:
//   Card on screen: left=4.3%, top=66%, width=91.5%, height=16.6%
//   stat_screen_left = 4.3  + (figma_left  / 343) × 91.5
//   stat_screen_top  = 66   + (figma_top   / 135) × 16.6
//     Time     figma(16, 68)  → screen(8.57%, 74.36%)
//     Pace     figma(116, 46) → screen(35.24%, 71.66%)
//     Distance figma(227, 68) → screen(64.85%, 74.36%)
//
// Fullscreen positions from Figma node 351-94814 — full-width, centered:
//   Time: top≈7%, font=44px  |  Pace: top≈28%, font=160px  |  Distance: top≈65%, font=72px

const STATS = [
  {
    id: "time",
    label: "Time",
    value: "22:45",
    island:     { left: "8.57%",  top: "74.36%", width: "29%",  numSize: 21,  lblSize: 8  },
    fullscreen: { left: "0%",     top: "7%",      width: "100%", numSize: 44,  lblSize: 12 },
  },
  {
    id: "pace",
    label: "Avg split / km",
    value: "4:10",
    island:     { left: "35.24%", top: "72.5%",  width: "32%",  numSize: 34,  lblSize: 8  },
    fullscreen: { left: "0%",     top: "26%",     width: "100%", numSize: 148, lblSize: 13 },
  },
  {
    id: "distance",
    label: "Distance km",
    value: "4.45",
    island:     { left: "64.85%", top: "74.36%", width: "29%",  numSize: 21,  lblSize: 8  },
    fullscreen: { left: "0%",     top: "64%",     width: "100%", numSize: 80,  lblSize: 12 },
  },
] as const;

const VAL_FONT = FONT_DISPLAY_NUMERIC;
const LBL_FONT = FONT_BODY;

export default function MobileRecordPrototype() {
  const [view, setView] = useState<View>("island");
  const isIsland = view === "island";

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Toggle */}
      <div className="flex items-center bg-black/[0.06] rounded-full p-1">
        {(["island", "fullscreen"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
              view === v ? "text-black" : "text-black/40 hover:text-black/60"
            }`}
          >
            {view === v && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{v}</span>
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="relative flex-shrink-0" style={{ width: 300 }}>
        <div
          className="relative rounded-[44px] overflow-hidden"
          style={{
            background: "#111",
            padding: "10px 5px",
            boxShadow:
              "0 0 0 1px #2a2a2a, inset 0 0 0 1px #3a3a3a, 0 24px 64px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Side buttons */}
          <div className="absolute rounded-full bg-[#222] border border-[#333]" style={{ right: -3, top: 120, width: 3, height: 56 }} />
          <div className="absolute rounded-full bg-[#222] border border-[#333]" style={{ left: -3, top: 96, width: 3, height: 40 }} />
          <div className="absolute rounded-full bg-[#222] border border-[#333]" style={{ left: -3, top: 148, width: 3, height: 40 }} />

          {/* Screen — white bg prevents dark flash when card shrinks away from map */}
          <div
            className="relative rounded-[36px] overflow-hidden"
            style={{ aspectRatio: "375/812", background: "white" }}
          >
            {/*
             * Layer 1 — map screenshot (z=1)
             * Fades out immediately on expand. Fades back in near the end of
             * collapse (mirrored: map leaves at start, returns at end).
             */}
            <motion.img
              src={recordingIsland}
              alt="Map with recording island card"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1 }}
              animate={{ opacity: isIsland ? 1 : 0 }}
              transition={{
                duration: 0.35,
                delay: isIsland ? DURATION - 0.35 : 0,
                ease: "easeInOut",
              }}
            />

            {/*
             * Layer 2 — white card (z=2)
             * Island: floating pill at 66% from top, 91.5% wide, all-rounded corners.
             * Fullscreen: covers entire screen.
             * Stats are NOT children of this card — they live at screen level (z=3)
             * so they follow direct paths and avoid compound motion during collapse.
             */}
            <motion.div
              className="absolute bg-white overflow-hidden"
              style={{ zIndex: 2 }}
              initial={false}
              animate={
                isIsland
                  ? {
                      left: "4.3%",
                      top: "66%",
                      width: "91.5%",
                      height: "16.6%",
                      borderRadius: 22,
                      boxShadow: "0 6px 28px rgba(0,0,0,0.22), 0 1px 6px rgba(0,0,0,0.10)",
                    }
                  : {
                      left: "0%",
                      top: "0%",
                      width: "100%",
                      height: "90%",
                      borderRadius: 0,
                      boxShadow: "0 0px 0px rgba(0,0,0,0.00), 0 0px 0px rgba(0,0,0,0.00)",
                    }
              }
              transition={{ duration: DURATION, ease: EASE }}
            >
              {/* Island header: "Run" + expand icon */}
              <motion.div
                className="absolute left-0 right-0 top-0 flex items-center justify-center"
                style={{ padding: "9px 13px 0" }}
                animate={{ opacity: isIsland ? 1 : 0 }}
                transition={{
                  duration: 0.16,
                  delay: isIsland ? DURATION * 0.55 : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: LBL_FONT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.38)",
                  }}
                >
                  Run
                </span>
                <div style={{ position: "absolute", right: 13 }}>
                  <Maximize2 size={12} color="rgba(0,0,0,0.38)" strokeWidth={2} />
                </div>
              </motion.div>

              {/* Fullscreen collapse button */}
              <motion.div
                className="absolute right-0 top-0 flex items-center"
                style={{ padding: "20px 24px 0" }}
                animate={{ opacity: isIsland ? 0 : 1 }}
                transition={{
                  duration: 0.16,
                  delay: isIsland ? 0 : DURATION * 0.7,
                }}
              >
                <Minimize2 size={14} color="rgba(0,0,0,0.38)" strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/*
             * Layer 3 — stats (z=3), screen-level absolute positioning.
             * By living outside the card they animate on direct straight-line
             * paths between island and fullscreen positions — no compound motion.
             */}
            {STATS.map((stat) => {
              const pos = isIsland ? stat.island : stat.fullscreen;
              return (
                <motion.div
                  key={stat.id}
                  className="absolute flex flex-col"
                  style={{ zIndex: 3 }}
                  initial={false}
                  animate={{ left: pos.left, top: pos.top, width: pos.width }}
                  transition={{ duration: DURATION, ease: EASE }}
                >
                  <span
                    style={{
                      fontFamily: VAL_FONT,
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      lineHeight: 0.9,
                      color: "#1A1A1A",
                      display: "block",
                      textAlign: "center",
                      fontSize: pos.numSize,
                      transition: `font-size ${DURATION}s cubic-bezier(${EASE.join(",")})`,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: LBL_FONT,
                      fontWeight: 700,
                      color: "#63605A",
                      marginTop: 2,
                      lineHeight: 1.2,
                      display: "block",
                      textAlign: "center",
                      fontSize: pos.lblSize,
                      opacity: stat.id === "time" ? (isIsland ? 1 : 0) : 1,
                      transition: `font-size ${DURATION}s cubic-bezier(${EASE.join(",")}), opacity ${DURATION}s cubic-bezier(${EASE.join(",")})`,
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}

            {/*
             * Layer 4 — flyout controls strip (Pause/Lap), z=4.
             * Always visible above the white card in both island and fullscreen.
             * Crops the bottom ~17.4% of the recording screenshot where the
             * flyout menu lives.
             */}
            <img
              src={recordingFullscreen}
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "16%",
                objectFit: "cover",
                objectPosition: "bottom",
                zIndex: 4,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <motion.p
        key={view}
        className="text-xs tracking-[0.15em] text-black/30 font-medium uppercase"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.25 }}
      >
        {isIsland ? "Map · Island View" : "Stats · Fullscreen View"}
      </motion.p>
    </div>
  );
}
