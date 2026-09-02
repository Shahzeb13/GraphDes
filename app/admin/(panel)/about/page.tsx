"use client";

import { useState } from "react";
import type { About as AboutData } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { SaveBar } from "../../components/SaveBar";
import { Button, Card, Field, PageHeader, Snippet, TextArea, TextInput } from "../../components/ui";

export default function AboutPage() {
  const { content, saving, error, save } = useAdminContent();
  const [about, setAbout] = useState<AboutData>(content.about);

  async function handleSave() {
    return save({ ...content, about });
  }

  return (
    <div>
      <PageHeader title="About" subtitle="Manage your bio, skills, stats and experience timeline." />

      <Card title="Intro" icon="✦">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Section heading">
            <TextInput
              value={about.heading}
              onChange={(v) => setAbout({ ...about, heading: v })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Bio / description">
              <TextArea
                rows={5}
                value={about.desc}
                onChange={(v) => setAbout({ ...about, desc: v })}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Skills" icon="✎">
        <Field label="Skills block heading">
          <TextInput
            value={about.skillsHeading}
            onChange={(v) => setAbout({ ...about, skillsHeading: v })}
          />
        </Field>
        <div>
          <Snippet label="Skills (one per line)">
          <TextArea
            rows={6}
            value={about.skills.join("\n")}
            onChange={(v) =>
              setAbout({ ...about, skills: v.split("\n").map((s) => s.trim()).filter(Boolean) })
            }
          />
          </Snippet>
        </div>
      </Card>

      {/* STATS_CARD */}
      <Card title="Stats (By The Numbers)" icon="▤">
        <Field label="Stats block heading">
          <TextInput
            value={about.funFactsHeading}
            onChange={(v) => setAbout({ ...about, funFactsHeading: v })}
          />
        </Field>
        <div className="space-y-3">
          {about.stats.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]"
            >
              <TextInput
                value={stat.num}
                onChange={(v) => {
                  const stats = [...about.stats];
                  stats[i] = { ...stat, num: v };
                  setAbout({ ...about, stats });
                }}
                placeholder="6+"
              />
              <TextInput
                value={stat.label}
                onChange={(v) => {
                  const stats = [...about.stats];
                  stats[i] = { ...stat, label: v };
                  setAbout({ ...about, stats });
                }}
                placeholder="Years of Experience"
              />
              <Button
                variant="danger"
                onClick={() =>
                  setAbout({ ...about, stats: about.stats.filter((_, idx) => idx !== i) })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() =>
              setAbout({ ...about, stats: [...about.stats, { num: "", label: "" }] })
            }
          >
            + Add stat
          </Button>
        </div>
      </Card>

      {/* TIMELINE_CARD */}
      <Card title="Experience timeline" icon="◷">
        <div className="space-y-4">
          {about.timeline.map((item, i) => (
            <div
              key={`${item.year}-${i}`}
              className="a-timeline-entry"
            >
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr_2fr]">
                <Field label="Years">
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
                <Field label="Role">
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
              <Field label="Description">
                <TextArea
                  rows={2}
                  value={item.desc}
                  onChange={(v) => {
                    const timeline = [...about.timeline];
                    timeline[i] = { ...item, desc: v };
                    setAbout({ ...about, timeline });
                  }}
                />
              </Field>
              <div className="mt-3">
                <Button
                  variant="danger"
                  onClick={() =>
                    setAbout({
                      ...about,
                      timeline: about.timeline.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  Remove entry
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() =>
              setAbout({
                ...about,
                timeline: [...about.timeline, { year: "", role: "", desc: "" }],
              })
            }
          >
            + Add timeline entry
          </Button>
        </div>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}