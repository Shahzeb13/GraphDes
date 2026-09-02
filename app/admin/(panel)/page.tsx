"use client";

import { useState } from "react";
import type { Hero as HeroData, Navbar as NavbarData } from "@/lib/types";
import { useAdminContent } from "../components/AdminContent";
import { ImageUpload } from "../components/ImageUpload";
import { SaveBar } from "../components/SaveBar";
import { Button, Card, Field, PageHeader, Snippet, TextInput } from "../components/ui";

export default function ProfilePage() {
  const { content, saving, error, save } = useAdminContent();
  const [navbar, setNavbar] = useState<NavbarData>(content.navbar);
  const [hero, setHero] = useState<HeroData>(content.hero);

  async function handleSave() {
    return save({ ...content, navbar, hero });
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle="Edit your logo, navigation and hero section." />

      <Card title="Navigation — logo & links" icon="◈">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Logo — first name">
            <TextInput
              value={navbar.logoFirst}
              onChange={(v) => setNavbar({ ...navbar, logoFirst: v })}
            />
          </Field>
          <Field label="Logo — last name">
            <TextInput
              value={navbar.logoLast}
              onChange={(v) => setNavbar({ ...navbar, logoLast: v })}
            />
          </Field>
        </div>

        <div className="space-y-3">
          <Snippet label="Nav links">
            {navbar.links.map((link, i) => (
            <div
              key={`${link.label}-${i}`}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]"
            >
              <TextInput
                value={link.label}
                onChange={(v) => {
                  const links = [...navbar.links];
                  links[i] = { ...link, label: v };
                  setNavbar({ ...navbar, links });
                }}
                placeholder="Label (e.g. Home)"
              />
              <TextInput
                value={link.href}
                onChange={(v) => {
                  const links = [...navbar.links];
                  links[i] = { ...link, href: v };
                  setNavbar({ ...navbar, links });
                }}
                placeholder="#home"
              />
              <Button
                variant="danger"
                onClick={() =>
                  setNavbar({ ...navbar, links: navbar.links.filter((_, idx) => idx !== i) })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() =>
              setNavbar({ ...navbar, links: [...navbar.links, { label: "New", href: "#" }] })
            }
          >
            + Add link
          </Button>
          </Snippet>
        </div>
      </Card>

      {/* HERO_CARD */}
      <Card title="Hero section" icon="✦">
        <Field label="Greeting">
          <TextInput value={hero.greeting} onChange={(v) => setHero({ ...hero, greeting: v })} />
        </Field>

        <div>
          <Snippet label="Title lines (each line renders on its own row)">
          <div className="space-y-3">
            {hero.titleLines.map((line, i) => (
              <div key={`${line}-${i}`} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Profile photo" hint="PNG / JPG / WEBP — uploaded to Cloudinary">
            <ImageUpload
              value={hero.photoUrl}
              onUploaded={(url) => setHero({ ...hero, photoUrl: url })}
              className="h-32 w-32 rounded-full"
            />
          </Field>
          <div className="space-y-4">
            <Field label="Photo alt text">
              <TextInput value={hero.photoAlt} onChange={(v) => setHero({ ...hero, photoAlt: v })} />
            </Field>
            <Field label="Photo URL (or keep the uploaded one)">
              <TextInput value={hero.photoUrl} onChange={(v) => setHero({ ...hero, photoUrl: v })} />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Resume URL" hint="PDF — upload a new one to replace it">
            <div>
              <TextInput
                value={hero.resumeUrl}
                onChange={(v) => setHero({ ...hero, resumeUrl: v })}
              />
              <div className="mt-2">
                <ImageUpload
                  value=""
                  onUploaded={(url) => setHero({ ...hero, resumeUrl: url })}
                  accept="application/pdf"
                  label="Upload resume (PDF)"
                  className="h-14 w-full"
                />
              </div>
            </div>
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