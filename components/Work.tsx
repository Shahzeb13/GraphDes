import Image from "next/image";
import type { Work as WorkData } from "@/lib/types";

export default function Work({ heading, desc, projects }: WorkData) {
  return (
    <section id="work" className="work-section">
      <h2 className="section-heading fade-up">{heading}</h2>
      <p className="section-desc fade-up">{desc}</p>

      <div className="work-grid">
        {projects.map((card) => (
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
  );
}