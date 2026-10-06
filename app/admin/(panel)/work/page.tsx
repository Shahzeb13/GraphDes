"use client";

import { useState } from "react";
import type { Work as WorkData } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { ImageUpload } from "../../components/ImageUpload";
import { SaveBar } from "../../components/SaveBar";
import { Button, Card, Field, PageHeader, TextArea, TextInput } from "../../components/ui";

export default function WorkPage() {
  const { content, saving, error, save } = useAdminContent();
  const [work, setWork] = useState<WorkData>(content.work);

  async function handleSave() {
    return save({ ...content, work });
  }

  return (
    <div>
      <PageHeader title="Work" subtitle="Show off your projects — just add each one." />

      <Card title="Heading for this section" icon="▣">
        <Field label="Heading" hint="A short title above your project cards.">
          <TextInput
            value={work.heading}
            onChange={(v) => setWork({ ...work, heading: v })}
            placeholder="Selected Work"
          />
        </Field>
        <Field label="Short description" hint="One or two lines under the heading.">
          <TextArea
            rows={2}
            value={work.desc}
            onChange={(v) => setWork({ ...work, desc: v })}
            placeholder="A few projects I'm proud of…"
          />
        </Field>
      </Card>

      <p className="a-card-note">
        Each project becomes one card on your site. Add as many as you like, in the order you
        want them shown.
      </p>

      <div className="space-y-4">
        {work.projects.map((project, i) => (
          <Card
            key={i}
            title={`Project ${i + 1}`}
            actions={
              <Button
                variant="danger"
                onClick={() =>
                  setWork({ ...work, projects: work.projects.filter((_, idx) => idx !== i) })
                }
              >
                Remove
              </Button>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
              <Field label="Project picture" hint="JPG or PNG — this is the big image on the card.">
                <ImageUpload
                  value={project.img}
                  onUploaded={(url) => {
                    const projects = [...work.projects];
                    projects[i] = { ...project, img: url };
                    setWork({ ...work, projects });
                  }}
                  label="Upload picture"
                  className="h-28 w-40"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="When">
                  <TextInput
                    value={project.date}
                    onChange={(v) => {
                      const projects = [...work.projects];
                      projects[i] = { ...project, date: v };
                      setWork({ ...work, projects });
                    }}
                    placeholder="March 2024"
                  />
                </Field>
                <Field label="Project name">
                  <TextInput
                    value={project.title}
                    onChange={(v) => {
                      const projects = [...work.projects];
                      projects[i] = { ...project, title: v };
                      setWork({ ...work, projects });
                    }}
                    placeholder="Zest Brand Identity"
                  />
                </Field>
              </div>
            </div>
            <Field label="What you made" hint="A sentence or two about this project.">
              <TextArea
                rows={3}
                value={project.desc}
                onChange={(v) => {
                  const projects = [...work.projects];
                  projects[i] = { ...project, desc: v };
                  setWork({ ...work, projects });
                }}
                placeholder="A full brand refresh, from logo to packaging…"
              />
            </Field>
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <Button
          variant="ghost"
          onClick={() =>
            setWork({
              ...work,
              projects: [...work.projects, { img: "", date: "", title: "", desc: "" }],
            })
          }
        >
          + Add another project
        </Button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}