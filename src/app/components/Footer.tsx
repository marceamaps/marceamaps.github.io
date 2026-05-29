import resumePdf from "../../assets/Marcea_Ennamorato_CV.pdf";

export default function Footer() {
  return (
    <footer
      className="bg-white text-black min-h-screen flex items-center"
      id="contact"
    >
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-24">
        <p className="text-2xl md:text-3xl text-black/60 mb-8">
          Get in touch
        </p>

        <a
          href="mailto:marcea.irene@gmail.com"
          className="block text-[42px] leading-[0.95] sm:text-5xl md:text-7xl font-bold tracking-tight mb-12 break-all hover:opacity-60 transition-opacity"
        >
          marcea.irene@gmail.com
        </a>

        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-6 text-lg md:text-xl">
            <a
              href={resumePdf}
              download
              className="underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Resume
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <p className="max-w-xl text-lg md:text-2xl leading-relaxed">
              I’m always happy to talk about product design, maps, climbing
              and best things to do when visiting Chamonix.
            </p>

            <p className="text-sm text-black/50">
              © 2026 Marcea Ennamorato
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}