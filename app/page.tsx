"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  /* ── Scroll-reveal ── */
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* ══════════ NAVBAR ══════════ */}
      <nav className="navbar">
        <a href="#home" className="navbar-logo">Rashid Khan</a>

        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="home" className="hero">
        {/* Left */}
        <div className="hero-left">
          <p className="hero-greeting">Hello, I&apos;m Rashid.</p>
          <h1 className="hero-title">
            Graphic<br />Designer
          </h1>
          <p className="hero-subtitle">based in Attock, Pakistan.</p>
          <a href="/resume.pdf" className="hero-btn" download>
            Resume ↓
          </a>
        </div>

        {/* Right — circular photo with decorations */}
        <div className="hero-right">
          <div className="hero-photo-wrapper">

            {/* Outer orbit arcs */}
            <div className="hero-arc arc-1" aria-hidden="true" />
            <div className="hero-arc arc-2" aria-hidden="true" />

            {/* Photo */}
            <div className="hero-photo-circle">
              <Image
                src="/rashid_profile.png"
                alt="Rashid Khan — Graphic Designer"
                width={300}
                height={300}
                priority
                style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: "100%" }}
              />
            </div>

            {/* Staggered dashes below */}
            <div className="hero-dashes" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>

            {/* Floating sparkles — 4 positions */}
            <span className="deco-plus tr" aria-hidden="true">✦</span>
            <span className="deco-plus bl" aria-hidden="true">✦</span>
            <span className="deco-plus tl" aria-hidden="true">✦</span>
            <span className="deco-plus br" aria-hidden="true">✦</span>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="about-section">
        <h2 className="section-heading fade-up">about.</h2>
        <p className="section-desc fade-up">
          I&apos;m a passionate graphic designer with over 6 years of experience crafting
          compelling visual identities, illustrations, and digital experiences.
          I believe great design is the intersection of art and communication —
          it should tell a story and leave a lasting impression.
        </p>

        <div className="about-grid">
          {/* Timeline */}
          <div className="timeline fade-up">
            <div className="timeline-item">
              <span className="timeline-year">2018 – 2020</span>
              <span className="timeline-role">Junior Designer at CreativeHub</span>
              <p className="timeline-desc">
                Started my journey creating brand collateral, social media
                graphics, and marketing materials for local businesses in Punjab.
              </p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2020 – 2022</span>
              <span className="timeline-role">Mid-Level Designer at PixelForge</span>
              <p className="timeline-desc">
                Led visual identity projects for startups across Pakistan and the UAE.
                Delivered end-to-end branding including logo systems, typography, and brand guidelines.
              </p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2022 – Present</span>
              <span className="timeline-role">Senior Graphic Designer — Freelance</span>
              <p className="timeline-desc">
                Working with international clients on brand identity, packaging design,
                editorial design, and digital illustrations. Based in Attock, working globally.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="fade-up">
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--navy)",
                marginBottom: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Tools &amp; Skills
            </h3>
            <div className="skills-grid">
              {[
                "Adobe Illustrator",
                "Adobe Photoshop",
                "Adobe InDesign",
                "Figma",
                "After Effects",
                "Brand Identity",
                "Typography",
                "Packaging Design",
                "UI / UX",
                "Motion Graphics",
                "Logo Design",
                "Editorial Design",
              ].map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            {/* Fun facts */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1.4rem",
                background: "var(--cream-dark)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--navy)",
                  marginBottom: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                By The Numbers
              </p>
              {[
                ["6+", "Years of Experience"],
                ["80+", "Projects Completed"],
                ["40+", "Happy Clients"],
                ["12+", "Design Awards"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.6rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.4rem",
                      color: "var(--accent)",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WORK ══════════ */}
      <section id="work" className="work-section">
        <h2 className="section-heading fade-up">work.</h2>
        <p className="section-desc fade-up">
          A curated selection of projects — from brand identity systems to
          packaging design and digital illustration.
        </p>

        <div className="work-grid">
          {[
            {
              img: "/work1.png",
              date: "March 2024",
              title: "Zest Brand Identity",
              desc: "Complete visual identity for a premium food & beverage startup — logo, packaging, brand guidelines, and social media templates.",
            },
            {
              img: "/work2.png",
              date: "January 2024",
              title: "Flux UI Design System",
              desc: "A scalable UI component library and design system created in Figma for a SaaS product, covering typography, color, and patterns.",
            },
            {
              img: "/work3.png",
              date: "October 2023",
              title: "Terra Packaging Suite",
              desc: "Eco-conscious packaging design for an organic skincare brand — labels, boxes, and retail point-of-sale materials.",
            },
            {
              img: "/work1.png",
              date: "July 2023",
              title: "Novatype Editorial",
              desc: "Editorial design and typography system for a bi-annual architecture magazine, including layout grids, pull quotes, and infographics.",
            },
          ].map((card) => (
            <article key={card.title} className="work-card fade-up">
              <div style={{ overflow: "hidden" }}>
                <Image
                  src={card.img}
                  alt={card.title}
                  width={600}
                  height={400}
                  className="work-card-img"
                />
              </div>
              <div className="work-card-body">
                <p className="work-card-date">{card.date}</p>
                <h3 className="work-card-title">{card.title}</h3>
                <p className="work-card-desc">{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="contact-section">
        <h2 className="section-heading fade-up">contact.</h2>

        <div className="contact-grid">
          <div className="fade-up">
            <Image
              src="/work2.png"
              alt="Design workspace"
              width={500}
              height={280}
              className="contact-img"
            />
          </div>

          <div className="contact-info fade-up">
            <p className="contact-desc">
              I&apos;m always open to exciting projects, collaborations, and creative
              conversations. Whether you need a fresh brand identity, a packaging
              redesign, or a passion project — let&apos;s make something great together.
            </p>

            <div className="contact-links">
              {[
                { label: "rashidkhan@gmail.com", href: "mailto:rashidkhan@gmail.com" },
                { label: "behance.net/rashidkhan", href: "#" },
                { label: "instagram.com/rashidkhandesign", href: "#" },
                { label: "linkedin.com/in/rashidkhan", href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="contact-link">
                  <span className="contact-link-icon" />
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="mailto:rashidkhan@gmail.com"
              className="hero-btn"
              style={{ alignSelf: "flex-start" }}
            >
              Say Hello →
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer>
        <p>
          © 2024 <span>Rashid Khan</span> — Graphic Designer · Attock, Pakistan
        </p>
      </footer>
    </>
  );
}
