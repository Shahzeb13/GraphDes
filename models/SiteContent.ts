import mongoose, { Schema } from "mongoose";
import type { SiteContent } from "../lib/types";

// ---------------------------------------------------------------------------
// Reusable sub-schemas (each section of the portfolio).
// ---------------------------------------------------------------------------

// meta  — SEO details for the browser tab / search engines.
const metaSchema = new Schema(
  { title: String, description: String, keywords: String },
  { _id: false }
);

// navbar — logo text + navigation links.
const navLinkSchema = new Schema({ label: String, href: String }, { _id: false });
const navbarSchema = new Schema(
  { logoFirst: String, logoLast: String, links: [navLinkSchema] },
  { _id: false }
);

// hero — the big headline section at the top of the page.
const heroSchema = new Schema(
  {
    greeting: String,
    titleLines: [String],
    subtitle: String,
    photoUrl: String,
    photoAlt: String,
    resumeUrl: String,
    resumeLabel: String,
  },
  { _id: false }
);

// about — bio, skills, stats and an experience timeline.
const statSchema = new Schema({ num: String, label: String }, { _id: false });
const timelineItemSchema = new Schema(
  { year: String, role: String, desc: String },
  { _id: false }
);
const aboutSchema = new Schema(
  {
    heading: String,
    desc: String,
    skillsHeading: String,
    skills: [String],
    funFactsHeading: String,
    stats: [statSchema],
    timeline: [timelineItemSchema],
  },
  { _id: false }
);

// work — the project cards gallery.
const projectSchema = new Schema(
  { img: String, date: String, title: String, desc: String },
  { _id: false }
);
const workSchema = new Schema(
  { heading: String, desc: String, projects: [projectSchema] },
  { _id: false }
);

// contact — CTA button, image and contact links.
const contactLinkSchema = new Schema({ label: String, href: String }, { _id: false });
const contactSchema = new Schema(
  {
    heading: String,
    desc: String,
    imageUrl: String,
    imageAlt: String,
    ctaLabel: String,
    ctaHref: String,
    links: [contactLinkSchema],
  },
  { _id: false }
);

// footer — bottom text plus the highlighted name.
const footerSchema = new Schema(
  { text: String, highlight: String },
  { _id: false }
);

// theme — colors (CSS vars), fonts and optional custom CSS.
const fontSchema = new Schema({ heading: String, display: String, body: String }, { _id: false });
const themeSchema = new Schema(
  {
    // CSS variables stored as a Map so arbitrary keys are allowed.
    cssVars: { type: Map, of: String, default: {} },
    fonts: fontSchema,
    customCss: String,
  },
  { _id: false }
);

// ---------------------------------------------------------------------------
// Root schema — the whole portfolio is stored as ONE document with _id "main".
// ---------------------------------------------------------------------------
const siteContentSchema = new Schema<SiteContent>(
  {
    // The whole portfolio lives in ONE doc identified by the string "main",
    // so _id is a String (not the default ObjectId) to avoid cast errors.
    _id: String,
    meta: { type: metaSchema, default: {} },
    navbar: { type: navbarSchema, default: {} },
    hero: { type: heroSchema, default: {} },
    about: { type: aboutSchema, default: {} },
    work: { type: workSchema, default: {} },
    contact: { type: contactSchema, default: {} },
    footer: { type: footerSchema, default: {} },
    theme: { type: themeSchema, default: {} },
  } as any, // _id is a Mongoose-internal, not part of the public SiteContent type
  { timestamps: true }
);

const SiteContentModel =
  (mongoose.models.SiteContent as mongoose.Model<SiteContent>) ??
  mongoose.model<SiteContent>("SiteContent", siteContentSchema, "sitecontent");

export default SiteContentModel;