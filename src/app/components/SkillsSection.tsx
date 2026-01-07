type SkillsSectionProps = {
  imageUrl: string;
};

export default function SkillsSection({ imageUrl }: SkillsSectionProps) {
  const skillCategories = [
    {
      title: "Design Craft",
      skills: [
        "Interaction Design",
        "High Fidelity UI & Craft",
        "Platform Native Design",
        "Map Interaction Design",
        "Cartography"
      ]
    },
    {
      title: "Strategy & Thinking",
      skills: [
        "Product Strategy",
        "Problem Framing",
        "System Thinking",
        "Prioritization",
        "Behavioral Psychology"
      ]
    },
    {
      title: "Leadership & Impact",
      skills: [
        "End-to-End Product Design",
        "Discovery",
        "Ownership",
        "Exec Communication",
        "Design Impact Measurement"
      ]
    }
  ];
  
  return (
    <section className="py-12 px-8 md:px-16 lg:px-24 bg-gray-50" id="skills">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Inter',sans-serif] text-xs tracking-widest mb-12 text-center">
          TOP SKILLS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="font-['Inter',sans-serif] text-xs tracking-widest mb-6 pb-2 border-b-2 border-black">
                {category.title.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="font-['Playfair_Display',serif] text-xl leading-relaxed"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}