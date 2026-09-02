import type { About as AboutData } from "@/lib/types";

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  fontWeight: 700,
  color: "var(--navy)",
  marginBottom: "1rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export default function About({
  heading,
  desc,
  timeline,
  skillsHeading,
  skills,
  funFactsHeading,
  stats,
}: AboutData) {
  return (
    <section id="about" className="about-section">
      <h2 className="section-heading fade-up">{heading}</h2>
      <p className="section-desc fade-up">{desc}</p>

      <div className="about-grid">
        {/* Timeline */}
        <div className="timeline fade-up">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-role">{item.role}</span>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="fade-up">
          <h3 style={headingStyle}>{skillsHeading}</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>

          {/* Fun facts / stats */}
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
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--navy)",
                marginBottom: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {funFactsHeading}
            </p>
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "var(--accent)",
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}