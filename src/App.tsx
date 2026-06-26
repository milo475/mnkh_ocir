import { useState } from "react";

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "projects">("home");

  return (
    <div className="relative min-h-screen overflow-hidden">
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
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          mnkh_ocir<sup className="text-xs">®</sup>
        </span>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setPage("home")} className={`text-sm transition-colors cursor-pointer ${page === "home" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Home</button>
          <button onClick={() => setPage("about")} className={`text-sm transition-colors cursor-pointer ${page === "about" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>About</button>
          <button onClick={() => setPage("projects")} className={`text-sm transition-colors cursor-pointer ${page === "projects" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Projects</button>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
          Contact Me
        </button>
      </nav>

      {/* Hero Section */}
      {page === "home" && (
        <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Hello, I'm{" "}
            <em className="not-italic text-muted-foreground">J. Munkh-Ochir</em>
          </h1>

          <p className="animate-fade-rise-delay text-foreground text-xl sm:text-2xl mt-6 font-medium">
            Junior Web Developer
          </p>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
            I build modern and responsive websites.
          </p>

          <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer">
            View My Work
          </button>
        </section>
      )}

      {/* Projects Section */}
      {page === "projects" && (
        <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
          <h2
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Projects
          </h2>

          <div className="animate-fade-rise-delay liquid-glass rounded-3xl px-8 py-8 mt-12 max-w-2xl w-full text-left">
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

            <div className="flex gap-4 mt-6">
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
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px]">
          <h2
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            mnkh_ocir
          </h2>

          <div className="animate-fade-rise-delay liquid-glass rounded-3xl px-10 py-10 mt-12 max-w-2xl w-full">
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
          <div className="liquid-glass rounded-3xl px-10 py-8 mt-6 max-w-2xl w-full text-left">
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
    </div>
  );
}
