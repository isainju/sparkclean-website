/**
 * SparkClean — Mobile Car Detailing Hong Kong
 * Design: Precision Black — Swiss automotive aesthetic
 * Palette: #1a1a1a | #ffffff | #e63946 | #f8f9fa
 * Fonts: Barlow Condensed (display) + DM Sans (body)
 */

import { useEffect, useRef, useState } from "react";

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
function SparkLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" fill="#e63946" />
      <path d="M10 30L20 10L30 30" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M14 22H26" stroke="white" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}

// ── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".reveal, .reveal-left");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Before/After Slider ──────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updatePosition(e.clientX); };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleTouchMove = (e: React.TouchEvent) => { updatePosition(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: "16/9", cursor: "col-resize" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After (clean) — full width base */}
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663816822929/eqeaftjvQgQLixZL.jpg"
          alt="Car after SparkClean detailing — spotless and gleaming"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      {/* Before (dirty) — clipped to left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663816822929/OwGcIjxdkFKKUggg.jpg"
          alt="Car before SparkClean detailing — dirty and dull"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L2 10L7 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 4L18 10L13 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-body font-semibold px-3 py-1.5 uppercase tracking-widest pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-[#e63946] text-white text-xs font-body font-semibold px-3 py-1.5 uppercase tracking-widest pointer-events-none">
        After
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = ["hero", "why", "services", "how", "before-after", "areas", "testimonials", "cta"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "services", label: "Services" },
    { id: "how", label: "How It Works" },
    { id: "areas", label: "Areas" },
    { id: "testimonials", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-white font-body">

      {/* ── NAVIGATION ──────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(26,26,26,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
              <SparkLogo className="w-9 h-9 flex-shrink-0" />
              <span className="font-display text-xl text-white tracking-wide">SparkClean</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-sm font-medium transition-colors duration-150"
                  style={{ color: activeSection === link.id ? "#e63946" : "rgba(255,255,255,0.8)" }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollTo("cta")}
              className="hidden md:block btn-red px-6 py-2.5 text-sm uppercase tracking-wider font-semibold"
            >
              Book Now — HKD 380
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-4 py-3 font-body text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-3">
                <button
                  onClick={() => scrollTo("cta")}
                  className="btn-red w-full py-3 text-sm uppercase tracking-wider font-semibold"
                >
                  Book Now — HKD 380
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663816822929/qYhEaqlbHYVCSDAw.jpg"
            alt="Luxury car on Hong Kong street"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Urgency banner */}
        <div className="absolute top-20 left-0 right-0 z-10 flex justify-center">
          <div className="bg-[#e63946] text-white text-xs font-body font-semibold px-4 py-2 uppercase tracking-widest">
            ⚡ Limited slots available today — Book now
          </div>
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="reveal-left" style={{ transitionDelay: "0ms" }}>
              <span className="inline-block text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Hong Kong's Premier Mobile Detailing
              </span>
            </div>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6 reveal-left"
              style={{ transitionDelay: "80ms" }}
            >
              Your Car,<br />
              <span className="text-[#e63946]">Detailed</span><br />
              While You Work
            </h1>
            <p
              className="font-body text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed reveal-left"
              style={{ transitionDelay: "160ms" }}
            >
              Professional mobile car detailing — we come to your home or office in Hong Kong. No travel needed.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 reveal-left"
              style={{ transitionDelay: "240ms" }}
            >
              <button
                onClick={() => scrollTo("cta")}
                className="btn-red px-8 py-4 text-base uppercase tracking-wider font-semibold"
              >
                Book Now — HKD 380
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="btn-outline-white px-8 py-4 text-base uppercase tracking-wider font-semibold"
              >
                View Services
              </button>
            </div>
            <div
              className="flex items-center gap-6 mt-8 reveal-left"
              style={{ transitionDelay: "320ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#e63946">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L8 1z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-white/70 text-sm font-body">4.9/5 from 500+ customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── WHY SPARKCLEAN ──────────────────────────────────────────────── */}
      <section id="why" className="py-20 bg-[#1a1a1a]">
        <div className="container">
          <div className="text-center mb-14 reveal">
            <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Why Choose Us</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2">The SparkClean Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4C11.2 4 4 11.2 4 20s7.2 16 16 16 16-7.2 16-16S28.8 4 20 4z" stroke="#e63946" strokeWidth="2"/>
                    <path d="M20 12v8l6 3" stroke="#e63946" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: "No Travel Needed",
                desc: "We come to your home or office. You stay productive while your car gets the treatment it deserves.",
              },
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="15" stroke="#e63946" strokeWidth="2"/>
                    <path d="M20 11v9l5 5" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Time-Saving",
                desc: "60-minute express service available. Zero downtime — your car is ready when you are.",
              },
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4l3.1 9.5H33l-8.1 5.9 3.1 9.5L20 23l-8 6.9 3.1-9.5L7 13.5h9.9L20 4z" stroke="#e63946" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Premium Quality",
                desc: "Professional-grade products and techniques. The same standard used on luxury and exotic vehicles.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal border border-white/10 p-8 hover:border-[#e63946]/40 transition-colors duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES & PRICING ──────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-[#f8f9fa]">
        <div className="container">
          <div className="text-center mb-14 reveal">
            <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Transparent Pricing</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mt-2">Services & Pricing</h2>
            <p className="font-body text-[#555] mt-3 max-w-lg mx-auto">No hidden fees. No surprises. Just a spotless car.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Express Shine */}
            <div className="reveal bg-white border border-gray-200 p-8 flex flex-col" style={{ transitionDelay: "0ms" }}>
              <div className="mb-6">
                <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">Express Shine</h3>
                <div className="font-display text-4xl text-[#1a1a1a]">HKD 380</div>
                <div className="text-[#888] text-sm font-body mt-1">60 minutes</div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {["Exterior wash & dry", "Wheel cleaning", "Tyre dressing", "Glass cleaning"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-[#444]">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("cta")}
                className="btn-red w-full py-3.5 text-sm uppercase tracking-wider font-semibold"
              >
                Book Express
              </button>
            </div>

            {/* Full Detail — BEST VALUE */}
            <div
            className="reveal bg-[#1a1a1a] p-8 flex flex-col relative mt-6 md:mt-0"
                style={{ transitionDelay: "80ms" }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e63946] text-white text-xs font-body font-bold px-4 py-1.5 uppercase tracking-widest whitespace-nowrap">
                Best Value
              </div>
              <div className="mb-6 mt-2">
                <h3 className="font-display text-2xl text-white mb-1">Full Detail</h3>
                <div className="font-display text-4xl text-white">HKD 780</div>
                <div className="text-white/50 text-sm font-body mt-1">2–3 hours</div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {["Complete exterior & interior", "Deep interior vacuum", "Leather/vinyl conditioning", "Clay bar treatment", "Wax protection"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-white/80">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("cta")}
                className="btn-red w-full py-3.5 text-sm uppercase tracking-wider font-semibold"
              >
                Book Full Detail
              </button>
            </div>

            {/* Premium Ceramic */}
            <div className="reveal bg-white border border-gray-200 p-8 flex flex-col" style={{ transitionDelay: "160ms" }}>
              <div className="mb-6">
                <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">Premium Ceramic</h3>
                <div className="font-display text-4xl text-[#1a1a1a]">HKD 1,580</div>
                <div className="text-[#888] text-sm font-body mt-1">4–5 hours</div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {["Full Detail included", "Ceramic coating application", "12-month protection", "Hydrophobic paint sealant", "Extreme gloss finish"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-[#444]">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("cta")}
                className="btn-red w-full py-3.5 text-sm uppercase tracking-wider font-semibold"
              >
                Book Ceramic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14 reveal">
            <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Simple Process</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mt-2">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="6" width="24" height="20" rx="3" stroke="#e63946" strokeWidth="2"/>
                    <path d="M4 12h24" stroke="#e63946" strokeWidth="2"/>
                    <path d="M10 18h4M10 22h8" stroke="#e63946" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: "Book Online",
                desc: "Choose your package and preferred time slot in under 2 minutes.",
              },
              {
                num: "02",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M4 22h24M6 22V16l4-8h12l4 8v6" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="25" r="3" stroke="#e63946" strokeWidth="2"/>
                    <circle cx="22" cy="25" r="3" stroke="#e63946" strokeWidth="2"/>
                  </svg>
                ),
                title: "We Arrive",
                desc: "Our team comes to your home or office — fully equipped.",
              },
              {
                num: "03",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5L16 4z" stroke="#e63946" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Detail Your Car",
                desc: "Professional on-site service using premium products.",
              },
              {
                num: "04",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16l6 6 14-14" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Drive Away",
                desc: "Spotless car, zero hassle. Your time was never wasted.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <span className="font-display text-7xl text-[#f0f0f0] absolute -top-4 left-1/2 -translate-x-1/2 leading-none select-none">
                    {step.num}
                  </span>
                  <div className="relative z-10 w-16 h-16 bg-[#f8f9fa] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a] mb-2">{step.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ──────────────────────────────────────────────── */}
      <section id="before-after" className="py-20 bg-[#1a1a1a]">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Real Results</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2">See the SparkClean Difference</h2>
            <p className="font-body text-white/50 mt-3">Drag the slider to compare</p>
          </div>
          <div className="max-w-4xl mx-auto reveal">
            <BeforeAfterSlider />
          </div>
          <div className="text-center mt-8 reveal">
            <button
              onClick={() => scrollTo("cta")}
              className="btn-red px-10 py-4 text-sm uppercase tracking-wider font-semibold"
            >
              Get This Result — Book Now
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ───────────────────────────────────────────────── */}
      <section id="areas" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Coverage</span>
                <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mt-2 mb-6">We Serve All of Hong Kong</h2>
                <p className="font-body text-[#555] mb-8 leading-relaxed">
                  We serve all major districts across Hong Kong. Wherever you work or live, SparkClean comes to you.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Hong Kong Island", "Kowloon", "New Territories", "Lantau Island", "Tsim Sha Tsui", "Causeway Bay", "Mong Kok", "Sha Tin"].map((area) => (
                    <div key={area} className="flex items-center gap-2 font-body text-sm text-[#333]">
                      <div className="w-1.5 h-1.5 bg-[#e63946] flex-shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal">
                {/* Stylised HK map placeholder */}
                <div className="bg-[#f8f9fa] border border-gray-200 aspect-square flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 300 300" className="w-full h-full p-8 opacity-20">
                    <path d="M150 50 C100 50 60 90 60 140 C60 190 100 230 150 230 C200 230 240 190 240 140 C240 90 200 50 150 50Z" fill="#1a1a1a"/>
                    <path d="M80 160 C80 160 100 150 120 155 C140 160 160 145 180 150 C200 155 220 145 220 145" stroke="#e63946" strokeWidth="3" fill="none"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-display text-6xl text-[#1a1a1a] opacity-10 select-none">HK</div>
                    <div className="font-display text-2xl text-[#1a1a1a] mt-2">All Districts</div>
                    <div className="font-body text-sm text-[#888] mt-1">We come to you</div>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-48">
                      {["HK Island", "Kowloon", "NT", "Lantau"].map(a => (
                        <span key={a} className="bg-[#e63946] text-white text-xs px-2 py-1 font-body font-semibold">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-[#f8f9fa]">
        <div className="container">
          <div className="text-center mb-14 reveal">
            <span className="text-[#e63946] font-body text-sm font-semibold uppercase tracking-[0.2em]">Customer Reviews</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Michael L.",
                title: "Finance Director",
                company: "HSBC",
                quote: "SparkClean saved me hours. My car looks brand new — and they finished before my 10am meeting. Absolutely worth it.",
                rating: 5,
              },
              {
                name: "Sarah K.",
                title: "Senior Partner",
                company: "Deloitte HK",
                quote: "I've tried three other detailing services. SparkClean is the only one that's consistent, professional, and actually on time. I'm a regular now.",
                rating: 5,
              },
              {
                name: "David C.",
                title: "Managing Director",
                company: "Private Equity",
                quote: "The ceramic coating package is exceptional. Six months later, my car still looks like it just left the showroom. Highly recommended.",
                rating: 5,
              },
              {
                name: "Jennifer W.",
                title: "Consultant",
                company: "McKinsey HK",
                quote: "Booked online in 2 minutes, they arrived exactly on time at my office car park. Effortless experience from start to finish.",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className={`reveal bg-white p-8 ${i === 1 ? "md:col-span-1 border-l-4 border-[#e63946]" : "border border-gray-200"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#e63946">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L8 1z"/>
                    </svg>
                  ))}
                </div>
                <p className="font-body text-[#333] leading-relaxed mb-6 italic">"{review.quote}"</p>
                <div>
                  <div className="font-body font-semibold text-[#1a1a1a]">{review.name}</div>
                  <div className="font-body text-sm text-[#888]">{review.title}, {review.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ───────────────────────────────────────────────── */}
      <section className="py-12 bg-[#1a1a1a] border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "500+", label: "Happy Customers" },
              { stat: "4.9/5", label: "Average Rating" },
              { stat: "100%", label: "Satisfaction Guarantee" },
              { stat: "HK Mag", label: "Featured In" },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="font-display text-3xl md:text-4xl text-[#e63946]">{item.stat}</div>
                <div className="font-body text-sm text-white/50 mt-1 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section id="cta" className="py-24 bg-[#e63946] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
        </div>
        <div className="container relative z-10 text-center">
          <div className="reveal">
            <span className="font-body text-white/70 text-sm font-semibold uppercase tracking-[0.2em]">Ready?</span>
            <h2 className="font-display text-5xl md:text-7xl text-white mt-2 mb-4">Ready for a Spotless Car?</h2>
            <p className="font-body text-white/80 text-lg mb-10 max-w-md mx-auto">
              Book in 2 minutes. We come to you. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/85298765432?text=Hi%20SparkClean%2C%20I%27d%20like%20to%20book%20a%20detailing%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 font-body font-semibold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors duration-150 active:scale-97"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.065-1.112l-.291-.173-3.018.897.897-3.018-.173-.291A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                WhatsApp to Book
              </a>
              <a
                href="mailto:hello@sparkclean.hk"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 font-body font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-[#e63946] transition-colors duration-150 active:scale-97"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Us
              </a>
            </div>
            <p className="font-body text-white/50 text-xs mt-6 uppercase tracking-widest">
              ⚡ Limited slots available — Don't wait
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#111] py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <SparkLogo className="w-8 h-8" />
                <span className="font-display text-xl text-white">SparkClean</span>
              </div>
              <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
                Hong Kong's premier mobile car detailing service. We come to you — home, office, or wherever your car is parked.
              </p>
              <div className="flex gap-4 mt-5">
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-base text-white mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/85298765432"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.065-1.112l-.291-.173-3.018.897.897-3.018-.173-.291A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  +852 9876 5432
                </a>
                <a
                  href="mailto:hello@sparkclean.hk"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  hello@sparkclean.hk
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-base text-white mb-4">Legal</h4>
              <div className="space-y-3">
                {["Privacy Policy", "Terms of Service", "FAQ"].map((link) => (
                  <a key={link} href="#" className="block font-body text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/30">
              © 2026 SparkClean. All rights reserved. Hong Kong.
            </p>
            <p className="font-body text-xs text-white/20">
              Professional Mobile Car Detailing — We Come to You
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
