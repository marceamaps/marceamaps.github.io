// Shared icon components used by both Footer and ExperienceSection's
// "What's next" contact panel, so the Strava mark is defined once.

const EPATH_TOP = "M20.4539 24.0442L28.7536 40.3638H40.9233L20.4539 0L0 40.3638H12.1853L20.4539 24.0442Z";
const EPATH_BOT = "M34.9693 52.5667L28.8766 40.4125L19.7998 40.428L34.9693 70.4871L50.1232 40.4125H41.0464L34.9693 52.5667Z";

export function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 51 71" fill="currentColor" className={className} aria-hidden>
      <path d={EPATH_TOP} />
      <path d={EPATH_BOT} />
    </svg>
  );
}
