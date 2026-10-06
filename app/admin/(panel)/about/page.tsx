"use client";

import { useState } from "react";
import type { About as AboutData } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { SaveBar } from "../../components/SaveBar";
import { Button, Card, Field, PageHeader, RowHead, TextArea, TextInput } from "../../components/ui";

/* ─────────────────────────────────────────────
   SkillEditor — type a skill, press Enter to add
   Enter / "," commits. Backspace on an empty
   field removes the last chip. Chips are also
   individually removable via their × button.
   Duplicate and blank entries are ignored.
───────────────────────────────────────────── */
function SkillEditor({
  skills,
  onChange,
}: {
  skills: string[];
  onChange: (skills: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function commit(raw: string) {
    const value = raw.trim().replace(/,+$/, "").trim();
    if (!value) {
      setDraft("");
      return;
    }
    if (!skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      onChange([...skills, value]);
    }
    setDraft("");
  }

  function removeAt(index: number) {
    onChange(skills.filter((_, i) => i !== index));
  }

  return (
    <div className="a-skill-editor">
      {skills.length ? (
        <div className="a-tag-preview">
          {skills.map((skill, i) => (
            <span key={`${skill}-${i}`} className="a-tag-chip">
              {skill}
              <button
                type="button"
                className="a-tag-chip-x"
                onClick={() => removeAt(i)}
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="a-skill-editor-row">
        <input
          className="a-input a-skill-editor-input"
          value={draft}
          placeholder={skills.length ? "Add another skill…" : "Brand Identity"}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit(draft);
              return;
            }
            if (e.key === "Backspace" && draft === "" && skills.length) {
              removeAt(skills.length - 1);
            }
          }}
          onBlur={() => commit(draft)}
        />
        <Button
          variant="ghost"
          onClick={() => commit(draft)}
          disabled={draft.trim() === ""}
        >
          Add
        </Button>
      </div>

      {!skills.length ? (
        <span className="a-field-hint">
          Your skills will show up here as you add them.
        </span>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const { content, saving, error, save } = useAdminContent();
  const [about, setAbout] = useState<AboutData>(content.about);

  async function handleSave() {
    return save({ ...content, about });
  }

  return (
    <div>
      <PageHeader
        title="About"
        subtitle="Just type what you want to say — we handle the rest."
      />

      <Card title="Your intro" icon="✦">
        <p className="a-card-note">
          The opening of your About section. Visitors read this first.
        </p>
        <Field label="Heading" hint="A short title. Example: Designer, developer, coffee enthusiast.">
          <TextInput
            value={about.heading}
            onChange={(v) => setAbout({ ...about, heading: v })}
            placeholder="Design that speaks"
          />
        </Field>
        <Field label="Paragraph" hint="A few sentences about who you are and what you do.">
          <TextArea
            rows={6}
            value={about.desc}
            onChange={(v) => setAbout({ ...about, desc: v })}
            placeholder="I'm a graphic designer based in…"
          />
        </Field>
      </Card>

      {/* SKILLS_CARD */}
      <Card title="Your skills" icon="✎">
        <p className="a-card-note">
          Type a skill and press Enter to add it. Each skill shows up as a small button on your site.
        </p>
        <Field label="Heading for this list" hint="Example: What I work with">
          <TextInput
            value={about.skillsHeading}
            onChange={(v) => setAbout({ ...about, skillsHeading: v })}
            placeholder="What I work with"
          />
        </Field>
        <Field label="Your skills" hint="Press Enter or the Add button after each skill.">
          <SkillEditor
            skills={about.skills}
            onChange={(skills) => setAbout({ ...about, skills })}
          />
        </Field>
      </Card>

      {/* STATS_CARD */}
      <Card title="Numbers about you" icon="▤">
        <p className="a-card-note">
          Big impressive numbers, like “6+ Years Experience”. Add as many as you like.
        </p>
        <Field label="Heading for this list" hint="Example: By the numbers">
          <TextInput
            value={about.funFactsHeading}
            onChange={(v) => setAbout({ ...about, funFactsHeading: v })}
            placeholder="By The Numbers"
          />
        </Field>
        <div className="a-row-list">
          {about.stats.map((stat, i) => (
            <div key={i} className="a-row">
              <RowHead
                index={i}
                noun="Number"
                onRemove={() =>
                  setAbout({ ...about, stats: about.stats.filter((_, idx) => idx !== i) })
                }
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
                <Field label="The number">
                  <TextInput
                    value={stat.num}
                    onChange={(v) => {
                      const stats = [...about.stats];
                      stats[i] = { ...stat, num: v };
                      setAbout({ ...about, stats });
                    }}
                    placeholder="6+"
                  />
                </Field>
                <Field label="What it means">
                  <TextInput
                    value={stat.label}
                    onChange={(v) => {
                      const stats = [...about.stats];
                      stats[i] = { ...stat, label: v };
                      setAbout({ ...about, stats });
                    }}
                    placeholder="Years of Experience"
                  />
                </Field>
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="ghost"
              onClick={() =>
                setAbout({ ...about, stats: [...about.stats, { num: "", label: "" }] })
              }
            >
              + Add a number
            </Button>
          </div>
        </div>
      </Card>

      {/* TIMELINE_CARD */}

      <Card title="Your work history" icon="◷">
        <p className="a-card-note">
          Your jobs and roles, newest at the top is a nice touch. Add one entry per role.
        </p>
        <div className="a-row-list">
          {about.timeline.map((item, i) => (
            <div key={i} className="a-row">
              <RowHead
                index={i}
                noun="Role"
                onRemove={() =>
                  setAbout({
                    ...about,
                    timeline: about.timeline.filter((_, idx) => idx !== i),
                  })
                }
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
                <Field label="When">
                  <TextInput
                    value={item.year}
                    onChange={(v) => {
                      const timeline = [...about.timeline];
                      timeline[i] = { ...item, year: v };
                      setAbout({ ...about, timeline });
                    }}
                    placeholder="2018 – 2020"
                  />
                </Field>
                <Field label="Job title">
                  <TextInput
                    value={item.role}
                    onChange={(v) => {
                      const timeline = [...about.timeline];
                      timeline[i] = { ...item, role: v };
                      setAbout({ ...about, timeline });
                    }}
                    placeholder="Junior Designer at CreativeHub"
                  />
                </Field>
              </div>
              <Field label="What you did there" hint="One or two short lines is plenty.">
                <TextArea
                  rows={3}
                  value={item.desc}
                  onChange={(v) => {
                    const timeline = [...about.timeline];
                    timeline[i] = { ...item, desc: v };
                    setAbout({ ...about, timeline });
                  }}
                  placeholder="Led brand refreshes for retail clients…"
                />
              </Field>
            </div>
          ))}
          <div>
            <Button
              variant="ghost"
              onClick={() =>
                setAbout({
                  ...about,
                  timeline: [...about.timeline, { year: "", role: "", desc: "" }],
                })
              }
            >
              + Add a role
            </Button>
          </div>
        </div>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}