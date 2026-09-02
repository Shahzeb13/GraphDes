import Image from "next/image";
import type { Hero as HeroData } from "@/lib/types";

export default function Hero({
  greeting,
  titleLines,
  subtitle,
  photoUrl,
  photoAlt,
  resumeUrl,
  resumeLabel,
}: HeroData) {
  return (
    <section id="home" className="hero">
      {/* Left */}
      <div className="hero-left">
        <p className="hero-greeting">{greeting}</p>
        <h1 className="hero-title">
          {titleLines.map((line, i) => (
            <span key={`${line}-${i}`}>
              {line}
              {i < titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">{subtitle}</p>
        <a href={resumeUrl} className="hero-btn" download>
          {resumeLabel}
        </a>
      </div>

      {/* Right — circular photo with decorations */}
      <div className="hero-right">
        <div className="hero-photo-wrapper">
          <div className="hero-arc arc-1" aria-hidden="true" />
          <div className="hero-arc arc-2" aria-hidden="true" />

          <div className="hero-photo-circle">
            <Image
              src={photoUrl}
              alt={photoAlt}
              width={300}
              height={300}
              priority
              style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: "100%" }}
            />
          </div>

          <div className="hero-dashes" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <span className="deco-plus tr" aria-hidden="true">✦</span>
          <span className="deco-plus bl" aria-hidden="true">✦</span>
          <span className="deco-plus tl" aria-hidden="true">✦</span>
          <span className="deco-plus br" aria-hidden="true">✦</span>
        </div>
      </div>
    </section>
  );
}