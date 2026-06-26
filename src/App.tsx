import { useState, useEffect, useRef } from "react";

function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCounter(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration]);
  return count;
}

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "projects" | "contact">("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const typedText = useTypewriter("Junior Web Developer");
  const skills = useInView();
  const featured = useInView();
  const cta = useInView();

  const navigate = (p: typeof page) => { setPage(p); setMenuOpen(false); };

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full">
        <span
          className="text-2xl sm:text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          mnkh_ocir<sup className="text-xs">®</sup>
        </span>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => navigate("home")} className={`text-sm transition-colors cursor-pointer ${page === "home" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Home</button>
          <button onClick={() => navigate("about")} className={`text-sm transition-colors cursor-pointer ${page === "about" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>About</button>
          <button onClick={() => navigate("projects")} className={`text-sm transition-colors cursor-pointer ${page === "projects" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Projects</button>
          <button onClick={() => navigate("contact")} className={`text-sm transition-colors cursor-pointer ${page === "contact" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Contact</button>
        </div>

        <button onClick={() => navigate("contact")} className="hidden sm:block liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
          Contact Me
        </button>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground cursor-pointer p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden">
          <button onClick={() => navigate("home")} className="text-2xl text-foreground">Home</button>
          <button onClick={() => navigate("about")} className="text-2xl text-foreground">About</button>
          <button onClick={() => navigate("projects")} className="text-2xl text-foreground">Projects</button>
          <button onClick={() => navigate("contact")} className="text-2xl text-foreground">Contact</button>
        </div>
      )}

      {/* Hero Section */}
      {page === "home" && (
        <section key="home" className="animate-page-in relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-10">
          <h1
            className="animate-fade-rise text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-1px] sm:tracking-[-2.46px] max-w-7xl font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Hello, I'm{" "}
            <em className="not-italic text-muted-foreground">J. Munkh-Ochir</em>
          </h1>

          <p className="animate-fade-rise-delay text-foreground text-xl sm:text-2xl mt-6 font-medium">
            {typedText}<span className="animate-pulse">|</span>
          </p>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
            I build modern and responsive websites.
          </p>

          <button onClick={() => setPage("projects")} className="animate-fade-rise-delay-2 liquid-glass rounded-full px-8 sm:px-14 py-4 sm:py-5 text-sm sm:text-base text-foreground mt-8 sm:mt-12 hover:scale-[1.03] transition-transform cursor-pointer">
            View My Work
          </button>

          {/* Skills with Progress Bars + Stagger */}
          <div ref={skills.ref} className={`mt-24 sm:mt-32 w-full max-w-3xl transition-all duration-700 ${skills.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-2xl sm:text-3xl text-foreground font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
              {[
                { name: "HTML", level: 90 },
                { name: "CSS", level: 85 },
                { name: "JavaScript", level: 80 },
                { name: "React", level: 70 },
                { name: "Python", level: 75 },
                { name: "Django", level: 65 },
                { name: "MySQL", level: 70 },
                { name: "Supabase", level: 60 },
              ].map((s, i) => (
                <div key={s.name} className="transition-all duration-500" style={{ transitionDelay: skills.visible ? `${i * 100}ms` : "0ms", opacity: skills.visible ? 1 : 0, transform: skills.visible ? "translateY(0)" : "translateY(20px)" }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground">{skills.visible ? s.level : 0}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-400/80 transition-all duration-1000 ease-out" style={{ width: skills.visible ? `${s.level}%` : "0%", transitionDelay: `${i * 100 + 300}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div ref={featured.ref} className={`mt-24 sm:mt-32 w-full max-w-2xl transition-all duration-700 delay-100 ${featured.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-2xl sm:text-3xl text-foreground font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Featured Project</h3>
            <div className="liquid-glass rounded-3xl px-5 sm:px-8 py-6 sm:py-8 mt-6 text-left">
              <h4 className="text-xl text-foreground font-medium">Online Quiz System</h4>
              <p className="text-muted-foreground text-sm mt-2">Онлайн шалгалтын систем — quiz өгч, оноогоо харах боломжтой веб апп.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["HTML", "CSS", "JavaScript", "Supabase"].map((t) => (
                  <span key={t} className="liquid-glass rounded-full px-3 py-1 text-xs text-foreground">{t}</span>
                ))}
              </div>
              <a href="https://ocir-quiz-system.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-blue-300 hover:text-blue-200 transition-colors">
                Live Demo →
              </a>
            </div>
          </div>

          {/* Contact CTA */}
          <div ref={cta.ref} className={`mt-24 sm:mt-32 mb-10 transition-all duration-700 delay-200 ${cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-2xl sm:text-3xl text-foreground font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Хамтдаа ажиллах уу?</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Надтай холбоо барих бол доорх товч дээр дарна уу</p>
            <button onClick={() => setPage("contact")} className="liquid-glass rounded-full px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base text-foreground mt-6 hover:scale-[1.03] transition-transform cursor-pointer">
              Contact Me
            </button>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {page === "projects" && (
        <section key="projects" className="animate-page-in relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-40">
          <h2
            className="animate-fade-rise text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-1px] sm:tracking-[-2.46px] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Projects
          </h2>

          <div className="animate-fade-rise-delay liquid-glass rounded-3xl px-5 sm:px-8 py-6 sm:py-8 mt-8 sm:mt-12 max-w-2xl w-full text-left">
            <h3 className="text-2xl text-foreground font-medium">Online Quiz System</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Онлайн шалгалтын систем — хэрэглэгчид бүртгүүлж, quiz өгч, оноогоо харах боломжтой веб апп.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["HTML", "CSS", "JavaScript", "Supabase"].map((tech) => (
                <span key={tech} className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://ocir-quiz-system.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm text-foreground hover:bg-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Live Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a
                href="https://github.com/milo475/ocir_quiz_system.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm text-foreground hover:bg-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {page === "about" && (
        <section key="about" className="animate-page-in relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-40">
          <h2
            className="animate-fade-rise text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-1px] sm:tracking-[-2.46px] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            mnkh_ocir
          </h2>

          <div className="animate-fade-rise-delay liquid-glass rounded-3xl px-5 sm:px-10 py-8 sm:py-10 mt-8 sm:mt-12 max-w-2xl w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-muted-foreground text-sm">Нас</p>
                <p className="text-foreground text-lg">19</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Байршил</p>
                <p className="text-foreground text-lg">Улаанбаатар</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="text-foreground text-lg">mnkhochir@gmail.com</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Их сургууль</p>
                <p className="text-foreground text-lg">Шинжлэх Ухаан, Технологийн Их Сургууль</p>
              </div>
            </div>
          </div>

          <h3
            className="animate-fade-rise-delay-2 text-3xl sm:text-4xl mt-16 font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Skills
          </h3>
          <div className="animate-fade-rise-delay-2 flex flex-wrap justify-center gap-3 mt-6 max-w-2xl">
            {["HTML", "CSS", "JS", "MySQL", "GitHub", "Linux", "Python", "Java", "JavaFX", "React", "Django", "Word", "Excel", "Canva", "Bootstrap", "Supabase"].map((skill) => (
              <span key={skill} className="liquid-glass rounded-full px-5 py-2 text-sm text-foreground">
                {skill}
              </span>
            ))}
          </div>

          <h3
            className="text-3xl sm:text-4xl mt-16 font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Education
          </h3>
          <div className="liquid-glass rounded-3xl px-5 sm:px-10 py-6 sm:py-8 mt-6 max-w-2xl w-full text-left">
            <div className="grid gap-6">
              <div>
                <p className="text-muted-foreground text-sm">2024</p>
                <p className="text-foreground text-base">Хөдөө Аж Ахуйн Их Сургууль — Программ хангамжийн мэргэжлээр орж, 1-р курс төгссөн.</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">2025 — Одоо</p>
                <p className="text-foreground text-base">Шинжлэх Ухаан, Технологийн Их Сургууль — Программ хангамжийн мэргэжлээр орж ирсэн. Одоо 3-р курсийн оюутан.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {page === "contact" && (
        <section key="contact" className="animate-page-in relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-40">
          <h2
            className="animate-fade-rise text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-1px] sm:tracking-[-2.46px] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Contact
          </h2>

          <div className="animate-fade-rise-delay liquid-glass rounded-3xl px-5 sm:px-10 py-8 sm:py-10 mt-8 sm:mt-12 max-w-2xl w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <a href="mailto:mnkhochir3@gmail.com" className="group hover:scale-[1.02] transition-transform">
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="text-foreground text-lg group-hover:text-blue-300 transition-colors">mnkhochir3@gmail.com</p>
              </a>
              <a href="tel:+97699669203" className="group hover:scale-[1.02] transition-transform">
                <p className="text-muted-foreground text-sm">Phone</p>
                <p className="text-foreground text-lg group-hover:text-blue-300 transition-colors">99669203</p>
              </a>
              <a href="https://github.com/milo475" target="_blank" rel="noopener noreferrer" className="group hover:scale-[1.02] transition-transform">
                <p className="text-muted-foreground text-sm">GitHub</p>
                <p className="text-foreground text-lg group-hover:text-blue-300 transition-colors">milo475</p>
              </a>
              <div>
                <p className="text-muted-foreground text-sm">Location</p>
                <p className="text-foreground text-lg">UB, Баянзүрх</p>
              </div>
              <a href="https://www.instagram.com/mnkh_ocir/" target="_blank" rel="noopener noreferrer" className="group hover:scale-[1.02] transition-transform">
                <p className="text-muted-foreground text-sm">Instagram</p>
                <p className="text-foreground text-lg group-hover:text-blue-300 transition-colors">@mnkh_ocir</p>
              </a>
              <a href="https://m.me/milo.507247" target="_blank" rel="noopener noreferrer" className="group hover:scale-[1.02] transition-transform">
                <p className="text-muted-foreground text-sm">Messenger</p>
                <p className="text-foreground text-lg group-hover:text-blue-300 transition-colors">milo.507247</p>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Scroll Down Indicator */}
      {page === "home" && (
        <div className="relative z-10 w-full py-10 sm:py-16 flex justify-center">
          <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGxuNnQwZndscTU1MmE2Z3Z5cGJtNTh4YnIyajlyZWF4MnZ3eXp4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PF6e8Xq8dVnVX1BGLS/giphy.gif" alt="scroll down" className="w-full max-w-full" />
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2025 mnkh_ocir. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/milo475" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.instagram.com/mnkh_ocir/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/milo.507247" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
