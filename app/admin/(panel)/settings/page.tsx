"use client";

import { useState } from "react";
import type { Footer as FooterData, Meta as MetaData, Theme } from "@/lib/types";
import { useAdminContent } from "../../components/AdminContent";
import { SaveBar } from "../../components/SaveBar";
import { Card, Field, PageHeader, TextArea, TextInput } from "../../components/ui";

const FONT_OPTIONS = [
  "Syne",
  "Cormorant Garamond",
  "DM Sans",
  "Inter",
  "Playfair Display",
  "Poppins",
  "Space Grotesk",
  "Source Sans 3",
];

const CSS_VAR_LABELS: Record<string, string> = {
  "--cream": "Page background",
  "--cream-dark": "Box background",
  "--navy": "Primary text",
  "--navy-mid": "Secondary navy",
  "--accent": "Accent (gold)",
  "--accent-light": "Accent light (buttons)",
  "--accent-bg": "Accent glow",
  "--text-muted": "Muted text",
  "--border": "Border color",
  "--white": "Card white",
};

export default function SettingsPage() {
  const { content, saving, error, save } = useAdminContent();
  const [meta, setMeta] = useState<MetaData>(content.meta);
  const [footerData, setFooterData] = useState<FooterData>(content.footer);
  const [theme, setTheme] = useState<Theme>(content.theme);

  function setVar(key: string, value: string) {
    setTheme({ ...theme, cssVars: { ...theme.cssVars, [key]: value } });
  }

  async function handleSave() {
    return save({ ...content, meta, footer: footerData, theme });
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="SEO, footer, theme colors, fonts and custom CSS." />

      <Card title="SEO / Browser tab" icon="◐">
        <Field label="Page title">
          <TextInput value={meta.title} onChange={(v) => setMeta({ ...meta, title: v })} />
        </Field>
        <Field label="Meta description">
          <TextArea rows={2} value={meta.description} onChange={(v) => setMeta({ ...meta, description: v })} />
        </Field>
        <Field label="Keywords (comma separated)">
          <TextInput value={meta.keywords} onChange={(v) => setMeta({ ...meta, keywords: v })} />
        </Field>
      </Card>

      <Card title="Footer" icon="⌘">
        <Field
          label="Footer text"
          hint="Use the {name} token where you want your highlighted name to appear."
        >
          <TextInput
            value={footerData.text}
            onChange={(v) => setFooterData({ ...footerData, text: v })}
          />
        </Field>
        <Field label="Highlighted name">
          <TextInput
            value={footerData.highlight}
            onChange={(v) => setFooterData({ ...footerData, highlight: v })}
          />
        </Field>
      </Card>

      {/* THEME_CARD */}
      <Card title="Theme colors" icon="◔">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(theme.cssVars).map(([key, value]) => (
            <div key={key} className="a-field">
              <span className="a-field-label">{CSS_VAR_LABELS[key] ?? key}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ffffff"}
                  onChange={(e) => setVar(key, e.target.value)}
                  className="a-input"
                  style={{ height: 36, width: 48, padding: "3px 4px", cursor: "pointer", flexShrink: 0 }}
                />
                <input
                  type="text"
                  className="a-input"
                  value={value}
                  onChange={(e) => setVar(key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Fonts" icon="Aa">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["heading", "display", "body"] as const).map((slot) => (
            <Field key={slot} label={`${slot[0].toUpperCase() + slot.slice(1)} font`}>
              <select
                className="a-input"
                value={theme.fonts[slot]}
                onChange={(e) =>
                  setTheme({ ...theme, fonts: { ...theme.fonts, [slot]: e.target.value } })
                }
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </Field>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--col-on-surface-variant)", marginTop: 4 }}>
          The Google Fonts stylesheet is loaded automatically for the fonts below.
        </p>
      </Card>

      <Card title="Custom CSS" icon="⌨">
        <Field
          label="Extra CSS"
          hint="Advanced: add any CSS you want applied site-wide (e.g. .hero-title { letter-spacing: 2px; }). No <style> tag needed."
        >
          <TextArea
            rows={8}
            value={theme.customCss}
            onChange={(v) => setTheme({ ...theme, customCss: v })}
            placeholder=".hero-title { color: var(--navy); }"
          />
        </Field>
      </Card>

      <SaveBar onSave={handleSave} saving={saving} error={error} />
    </div>
  );
}