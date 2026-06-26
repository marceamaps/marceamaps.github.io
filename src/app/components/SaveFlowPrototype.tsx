import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const STRAVA = "#FC5200";
const AMBER  = "#E8640A";

// ── Dimensions ────────────────────────────────────────────────────────────────
const FW = 200;   // frame outer width
const FH = 244;   // frame outer height  (200:244 ≈ 208:248 Figma ratio)
const FR = 50;    // frame corner radius
const BZ = 9;     // bezel inset
const SW = FW - BZ * 2;  // screen width  = 182
const SH = FH - BZ * 2;  // screen height = 226

// Ring geometry — ring is centered within a square SVG of width SW
const CX  = SW / 2;          // 91
const CY  = SW / 2;          // 91 (square SVG so CY = CX)
const R   = 54;
const RSW = 5;
const C   = 2 * Math.PI * R; // ≈ 339

// Strava echelon path (viewBox "0 0 50 70")
// Two overlapping chevrons: outer hexagon-diamond + inner triangular cutout
const EPATH = "M25 2 L48 35 L38 35 L25 65 L12 35 L2 35 Z  M25 17 L14 35 L36 35 Z";

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
function SavingScreen({ reduced }: { reduced: boolean }) {
  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Time */}
      <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.55, marginTop: 14, letterSpacing: "0.01em" }}>
        10:09
      </span>

      {/* Ring + echelon */}
      <div
        style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "center", position: "relative", width: "100%",
        }}
      >
        <svg
          width={SW} height={SW}
          viewBox={`0 0 ${SW} ${SW}`}
          style={{ position: "absolute" }}
          aria-hidden
        >
          {/* Track ring */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth={RSW}
          />
          {/* Spinning arc */}
          <motion.g
            animate={reduced ? undefined : { rotate: [0, 360] }}
            transition={reduced ? undefined : { duration: 1.25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={STRAVA}
              strokeWidth={RSW}
              strokeLinecap="round"
              strokeDasharray={`${C * 0.22} ${C * 0.78}`}
            />
          </motion.g>
        </svg>

        {/* Echelon centered */}
        <svg
          width={44} height={62}
          viewBox="0 0 50 70"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
          aria-hidden
        >
          <path fillRule="evenodd" d={EPATH} fill={STRAVA} />
        </svg>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 15, fontWeight: 700, marginBottom: 20,
          letterSpacing: "-0.01em",
        }}
      >
        Saving activity...
      </span>
    </div>
  );
}

// ── Saved screen ──────────────────────────────────────────────────────────────
function SavedScreen({ reduced }: { reduced: boolean }) {
  return (
    <div
      style={{
        width: "100%", height: "100%",
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Time */}
      <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.55, marginTop: 14, letterSpacing: "0.01em" }}>
        10:09
      </span>

      {/* Ring + echelon */}
      <div
        style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "center", position: "relative", width: "100%",
        }}
      >
        <svg
          width={SW} height={SW}
          viewBox={`0 0 ${SW} ${SW}`}
          style={{ position: "absolute" }}
          aria-hidden
        >
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth={RSW}
          />
          {/* Full ring draws in — rotated so it starts from 12 o'clock */}
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
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }
              }
            />
          </g>
        </svg>

        {/* Echelon — pops in */}
        <motion.div
          initial={reduced ? undefined : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : { delay: 0.3, duration: 0.35, type: "spring", stiffness: 380, damping: 22 }
          }
          style={{ position: "relative", zIndex: 1 }}
        >
          <svg width={44} height={62} viewBox="0 0 50 70" fill="none" aria-hidden>
            <path fillRule="evenodd" d={EPATH} fill={STRAVA} />
          </svg>
        </motion.div>
      </div>

      {/* Label */}
      <motion.span
        initial={reduced ? undefined : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 0.5, duration: 0.3 }}
        style={{
          fontSize: 15, fontWeight: 700, marginBottom: 20,
          letterSpacing: "-0.01em",
        }}
      >
        Activity saved
      </motion.span>
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

// ── Watch hardware (case + bands) ─────────────────────────────────────────────
function WatchHardware({ children }: { children: React.ReactNode }) {
  const bandW = Math.round(FW * 0.74);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      {/* Top band */}
      <div
        aria-hidden
        style={{
          width: bandW, height: 42,
          background: "linear-gradient(to bottom, #404044 0%, #4A4A4E 100%)",
          borderRadius: "8px 8px 3px 3px",
        }}
      />

      {/* Case */}
      <div
        style={{
          width: FW, height: FH,
          background: "linear-gradient(150deg, #2E2E32 0%, #1C1C1E 65%)",
          borderRadius: FR,
          padding: BZ,
          boxShadow:
            "0 0 0 0.5px rgba(255,255,255,0.07), " +
            "0 2px 0 0 rgba(255,255,255,0.04) inset, " +
            "0 20px 60px rgba(0,0,0,0.55), " +
            "0 4px 16px rgba(0,0,0,0.45)",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Digital crown */}
        <div
          aria-hidden
          style={{
            position: "absolute", right: -4, top: "27%",
            width: 5, height: 26,
            background: "linear-gradient(to right, #3A3A3E, #2A2A2C)",
            borderRadius: 3,
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.1)",
          }}
        />
        {/* Side button */}
        <div
          aria-hidden
          style={{
            position: "absolute", right: -4, top: "51%",
            width: 5, height: 17,
            background: "linear-gradient(to right, #3A3A3E, #2A2A2C)",
            borderRadius: 3,
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.1)",
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: "100%", height: "100%",
            background: "#000",
            borderRadius: FR - BZ + 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom band */}
      <div
        aria-hidden
        style={{
          width: bandW, height: 42,
          background: "linear-gradient(to top, #404044 0%, #4A4A4E 100%)",
          borderRadius: "3px 3px 8px 8px",
        }}
      />
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

  // Auto-advance saving → saved after ~2.8 s
  useEffect(() => {
    if (phase !== "saving") return;
    const t = setTimeout(() => setPhase("saved"), 2800);
    return () => clearTimeout(t);
  }, [phase]);

  const reset = () => setPhase("pre-save");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <WatchHardware>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={r ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={r ? undefined : { opacity: 0 }}
            transition={r ? { duration: 0 } : { duration: 0.22 }}
            style={{ position: "absolute", inset: 0 }}
          >
            {phase === "pre-save" && <PreSaveScreen onSave={() => setPhase("saving")} />}
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
          {phase === "saving"   && "Saving…"}
          {phase === "saved"    && "Activity saved"}
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
              <CtrlBtn onClick={() => setPhase("failed")} accent>
                Show failure state
              </CtrlBtn>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
