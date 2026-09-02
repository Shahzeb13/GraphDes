import Image from "next/image";
import type { Contact as ContactData } from "@/lib/types";

export default function Contact({
  heading,
  desc,
  imageUrl,
  imageAlt,
  ctaLabel,
  ctaHref,
  links,
}: ContactData) {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-heading fade-up">{heading}</h2>

      <div className="contact-grid">
        <div className="fade-up">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={500}
            height={280}
            className="contact-img"
          />
        </div>

        <div className="contact-info fade-up">
          <p className="contact-desc">{desc}</p>

          <div className="contact-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="contact-link">
                <span className="contact-link-icon" />
                {link.label}
              </a>
            ))}
          </div>

          <a href={ctaHref} className="hero-btn" style={{ alignSelf: "flex-start" }}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}