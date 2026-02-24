export default function CTAStrip() {
  return (
    <div className="relative h-[320px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=2400"
        alt="Mosque"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(11,22,40,0.85), rgba(21,37,69,0.7))" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-[700px] px-9">
          <h2 className="font-heading text-2xl md:text-[32px] font-bold text-white leading-tight mb-4">
            Begin Your{" "}
            <span className="font-display italic text-accent-soft font-normal">Spiritual Journey</span>{" "}
            Today
          </h2>
          <p className="text-[15px] text-white/60 leading-relaxed mb-7">
            20+ years of trusted service. 15,000+ satisfied pilgrims. Your journey deserves the best.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="#packages"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px"
            >
              Explore Packages
            </a>
            <a
              href="#contact"
              className="bg-transparent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline border border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all hover:-translate-y-px"
            >
              Contact Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
