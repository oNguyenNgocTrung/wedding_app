"use client";

export default function HeroSlider() {
  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const content = document.querySelector("#couple");
    content?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative h-screen flex items-center justify-center parallax-bg"
      style={{ backgroundImage: "url('/images/slider-background.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[var(--color-dark)] opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {/* Center image */}
        <div className="mb-6">
          <img
            src="/images/slide_center_middle.jpg"
            alt="Trung & Bich"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto object-cover border-4 border-white/30"
          />
        </div>

        {/* Names */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-4">
          <div className="text-right">
            <p className="text-3xl md:text-5xl font-[Playfair_Display] italic">
              Trung
            </p>
            <p className="text-xs md:text-sm font-[Dosis] uppercase tracking-widest mt-1 text-white/70">
              Save The Date
            </p>
          </div>
          <div className="text-left">
            <p className="text-3xl md:text-5xl font-[Playfair_Display] italic">
              Bich
            </p>
            <p className="text-xs md:text-sm font-[Dosis] uppercase tracking-widest mt-1 text-white/70">
              April 09, 2018
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <a
        href="#couple"
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors flex flex-col items-center gap-2"
      >
        <span className="font-[Dosis] text-xs uppercase tracking-widest">
          Scroll
        </span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}
