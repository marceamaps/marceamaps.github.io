import profileImg from "figma:asset/24fedb2b3998753e946e7f10593e566b892c0733.png";

export default function AboutSection() {
  return (
    <section className="py-12 px-8 md:px-16 lg:px-24" id="about">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Playfair_Display',serif] font-bold italic text-5xl mb-8">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 font-['Playfair_Display',serif] text-base leading-relaxed">
            <p>
              I'm a product designer who focuses on building clear, focused experiences that scale for the future. With 8+ years of experience across startups and established products, I've worked on everything from foundational UX and design systems to high-impact features used by millions of people.
            </p>
            
            <p>
              My work sits at the intersection of strategy, craft, and execution. I think about the big picture and the tiny details, leaving no stone unturned. I care deeply about understanding the problem behind the problem—and I don't stop until I've found it. My goal is to ship work that feels obvious in hindsight and meaningfully impacts key business goals. I believe the best design supports people in moments that matter—the moments that happen in real life, off the screen.
            </p>
            
            <p>
              Most recently, I've been designing experiences across web, mobile, and wearables at Strava, where I focus on helping athletes better record their activities through mapping, live recording, and post-activity storytelling.
            </p>
            
            <p>
              Outside of work, I enjoy breaking down products I admire through lived experiences, experimenting with new interaction patterns across both digital and physical spaces, exploring my own psychology through hobbies, and cooking pasta al dente, of course.
            </p>
          </div>
          
          <div>
            <img 
              src={profileImg} 
              alt="Profile"
              className="w-full max-w-xs h-auto object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}