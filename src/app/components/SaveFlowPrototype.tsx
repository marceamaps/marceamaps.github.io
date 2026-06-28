import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import watchBezel from "../../assets/watch-bezel-46mm.png";

const STRAVA = "#FC5200";
const AMBER  = "#E8640A";

// ── Bezel dimensions (matches watch-bezel-46mm.png) ───────────────────────────
const BEZEL_W = 280;
const BEZEL_H = 440;
const SCREEN_LEFT = 36;
const SCREEN_TOP  = 96;
const SCALE = 0.75;

// Screen area inside the bezel
const SW = 208;  // screen width
const SH = 248;  // screen height

// Ring geometry — ring is centered within a square SVG of width SW
const CX  = SW / 2;          // 104
const CY  = SW / 2;          // 104
const R   = 62;
const RSW = 5;
const C   = 2 * Math.PI * R; // ≈ 389.6

// Strava echelon — two-chevron mark from brand SVG (viewBox "0 0 51 71")
const EPATH_TOP = "M20.4539 24.0442L28.7536 40.3638H40.9233L20.4539 0L0 40.3638H12.1853L20.4539 24.0442Z";
const EPATH_BOT = "M34.9693 52.5667L28.8766 40.4125L19.7998 40.428L34.9693 70.4871L50.1232 40.4125H41.0464L34.9693 52.5667Z";

type Phase = "pre-save" | "saving" | "saved" | "failed";

// Exact X/cancel icon path from Figma (viewBox "0 0 11.7684 11.7683")
const CANCEL_PATH =
  "M0 0.883883L0.883883 0L5.88422 5.00033L10.8846 0L11.7684 0.883883" +
  "L6.7681 5.88421L11.7683 10.8844L10.8844 11.7683L5.88422 6.7681" +
  "L0.88406 11.7683L0.000176586 10.8844L5.00034 5.88421L0 0.883883Z";

// ── Pre-save screen ───────────────────────────────────────────────────────────
function PreSaveScreen({ onSave }: { onSave: () => void }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%", height: "100%",
        background: "#0E0D13",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ── Scrollable stats content ─────────────────────────────────── */}
      {/* Starts below the nav bar; Save button floats over the bottom   */}
      <div
        style={{
          position: "absolute", inset: 0,
          paddingTop: 54,   // clear nav bar
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "6px 15px 0",
            display: "flex", flexDirection: "column",
            gap: 14,   // Figma: space/sm = 16px, scaled ×0.875
          }}
        >
          {[
            { label: "AVG PACE",       value: "8:20", unit: "/mi"  },
            { label: "DISTANCE",       value: "6.2",  unit: "mi"   },
            { label: "AVG HEART RATE", value: "148",  unit: "BPM"  },
          ].map(({ label, value, unit }) => (
            <div key={label} style={{ flexShrink: 0 }}>
              {/* caption1 label */}
              <p
                style={{
                  fontSize: 11, lineHeight: "15px", fontWeight: 400,
                  opacity: 0.8, margin: "0 0 2px",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </p>
              {/* display2 value + unit */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                <span
                  style={{
                    fontSize: 34, fontWeight: 700,
                    lineHeight: "40px", letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: 14, fontWeight: 400, opacity: 0.75,
                    lineHeight: "20px", marginBottom: 3,
                  }}
                >
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation bar — floats over content ─────────────────────── */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 54,
          // Figma: bg-gradient-to-t from transparent → rgba(0,0,0,0.3) at top
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "15px 14px 0",
          zIndex: 10,
        }}
      >
        {/* Close button — frosted glass as per Figma spec */}
        {/* Layers: backdrop-blur(27px) + color-burn(#6c6c6c) + screen(#999) */}
        {/*         + soft-light(white 20%) + luminosity(#ccc 10%)            */}
        {/* Net result on dark bg ≈ semi-transparent mid-gray circle          */}
        <div
          aria-label="Close"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(27px)",
            WebkitBackdropFilter: "blur(27px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="10.3" height="10.3"
            viewBox="0 0 11.7684 11.7683"
            fill="none"
            aria-hidden
          >
            <path d={CANCEL_PATH} fill="white" />
          </svg>
        </div>

        {/* Time — SF Compact Medium style */}
        <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em" }}>
          10:09
        </span>
      </div>

      {/* ── Save button — floats at bottom with backdrop blur ─────────── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          backdropFilter: "blur(11px)",
          WebkitBackdropFilter: "blur(11px)",
          padding: "10px 10px 14px",
          zIndex: 10,
        }}
      >
        <motion.button
          onClick={onSave}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            width: "100%",
            background: STRAVA,
            border: "none",
            borderRadius: 100,
            padding: "10px 0",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
            display: "block",
            fontFamily: "inherit",
          }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
}

// ── Saving screen ─────────────────────────────────────────────────────────────
// Echelon springs in, track ring fades in around it. No arc fill — that belongs
// entirely to the saved screen so the ring animation only plays once.
function SavingScreen({ reduced }: { reduced: boolean }) {
  const r = reduced;

  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: "#000",
        position: "relative",
        color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Time */}
      <span style={{
        position: "absolute", top: 14, left: 0, right: 0,
        textAlign: "center",
        fontSize: 13, fontWeight: 500, opacity: 0.55, letterSpacing: "0.01em",
      }}>
        10:09
      </span>

      {/* Ring + echelon — static, centered */}
      <div
        style={{
          position: "absolute",
          top: RING_TOP + 12,
          left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: SW, height: SW }}>
          <svg
            width={SW} height={SW}
            viewBox={`0 0 ${SW} ${SW}`}
            style={{ position: "absolute" }}
            aria-hidden
          >
            {/* Track ring — fades in after echelon */}
            <motion.circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth={RSW}
              initial={r ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={r ? { duration: 0 } : { duration: 0.35, delay: 0.2 }}
            />
          </svg>

          {/* Echelon — appears first */}
          <motion.div
            initial={r ? undefined : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={r ? { duration: 0 } : { duration: 0.35, type: "spring", stiffness: 380, damping: 22 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1,
            }}
          >
            <svg width={44} height={62} viewBox="0 0 51 71" fill="none" aria-hidden>
              <path d={EPATH_TOP} fill={STRAVA} />
              <path d={EPATH_BOT} fill={STRAVA} />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Saved screen ──────────────────────────────────────────────────────────────
// Ring fill duration (seconds). Text reveals after this completes.
const CIRCLE_DURATION = 1.4;
// SVG top offset that vertically centers the ring in the screen
const RING_TOP = Math.round(SH / 2 - CY); // 124 - 104 = 20

function SavedScreen({ reduced }: { reduced: boolean }) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (reduced) { setTextVisible(true); return; }
    const t = setTimeout(() => setTextVisible(true), CIRCLE_DURATION * 1000);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: "#000",
        position: "relative",
        color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Time */}
      <span style={{
        position: "absolute", top: 14, left: 0, right: 0,
        textAlign: "center",
        fontSize: 13, fontWeight: 500, opacity: 0.55, letterSpacing: "0.01em",
      }}>
        10:09
      </span>

      {/* Ring + echelon — centered, shifts up when text appears */}
      <motion.div
        animate={{ y: textVisible ? -18 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "absolute",
          top: RING_TOP + 12,
          left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: SW, height: SW }}>
          <svg
            width={SW} height={SW}
            viewBox={`0 0 ${SW} ${SW}`}
            style={{ position: "absolute" }}
            aria-hidden
          >
            {/* Track */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={RSW} />
            {/* Full ring draws in once — ease-in: slow start, accelerates to finish */}
            <g transform={`rotate(-90, ${CX}, ${CY})`}>
              <motion.circle
                cx={CX} cy={CY} r={R}
                fill="none"
                stroke={STRAVA}
                strokeWidth={RSW}
                strokeLinecap="round"
                strokeDasharray={C}
                initial={reduced ? undefined : { strokeDashoffset: C }}
                animate={{ strokeDashoffset: 0 }}
                transition={reduced ? { duration: 0 } : { duration: CIRCLE_DURATION, ease: [0.5, 0, 0.95, 1] }}
              />
            </g>
          </svg>

          {/* Echelon — pops in at the halfway point of the ring fill */}
          <motion.div
            initial={reduced ? undefined : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: CIRCLE_DURATION * 0.5, duration: 0.35, type: "spring", stiffness: 380, damping: 22 }
            }
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1,
            }}
          >
            <svg width={44} height={62} viewBox="0 0 51 71" fill="none" aria-hidden>
              <path d={EPATH_TOP} fill={STRAVA} />
              <path d={EPATH_BOT} fill={STRAVA} />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Label — floats up from bottom after ring completes */}
      <AnimatePresence>
        {textVisible && (
          <motion.span
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute",
              bottom: 24, left: 0, right: 0,
              textAlign: "center",
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
            }}
          >
            Activity saved
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Failed screen ─────────────────────────────────────────────────────────────
function FailedScreen() {
  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Time */}
      <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.55, marginTop: 14, letterSpacing: "0.01em" }}>
        10:09
      </span>

      {/* Error copy */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 22px" }}>
        <p
          style={{
            fontSize: 13, lineHeight: 1.5, textAlign: "center",
            margin: 0, opacity: 0.85, letterSpacing: "-0.005em",
          }}
        >
          Activity couldn't sync to Strava. Check connection or try again later.
        </p>
      </div>

      {/* Retry button */}
      <div style={{ padding: "0 10px 14px", width: "100%", boxSizing: "border-box" }}>
        <div
          style={{
            background: STRAVA, borderRadius: 100,
            padding: "10px 0", textAlign: "center",
            color: "white", fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
          }}
        >
          Retry
        </div>
      </div>
    </div>
  );
}

// ── Watch hardware (PNG bezel overlay) ────────────────────────────────────────
function WatchHardware({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: BEZEL_W * SCALE,
      height: BEZEL_H * SCALE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: BEZEL_W,
        height: BEZEL_H,
        transform: `scale(${SCALE})`,
        transformOrigin: "center center",
        flexShrink: 0,
        position: "relative",
      }}>
        {/* Screen content */}
        <div style={{
          position: "absolute",
          left: SCREEN_LEFT,
          top: SCREEN_TOP,
          width: SW,
          height: SH,
          background: "#000",
          borderRadius: 40,
          overflow: "hidden",
        }}>
          {children}
        </div>
        {/* Bezel overlay */}
        <img
          src={watchBezel}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Control button ────────────────────────────────────────────────────────────
function CtrlBtn({
  onClick,
  accent,
  children,
}: {
  onClick: () => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.11em",
        textTransform: "uppercase",
        color:      accent ? AMBER : "rgba(0,0,0,0.4)",
        background: accent ? "rgba(232,100,10,0.07)" : "rgba(0,0,0,0.05)",
        border: `1px solid ${accent ? "rgba(232,100,10,0.2)" : "rgba(0,0,0,0.09)"}`,
        borderRadius: 999, padding: "7px 14px", cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SaveFlowPrototype() {
  const [phase, setPhase] = useState<Phase>("pre-save");
  const reduced = useReducedMotion();
  const r = !!reduced;

  // Track previous phase so we can skip the fade-in on saving → saved
  const prevPhaseRef = useRef<Phase>("pre-save");
  const goToPhase = useCallback((next: Phase) => {
    setPhase(curr => {
      prevPhaseRef.current = curr;
      return next;
    });
  }, []);


  const reset = () => goToPhase("pre-save");

  // When coming from saving, the outer wrapper starts fully visible so the
  // echelon/ring appear continuous; the inner SavedScreen animations still play.
  const seamless = !r && prevPhaseRef.current === "saving" && phase === "saved";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <WatchHardware>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={r ? undefined : { opacity: seamless ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={r ? undefined : { opacity: 0, transition: { duration: 0 } }}
            transition={r ? { duration: 0 } : { duration: 0.22 }}
            style={{ position: "absolute", inset: 0 }}
          >
            {phase === "pre-save" && <PreSaveScreen onSave={() => goToPhase("saved")} />}
            {phase === "saving"   && <SavingScreen  reduced={r} />}
            {phase === "saved"    && <SavedScreen   reduced={r} />}
            {phase === "failed"   && <FailedScreen />}
          </motion.div>
        </AnimatePresence>
      </WatchHardware>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={r ? undefined : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={r ? undefined : { opacity: 0, y: -3 }}
          transition={r ? { duration: 0 } : { duration: 0.18 }}
          style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.32)",
            margin: 0, textAlign: "center",
          }}
        >
          {phase === "pre-save" && "Tap Save to animate"}
          {phase === "saving"   && ""}
          {phase === "saved"    && ""}
          {phase === "failed"   && "Sync failed"}
        </motion.p>
      </AnimatePresence>

      {/* Post-save controls */}
      <AnimatePresence>
        {(phase === "saved" || phase === "failed") && (
          <motion.div
            initial={r ? undefined : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={r ? undefined : { opacity: 0 }}
            transition={r ? { duration: 0 } : { duration: 0.2, delay: 0.1 }}
            style={{ display: "flex", gap: 10 }}
          >
            <CtrlBtn onClick={reset}>↺ Reset</CtrlBtn>
            {phase === "saved" && (
              <CtrlBtn onClick={() => goToPhase("failed")} accent>
                Show failure state
              </CtrlBtn>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
