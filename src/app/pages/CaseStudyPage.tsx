import { useParams, Link } from "react-router-dom";
import MobileRecordCaseStudy from "./MobileRecordCaseStudy";
import ADPCaseStudy from "./ADPCaseStudy";
import LiveSegmentsCaseStudy from "./LiveSegmentsCaseStudy";
import AppleWatchRedesignCaseStudy from "./AppleWatchRedesignCaseStudy";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "mobile-record") {
    return <MobileRecordCaseStudy />;
  }

  if (slug === "activity-details-page" || slug === "adp") {
    return <ADPCaseStudy />;
  }

  if (slug === "live-segments") {
    return <LiveSegmentsCaseStudy />;
  }

  if (slug === "apple-watch-redesign") {
    return <AppleWatchRedesignCaseStudy />;
  }

  return (
    <div className="min-h-screen bg-white px-8 py-24 max-w-5xl mx-auto">
      <Link
        to="/"
        className="text-xs tracking-[0.2em] text-black/35 font-medium uppercase hover:text-black transition-colors duration-200"
      >
        ← Back
      </Link>
      <p className="mt-16 text-black/30 text-sm">{slug}</p>
    </div>
  );
}
