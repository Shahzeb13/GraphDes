"use client";

import { useState } from "react";
import type { Hero as HeroData } from "@/lib/types";
import { useAdminContent } from "../components/AdminContent";
import { ImageUpload } from "../components/ImageUpload";
import { SaveBar } from "../components/SaveBar";
import { Button, Card, Field, PageHeader, Snippet, TextInput } from "../components/ui";

export default function ProfilePage() {
  const { content, saving, error, save } = useAdminContent();
  const [hero, setHero] = useState<HeroData>(content.hero);

  async function handleSave() {
    return save({ ...content, hero });
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle="Edit your hero section." />

      {/* HERO_CARD */}
      <Card title="Hero section" icon="✦">
        <Field label="Greeting">
          <TextInput value={hero.greeting} onChange={(v) => setHero({ ...hero, greeting: v })} />
        </Field>

        <div>
          <Snippet label="Title lines (each line renders on its own row)">
          <div className="space-y-3">
            {hero.titleLines.map((line, i) => (
              <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                <TextInput
                  value={line}
                  onChange={(v) => {
                    const titleLines = [...hero.titleLines];
                    titleLines[i] = v;
                    setHero({ ...hero, titleLines });
                  }}
                  placeholder="Graphic"
                />
                <Button
                  variant="danger"
                  onClick={() =>
                    setHero({ ...hero, titleLines: hero.titleLines.filter((_, idx) => idx !== i) })
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Button
              variant="ghost"
              onClick={() => setHero({ ...hero, titleLines: [...hero.titleLines, ""] })}
            >
              + Add line
            </Button>
          </div>
          </Snippet>
        </div>

        <Field label="Subtitle">
          <TextInput value={hero.subtitle} onChange={(v) => setHero({ ...hero, subtitle: v })} />
        </Field>

        <Field label="Profile photo" hint="PNG / JPG / WEBP — uploaded to Cloudinary">
          <ImageUpload
            value={hero.photoUrl}
            onUploaded={(url) => setHero({ ...hero, photoUrl: url })}
            label="Upload photo"
            className="h-32 w-32 rounded-full"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Resume" hint="PDF — uploading a new one replaces the current file">
            <ImageUpload
              value=""
              onUploaded={(url) => setHero({ ...hero, resumeUrl: url })}
              accept="application/pdf"
              label="Upload resume (PDF)"
              className="h-14 w-full"
            />
          </Field>
          <Field label="Resume button text">
            <TextInput
              value={hero.resumeLabel}
              onChange={(v) => setHero({ ...hero, resumeLabel: v })}
            />
          </Field>
        </div>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}