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
      <PageHeader title="Work" subtitle="Manage your project cards and gallery." />

      <Card title="Section header" icon="▣">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Section heading">
            <TextInput value={work.heading} onChange={(v) => setWork({ ...work, heading: v })} />
          </Field>
          <Field label="Section description">
            <TextArea
              rows={2}
              value={work.desc}
              onChange={(v) => setWork({ ...work, desc: v })}
            />
          </Field>
        </div>
      </Card>

      <div className="space-y-4">
        {work.projects.map((project, i) => (
          <Card
            key={`${project.title}-${i}`}
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
              <Field label="Cover image">
                <ImageUpload
                  value={project.img}
                  onUploaded={(url) => {
                    const projects = [...work.projects];
                    projects[i] = { ...project, img: url };
                    setWork({ ...work, projects });
                  }}
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date">
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
                <Field label="Title">
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
            <Field label="Description">
              <TextArea
                rows={3}
                value={project.desc}
                onChange={(v) => {
                  const projects = [...work.projects];
                  projects[i] = { ...project, desc: v };
                  setWork({ ...work, projects });
                }}
              />
            </Field>
            <Field label="Image URL (or keep the uploaded one)">
              <TextInput
                value={project.img}
                onChange={(v) => {
                  const projects = [...work.projects];
                  projects[i] = { ...project, img: v };
                  setWork({ ...work, projects });
                }}
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
          + Add project
        </Button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}