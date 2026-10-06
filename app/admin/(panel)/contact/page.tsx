"use client";

import { useState } from "react";
import type { Contact as ContactData } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { ImageUpload } from "../../components/ImageUpload";
import { SaveBar } from "../../components/SaveBar";
import {
  Button,
  Card,
  Field,
  PageHeader,
  RowHead,
  TextArea,
  TextInput,
} from "../../components/ui";

export default function ContactPage() {
  const { content, saving, error, save } = useAdminContent();
  const [contact, setContact] = useState<ContactData>(content.contact);

  async function handleSave() {
    return save({ ...content, contact });
  }

  return (
    <div>
      <PageHeader title="Contact" subtitle="Tell people how to reach you. That's all." />

      <Card title="Heading for this section" icon="✉">
        <Field label="Heading" hint="A short title above your contact details.">
          <TextInput
            value={contact.heading}
            onChange={(v) => setContact({ ...contact, heading: v })}
            placeholder="Let's work together"
          />
        </Field>
        <Field label="Short description" hint="One or two friendly lines.">
          <TextArea
            rows={3}
            value={contact.desc}
            onChange={(v) => setContact({ ...contact, desc: v })}
            placeholder="Have a project in mind? I'd love to hear about it."
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Big button text" hint="The words on the button people click.">
            <TextInput
              value={contact.ctaLabel}
              onChange={(v) => setContact({ ...contact, ctaLabel: v })}
              placeholder="Email me"
            />
          </Field>
          <Field
            label="Where that button goes"
            hint="Type an email as mailto:you@site.com, or paste a web link."
          >
            <TextInput
              value={contact.ctaHref}
              onChange={(v) => setContact({ ...contact, ctaHref: v })}
              placeholder="mailto:you@site.com"
            />
          </Field>
        </div>
      </Card>

      <Card title="Your picture here" icon="▧">
        <p className="a-card-note">
          Sits next to your contact details. A photo of you or your workspace works nicely.
        </p>
        <ImageUpload
          value={contact.imageUrl}
          onUploaded={(url) => setContact({ ...contact, imageUrl: url })}
          label="Upload picture"
          className="h-40 w-56"
        />
      </Card>

      <Card title="Ways to reach you" icon="⌗">
        <p className="a-card-note">
          Each one shows up as a button on your site. Add your email, phone, LinkedIn — anything
          you like.
        </p>
        <div className="a-row-list">
          {contact.links.map((link, i) => (
            <div key={i} className="a-row">
              <RowHead
                index={i}
                noun="Button"
                onRemove={() =>
                  setContact({ ...contact, links: contact.links.filter((_, idx) => idx !== i) })
                }
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
                <Field label="Text people see" hint="Example: Email me">
                  <TextInput
                    value={link.label}
                    onChange={(v) => {
                      const links = [...contact.links];
                      links[i] = { ...link, label: v };
                      setContact({ ...contact, links });
                    }}
                    placeholder="Email me"
                  />
                </Field>
                <Field
                  label="Where it goes"
                  hint="Type an email as mailto:you@site.com, or paste a web link."
                >
                  <TextInput
                    value={link.href}
                    onChange={(v) => {
                      const links = [...contact.links];
                      links[i] = { ...link, href: v };
                      setContact({ ...contact, links });
                    }}
                    placeholder="mailto:you@site.com"
                  />
                </Field>
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="ghost"
              onClick={() =>
                setContact({ ...contact, links: [...contact.links, { label: "", href: "" }] })
              }
            >
              + Add another way to reach you
            </Button>
          </div>
        </div>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}