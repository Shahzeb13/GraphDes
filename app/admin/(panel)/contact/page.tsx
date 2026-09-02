"use client";

import { useState } from "react";
import type { Contact as ContactData } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { ImageUpload } from "../../components/ImageUpload";
import { SaveBar } from "../../components/SaveBar";
import { Button, Card, Field, PageHeader, TextArea, TextInput } from "../../components/ui";

export default function ContactPage() {
  const { content, saving, error, save } = useAdminContent();
  const [contact, setContact] = useState<ContactData>(content.contact);

  async function handleSave() {
    return save({ ...content, contact });
  }

  return (
    <div>
      <PageHeader title="Contact" subtitle="Edit the contact section's copy, image and links." />

      <Card title="Section header" icon="✉">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Section heading">
            <TextInput
              value={contact.heading}
              onChange={(v) => setContact({ ...contact, heading: v })}
            />
          </Field>
          <Field label="Section description">
            <TextArea
              rows={3}
              value={contact.desc}
              onChange={(v) => setContact({ ...contact, desc: v })}
            />
          </Field>
          <Field label="CTA button text">
            <TextInput
              value={contact.ctaLabel}
              onChange={(v) => setContact({ ...contact, ctaLabel: v })}
            />
          </Field>
          <Field label="CTA button link">
            <TextInput
              value={contact.ctaHref}
              onChange={(v) => setContact({ ...contact, ctaHref: v })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Side image" icon="▧">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
          <ImageUpload
            value={contact.imageUrl}
            onUploaded={(url) => setContact({ ...contact, imageUrl: url })}
          />
          <Field label="Alt text">
            <TextInput
              value={contact.imageAlt}
              onChange={(v) => setContact({ ...contact, imageAlt: v })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Contact links" icon="⌗">
        <div className="space-y-3">
          {contact.links.map((link, i) => (
            <div
              key={`${link.label}-${i}`}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]"
            >
              <TextInput
                value={link.label}
                onChange={(v) => {
                  const links = [...contact.links];
                  links[i] = { ...link, label: v };
                  setContact({ ...contact, links });
                }}
                placeholder="rashidkhan@gmail.com"
              />
              <TextInput
                value={link.href}
                onChange={(v) => {
                  const links = [...contact.links];
                  links[i] = { ...link, href: v };
                  setContact({ ...contact, links });
                }}
                placeholder="mailto:rashidkhan@gmail.com"
              />
              <Button
                variant="danger"
                onClick={() =>
                  setContact({ ...contact, links: contact.links.filter((_, idx) => idx !== i) })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() =>
              setContact({ ...contact, links: [...contact.links, { label: "", href: "" }] })
            }
          >
            + Add link
          </Button>
        </div>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}