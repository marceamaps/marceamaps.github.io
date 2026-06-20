import { useParams, Link } from "react-router-dom";
import MobileRecordCaseStudy from "./MobileRecordCaseStudy";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "mobile-record") {
    return <MobileRecordCaseStudy />;
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
