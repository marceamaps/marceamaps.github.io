export default function Footer() {
  return (
    <footer className="bg-black text-white min-h-screen flex items-center justify-center" id="contact">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display',serif] font-bold text-5xl md:text-6xl mb-8">
            Want to talk?
          </h2>
          <p className="font-['Inter',sans-serif] text-base tracking-wider mb-12 max-w-2xl mx-auto">
            I'd love to connect.
          </p>
          
          <button className="bg-white text-black font-['Inter',sans-serif] text-xs tracking-widest px-12 py-6 hover:bg-gray-200 transition-colors">
            Get in touch
          </button>
        </div>
        
        <div className="border-t border-white/20 pt-12 mt-16 text-center">
          <p className="font-['Inter',sans-serif] text-xs tracking-wider">
            © 2024 MARCEA ENNAMORATO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}