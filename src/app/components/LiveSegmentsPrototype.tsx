import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import prBadge from "../../assets/pr-badge.svg";
import avatarImg from "../../assets/avatar.png";

const STRAVA = "#FC5200";

// ── Marquee text (scrolls left with fade-in/out on both edges) ─────────────
function MarqueeText({ text, color }: { text: string; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLSpanElement>(null);
  const [scrollPx, setScrollPx] = useState(0);

  // Measure after paint so scrollWidth is accurate
  useLayoutEffect(() => {
    const c = containerRef.current;
    const t = textRef.current;
    if (!c || !t) return;
    setScrollPx(Math.max(0, t.scrollWidth - c.offsetWidth));
  }, [text]);

  const hasScroll = scrollPx > 0;
  // Scale scroll duration with distance: 50 px/s feels natural
  const scrollDur  = Math.max(1.2, scrollPx / 50);
  const pauseEnd   = 1.2;
  const pauseStart = 1.0;
  const total      = scrollDur + pauseEnd + scrollDur + pauseStart;
  const t1 = scrollDur / total;
  const t2 = (scrollDur + pauseEnd) / total;
  const t3 = (scrollDur * 2 + pauseEnd) / total;

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        // Both edges when scrolling; left edge only when static (text overflows left)
        WebkitMaskImage: hasScroll
          ? "linear-gradient(to right, transparent 0%, black 14%, black 84%, transparent 100%)"
          : "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
        maskImage: hasScroll
          ? "linear-gradient(to right, transparent 0%, black 14%, black 84%, transparent 100%)"
          : "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
      }}
    >
      <motion.span
        key={text}                   // reset animation when text changes
        ref={textRef}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize: 12, fontWeight: 700, lineHeight: 1.2,
          fontFamily: "'Cabin', sans-serif",
          color,
          transition: "color 0.4s ease",
        }}
        animate={hasScroll ? { x: [0, scrollPx, scrollPx, 0, 0] } : { x: 0 }}
        transition={hasScroll ? {
          duration: total,
          times: [0, t1, t2, t3, 1],
          ease: "easeInOut",
          repeat: Infinity,
        } : {}}
      >
        {text}
      </motion.span>
    </div>
  );
}
const MAX_DIST = 0.8;

// ── Watch geometry (Figma spec: 208×248, nav=62) ───────────────────────────
const W = 208;
const H = 248;
const NAV = 62;
const CONTENT_H = H - NAV; // 186

// Horseshoe arc — matches Figma SVG exactly.
// Gap is at the TOP, tilted clockwise: opening from 270° (12 o'clock) to 320° (~1 o'clock).
// Arc runs CLOCKWISE from 320° → right → bottom → left → 270° = 310° of arc.
// Unwinding (dashoffset) removes from the 320° tail first → counter-clockwise visual retreat.
const CX = W / 2;  // 104
const CY = 95;     // centre within content-area SVG
const R  = 70;

const toRad = (d: number) => (d * Math.PI) / 180;
// Start: 320° (top-right, dark end of gradient)
const sx = CX + R * Math.cos(toRad(320));
const sy = CY + R * Math.sin(toRad(320));
// End: 270° (12 o'clock, bright/white end of gradient)
const ex = CX;
const ey = CY - R;

// Clockwise (sweep=1), large arc (flag=1) — 310° through right→bottom→left→top
const ARC_D   = `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${R} ${R} 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
const ARC_LEN = (310 / 360) * 2 * Math.PI * R; // ≈ 377 px

// ── Simulation hook ────────────────────────────────────────────────────────
type Phase = "approaching" | "go" | "competing" | "moving-away";

function useLiveSegSim() {
  const [dist, setDist]               = useState(MAX_DIST);
  const [phase, setPhase]             = useState<Phase>("approaching");
  const [segProgress, setSegProgress] = useState(0);
  const iv  = useRef<ReturnType<typeof setInterval>  | null>(null);
  const tid = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (iv.current)  { clearInterval(iv.current);  iv.current  = null; }
    if (tid.current) { clearTimeout(tid.current);  tid.current = null; }
  };

  const resetRef          = useRef<() => void>();
  const startCompetingRef = useRef<() => void>();

  const reset = useCallback(() => {
    clear();
    setDist(MAX_DIST);
    setPhase("approaching");
    setSegProgress(0);
    iv.current = setInterval(() => {
      setDist(d => {
        const next = parseFloat((d - 0.01).toFixed(3));
        if (next <= 0) {
          clearInterval(iv.current!); iv.current = null;
          setPhase("go");
          tid.current = setTimeout(() => startCompetingRef.current?.(), 2000);
          return 0;
        }
        return next;
      });
    }, 80);
  }, []);

  const startCompeting = useCallback(() => {
    clear();
    setSegProgress(0);
    setPhase("competing");
    iv.current = setInterval(() => {
      setSegProgress(p => {
        const next = parseFloat((p + 0.008).toFixed(3));
        if (next >= 1) {
          clearInterval(iv.current!); iv.current = null;
          tid.current = setTimeout(() => resetRef.current?.(), 2500);
          return 1;
        }
        return next;
      });
    }, 80);
  }, []);

  resetRef.current          = reset;
  startCompetingRef.current = startCompeting;

  const movingAway = useCallback(() => {
    clear();
    setPhase("moving-away");
    iv.current = setInterval(() => {
      setDist(d => Math.min(MAX_DIST, parseFloat((d + 0.006).toFixed(3))));
    }, 80);
    tid.current = setTimeout(() => resetRef.current?.(), 3500);
  }, []);

  useEffect(() => {
    reset();
    return clear;
  }, [reset]);

  return { dist, phase, segProgress, reset, movingAway };
}

const AHEAD_GREEN = "#70CF25";
const BEHIND_RED  = "#E53535";

// ── Watch screen ───────────────────────────────────────────────────────────
function WatchScreen({ dist, phase, segProgress, isBehind }: {
  dist: number; phase: Phase; segProgress: number; isBehind: boolean;
}) {
  const progress      = Math.max(0, Math.min(1, dist / MAX_DIST));
  const dashOffset    = (1 - progress) * ARC_LEN;
  const isGo          = phase === "go";
  const isAway        = phase === "moving-away";
  const isCompeting   = phase === "competing";
  // ahead: grows 0→5s with progress; behind: fixed 3s (representative demo)
  const timeDelta     = isBehind ? 3 : Math.round(segProgress * 5);
  const raceColor     = isBehind ? BEHIND_RED : AHEAD_GREEN;
  // Avatar tip: angle sweeps clockwise from 320° to 270° as segProgress 0→1
  const avatarAngle   = toRad(320 + segProgress * 310);
  const avatarCX      = CX + R * Math.cos(avatarAngle);
  const avatarCY      = CY + R * Math.sin(avatarAngle); // SVG-space y
  const compDashOffset = (1 - segProgress) * ARC_LEN;

  return (
    <div
      style={{
        width: W, height: H,
        borderRadius: 40,
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(160deg, #080808 0%, #100300 55%, #1c0700 100%)",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isCompeting
          ? `radial-gradient(ellipse 110% 55% at 50% 85%, ${isBehind ? "rgba(229,53,53,0.28)" : "rgba(112,207,37,0.22)"} 0%, transparent 70%)`
          : `radial-gradient(ellipse 110% 55% at 50% 85%, rgba(252,82,0,${isGo ? 0.32 : 0.08 + progress * 0.14}) 0%, transparent 70%)`,
        transition: "background 0.8s ease",
      }} />

      {/* Nav bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: NAV,
        padding: "17px 14px 0",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6,
      }}>
        {/* PR badge */}
        <img
          src={prBadge}
          alt="PR target goal"
          style={{ width: 36, height: 36, flexShrink: 0, filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.4))" }}
        />

        {/* Time + segment name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: 15, fontWeight: 500, color: "white", lineHeight: 1,
            fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
          }}>10:09</span>
          <MarqueeText
            text={
              isCompeting ? "Competing on Colton Rd" :
              isGo        ? "Starting Colton Rd" :
              isAway      ? "Moving away from Colton Rd" :
                            "Approaching Colton Rd"
            }
            color={isAway ? "rgba(255,255,255,0.45)" : "white"}
          />
        </div>
      </div>

      {/* Horseshoe SVG */}
      <svg
        width={W} height={CONTENT_H}
        viewBox={`0 0 ${W} ${CONTENT_H}`}
        style={{ position: "absolute", top: NAV, left: 0 }}
      >
        <defs>
          {/* Approaching gradient: black → dark red → orange → white, bottom→top */}
          {/* Gradient runs top→bottom (dark at arc ends near gap, bright at arc bottom).
              y=-100 puts 0% well above arc top (y=25), y=270 puts 100% below arc bottom (y=165).
              Result: 270° tip ≈ 34% (dark red), bottom ≈ 72% (bright orange) — matches Figma. */}
          <linearGradient id="lsGrad" x1={CX} y1={-100} x2={CX} y2={270} gradientUnits="userSpaceOnUse">
            <stop offset="0%"      stopColor="#000000" />
            <stop offset="35.3%"   stopColor="#4D0000" />
            <stop offset="69.3%"   stopColor="#FC5200" />
            <stop offset="100%"    stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
          <filter id="lsGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path
          d={ARC_D} fill="none"
          stroke={isCompeting ? "rgba(255,255,255,0.1)" : "rgba(252,82,0,0.12)"}
          strokeWidth={26} strokeLinecap="round"
        />

        {/* Approaching / moving-away arc */}
        {!isCompeting && (
          <motion.path
            d={ARC_D}
            fill="none"
            stroke="url(#lsGrad)"
            strokeWidth={26}
            strokeLinecap="round"
            filter="url(#lsGlow)"
            strokeDasharray={ARC_LEN}
            animate={{
              strokeDashoffset: dashOffset,
              opacity: isAway ? [1, 0.35, 1] : 1,
            }}
            transition={{
              strokeDashoffset: { duration: 0.22, ease: "easeOut" },
              opacity: isAway ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 },
            }}
          />
        )}

        {/* Competing LightWave — grows from 0 to full as segment progresses */}
        {isCompeting && (
          <motion.path
            d={ARC_D}
            fill="none"
            stroke={raceColor}
            strokeWidth={26}
            strokeLinecap="round"
            filter="url(#lsGlow)"
            strokeDasharray={ARC_LEN}
            animate={{ strokeDashoffset: compDashOffset }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        )}
      </svg>

      {/* Avatar — rides the tip of the LightWave during competing */}
      {isCompeting && (
        <div style={{
          position: "absolute",
          left: avatarCX - 14,
          top: NAV + avatarCY - 14,
          width: 28, height: 28,
          borderRadius: "50%",
          border: "2.5px solid white",
          boxShadow: "0 -3px 8px rgba(0,0,0,0.45), 0 2px 5px rgba(0,0,0,0.5)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          <img src={avatarImg} alt="athlete" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
      )}

      {/* Centre content */}
      <div style={{
        position: "absolute",
        top: NAV + CY,
        left: 0, right: 0,
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        pointerEvents: "none",
      }}>
        <AnimatePresence mode="wait">
          {isGo ? (
            <motion.span
              key="go"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              style={{
                fontSize: 52, fontWeight: 800, color: STRAVA,
                lineHeight: 1, letterSpacing: "0px",
                fontFamily: "'Barlow Semi Condensed', sans-serif",
                textShadow: "0 0 24px rgba(252,82,0,0.7)",
              }}
            >GO!</motion.span>

          ) : isCompeting ? (
            <motion.div
              key={`competing-${isBehind ? "behind" : "ahead"}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
            >
              {/* Ticker + stat value */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                {/* Directional ticker — up when ahead, down when behind */}
                <svg width="13" height="10" viewBox="0 0 13 10" style={{ marginBottom: isBehind ? 8 : 7, flexShrink: 0 }}>
                  {isBehind
                    ? <polygon points="0,0 13,0 6.5,10" fill={raceColor} />
                    : <polygon points="6.5,0 13,10 0,10"  fill={raceColor} />
                  }
                </svg>
                <span style={{
                  fontSize: 40, fontWeight: 800, lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                  color: raceColor,
                  fontFamily: "'Barlow Semi Condensed', sans-serif",
                  transition: "color 0.4s ease",
                }}>{timeDelta}s</span>
              </div>
              {/* ahead / behind label */}
              <span style={{
                fontSize: 16, fontWeight: 700, color: "white", lineHeight: 1,
                fontFamily: "'Cabin', sans-serif",
              }}>{isBehind ? "behind" : "ahead"}</span>
            </motion.div>

          ) : (
            <motion.div key="stat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <span style={{
                fontSize: 44, fontWeight: 800, lineHeight: 1,
                fontVariantNumeric: "tabular-nums", letterSpacing: "-0.5px",
                color: isAway ? "rgba(252,82,0,0.45)" : STRAVA,
                fontFamily: "'Barlow Semi Condensed', sans-serif",
                transition: "color 0.3s ease",
              }}>{dist.toFixed(2)}</span>
              <span style={{
                fontSize: 15, fontWeight: 700, color: "white", lineHeight: 1,
                fontFamily: "'Cabin', sans-serif",
              }}>
                {isAway ? "mi from start" : "mi to start"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right page control */}
      <div style={{
        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        {[true, false].map((a, i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: a ? "white" : "rgba(242,244,252,0.3)",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Watch shell (bezel) ────────────────────────────────────────────────────
function WatchShell({ dist, phase, segProgress, isBehind }: {
  dist: number; phase: Phase; segProgress: number; isBehind: boolean;
}) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Bezel */}
      <div style={{
        position: "absolute", top: -12, left: -12, right: -12, bottom: -24,
        borderRadius: 54,
        background: "linear-gradient(135deg, #2C2C2E 0%, #1A1A1C 40%, #242426 100%)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)",
      }} />
      {/* Band stubs */}
      {[{ top: -56, h: 52 }, { top: H + 12, h: 48 }].map(({ top, h }, i) => (
        <div key={i} style={{
          position: "absolute", left: 10, right: 10, top, height: h,
          background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)",
          borderRadius: i === 0 ? "8px 8px 0 0" : "0 0 8px 8px",
        }} />
      ))}
      {/* Crown */}
      <div style={{
        position: "absolute", right: -20, top: "42%",
        width: 8, height: 30, borderRadius: 4,
        background: "linear-gradient(90deg, #2C2C2E, #404042, #2C2C2E)",
        boxShadow: "2px 0 6px rgba(0,0,0,0.6)",
      }} />
      <WatchScreen dist={dist} phase={phase} segProgress={segProgress} isBehind={isBehind} />
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
const SCALE = 2.2;

export default function LiveSegmentsPrototype() {
  const { dist, phase, segProgress, reset, movingAway } = useLiveSegSim();
  const [isBehind, setIsBehind] = useState(false);
  const isAway      = phase === "moving-away";
  const isCompeting = phase === "competing";

  // Reset behind flag whenever we leave competing
  useEffect(() => {
    if (!isCompeting) setIsBehind(false);
  }, [isCompeting]);

  const handleReset = () => { setIsBehind(false); reset(); };

  const raceSeconds = isBehind ? 3 : Math.round(segProgress * 5);
  const stateLabel = phase === "go"
    ? "Segment start reached"
    : phase === "moving-away"
    ? "Moving away — horseshoe paused"
    : phase === "competing"
    ? `Competing · ${(segProgress * 100).toFixed(0)}% · ${isBehind ? `-${raceSeconds}s behind` : `+${raceSeconds}s ahead`}`
    : `Approaching · ${dist.toFixed(2)} mi to start`;

  const canMoveAway = !isAway && !isCompeting && phase !== "go";

  // First button: context-sensitive
  const firstBtn = isCompeting
    ? (isBehind
        ? { label: "Back ahead",        onClick: () => setIsBehind(false) }
        : { label: "Simulate behind PR", onClick: () => setIsBehind(true)  })
    : (isAway
        ? { label: "Resuming…",           onClick: undefined }
        : { label: "Simulate moving away", onClick: canMoveAway ? movingAway : undefined });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      {/* Scaled watch */}
      <div style={{
        width:  (W + 24) * SCALE,
        height: (H + 80) * SCALE,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ transform: `scale(${SCALE})`, transformOrigin: "center" }}>
          <WatchShell dist={dist} phase={phase} segProgress={segProgress} isBehind={isBehind} />
        </div>
      </div>

      {/* State label */}
      <p style={{
        fontSize: 13, fontWeight: 500, letterSpacing: "0.06em",
        color: isAway ? "rgba(255,255,255,0.4)"
             : isCompeting && isBehind  ? "rgba(229,53,53,0.75)"
             : isCompeting              ? "rgba(112,207,37,0.7)"
             : "rgba(255,255,255,0.55)",
        textTransform: "uppercase", textAlign: "center",
        transition: "color 0.3s",
        fontFamily: "system-ui, sans-serif",
      }}>{stateLabel}</p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { ...firstBtn, primary: false },
          { label: "Restart", onClick: handleReset, primary: true },
        ].map(({ label, onClick, primary }) => (
          <button
            key={label}
            onClick={onClick}
            disabled={!onClick}
            style={{
              padding: "9px 18px",
              borderRadius: 100,
              border: "1px solid",
              borderColor: primary ? STRAVA : "rgba(255,255,255,0.18)",
              background: primary ? STRAVA : "transparent",
              color: primary ? "white" : "rgba(255,255,255,0.65)",
              fontSize: 13, fontWeight: 600,
              cursor: onClick ? "pointer" : "default",
              opacity: onClick ? 1 : 0.45,
              transition: "opacity 0.2s",
              fontFamily: "system-ui, sans-serif",
            }}
          >{label}</button>
        ))}
      </div>
    </div>
  );
}
