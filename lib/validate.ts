import { DEFAULT_CONTENT } from "./defaultContent";
import type {
  About,
  Contact,
  Footer,
  Hero,
  Meta,
  Navbar,
  Project,
  SiteContent,
  Stat,
  Theme,
  TimelineItem,
  Work,
} from "./types";

export const ALLOWED_UPLOAD_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
] as const;

export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024; // 12MB

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const str = (v: unknown, fallback: string, max = 10000): string =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : fallback;

const strArr = (v: unknown, fallback: string[], maxItems = 100): string[] => {
  if (!Array.isArray(v)) return fallback;
  const arr = v
    .filter((i): i is string => typeof i === "string" && Boolean(i.trim()))
    .map((i) => i.trim().slice(0, 500))
    .slice(0, maxItems);
  return arr.length ? arr : fallback;
};

function mapObjects<T>(
  v: unknown,
  fallback: T[],
  map: (item: Record<string, unknown>) => T,
  limit = 100
): T[] {
  if (!Array.isArray(v)) return fallback;
  const out: T[] = [];
  for (const item of v.slice(0, limit)) {
    try {
      const mapped = map(isObj(item) ? item : {});
      if (mapped) out.push(mapped);
    } catch {
      // skip malformed items
    }
  }
  return out.length ? out : fallback;
}

// ── Nested sanitizers ──
const navLink = (v: Record<string, unknown>, fb: { label: string; href: string }) => ({
  label: str(v.label, fb.label, 200),
  href: str(v.href, fb.href, 2000),
});

const timelineItem = (v: Record<string, unknown>, fb: TimelineItem): TimelineItem => ({
  year: str(v.year, fb.year, 200),
  role: str(v.role, fb.role, 300),
  desc: str(v.desc, fb.desc, 3000),
});

const stat = (v: Record<string, unknown>, fb: Stat): Stat => ({
  num: str(v.num, fb.num, 100),
  label: str(v.label, fb.label, 200),
});

const project = (v: Record<string, unknown>, fb: Project): Project => ({
  img: str(v.img, fb.img, 2000),
  date: str(v.date, fb.date, 200),
  title: str(v.title, fb.title, 300),
  desc: str(v.desc, fb.desc, 3000),
});

// ── Top-level sanitizer ──
export function sanitizeContent(raw: unknown): SiteContent {
  const r = isObj(raw) ? raw : {};
  const d = DEFAULT_CONTENT;
  const rMeta = isObj(r.meta) ? r.meta : {};
  const rNav = isObj(r.navbar) ? r.navbar : {};
  const rHero = isObj(r.hero) ? r.hero : {};
  const rAbout = isObj(r.about) ? r.about : {};
  const rWork = isObj(r.work) ? r.work : {};
  const rContact = isObj(r.contact) ? r.contact : {};
  const rFooter = isObj(r.footer) ? r.footer : {};
  const rTheme = isObj(r.theme) ? r.theme : {};
  const rFonts = isObj(rTheme.fonts) ? rTheme.fonts : {};
  const rCssVars = isObj(rTheme.cssVars) ? rTheme.cssVars : {};

  const meta: Meta = {
    title: str(rMeta.title, d.meta.title, 200),
    description: str(rMeta.description, d.meta.description, 2000),
    keywords: str(rMeta.keywords, d.meta.keywords, 1000),
  };

  const navbar: Navbar = {
    logoFirst: str(rNav.logoFirst, d.navbar.logoFirst, 200),
    logoLast: str(rNav.logoLast, d.navbar.logoLast, 200),
    links: mapObjects(rNav.links, d.navbar.links, (i) => navLink(i, d.navbar.links[0])),
  };

  const hero: Hero = {
    greeting: str(rHero.greeting, d.hero.greeting, 300),
    titleLines: strArr(rHero.titleLines, d.hero.titleLines, 4),
    subtitle: str(rHero.subtitle, d.hero.subtitle, 300),
    photoUrl: str(rHero.photoUrl, d.hero.photoUrl, 2000),
    photoAlt: str(rHero.photoAlt, d.hero.photoAlt, 300),
    resumeUrl: str(rHero.resumeUrl, d.hero.resumeUrl, 2000),
    resumeLabel: str(rHero.resumeLabel, d.hero.resumeLabel, 200),
  };

  const about: About = {
    heading: str(rAbout.heading, d.about.heading, 200),
    desc: str(rAbout.desc, d.about.desc, 5000),
    skillsHeading: str(rAbout.skillsHeading, d.about.skillsHeading, 200),
    skills: strArr(rAbout.skills, d.about.skills),
    funFactsHeading: str(rAbout.funFactsHeading, d.about.funFactsHeading, 200),
    stats: mapObjects(rAbout.stats, d.about.stats, (i) => stat(i, d.about.stats[0])),
    timeline: mapObjects(rAbout.timeline, d.about.timeline, (i) =>
      timelineItem(i, d.about.timeline[0])
    ),
  };

  const work: Work = {
    heading: str(rWork.heading, d.work.heading, 200),
    desc: str(rWork.desc, d.work.desc, 3000),
    projects: mapObjects(rWork.projects, d.work.projects, (i) => project(i, d.work.projects[0])),
  };

  const contact: Contact = {
    heading: str(rContact.heading, d.contact.heading, 200),
    desc: str(rContact.desc, d.contact.desc, 5000),
    imageUrl: str(rContact.imageUrl, d.contact.imageUrl, 2000),
    imageAlt: str(rContact.imageAlt, d.contact.imageAlt, 300),
    ctaLabel: str(rContact.ctaLabel, d.contact.ctaLabel, 200),
    ctaHref: str(rContact.ctaHref, d.contact.ctaHref, 2000),
    links: mapObjects(rContact.links, d.contact.links, (i) => navLink(i, d.contact.links[0])),
  };

  const footer: Footer = {
    text: str(rFooter.text, d.footer.text, 2000),
    highlight: str(rFooter.highlight, d.footer.highlight, 300),
  };

  const cssVars: Record<string, string> = {};
  for (const key of Object.keys(DEFAULT_CONTENT.theme.cssVars)) {
    const value = rCssVars[key];
    cssVars[key] = str(value, DEFAULT_CONTENT.theme.cssVars[key], 100);
  }
  // allow custom vars too (any `--foo: value` entries provided by the admin)
  for (const [key, value] of Object.entries(rCssVars)) {
    if (/^--[a-zA-Z0-9_-]+$/.test(key)) {
      cssVars[key] = str(value, cssVars[key] ?? "", 100);
    }
  }

  const theme: Theme = {
    cssVars,
    fonts: {
      heading: str(rFonts.heading, d.theme.fonts.heading, 100),
      display: str(rFonts.display, d.theme.fonts.display, 100),
      body: str(rFonts.body, d.theme.fonts.body, 100),
    },
    customCss: str(rTheme.customCss, "", 20000),
  };

  return { meta, navbar, hero, about, work, contact, footer, theme };
}