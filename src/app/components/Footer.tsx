// The actual contact CTA now lives in ExperienceSection's "What's next"
// step (the #contact anchor lives there too) — this is just the closing
// line for the page.
export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] px-8 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-xs text-black/25 font-medium">
          © 2026 Marcea Ennamorato
        </span>
      </div>
    </footer>
  );
}
