import type { SiteContent } from "./types";

/**
 * DEFAULT_CONTENT is a 1:1 mirror of the hardcoded portfolio that was
 * running before the CMS was added. It is used both as the initial seed
 * for MongoDB and as a safe fallback whenever the database is unreachable.
 */
export const DEFAULT_CONTENT: SiteContent = {
  meta: {
    title: "Muhammad Rashid — Graphic Designer | Attock, Pakistan",
    description:
      "Portfolio of Muhammad Rashid, a creative graphic designer based in Attock, Pakistan. Specializing in brand identity, visual design, and digital illustration.",
    keywords:
      "graphic designer, Muhammad Rashid, Attock, Pakistan, brand identity, logo design, visual design",
  },
  navbar: {
    logoFirst: "Muhammad",
    logoLast: "Rashid",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
  hero: {
    greeting: "Hello, I'm Muhammad.",
    titleLines: ["Graphic", "Designer"],
    subtitle: "based in Attock, Pakistan.",
    photoUrl: "/rashid_profile.png",
    photoAlt: "Muhammad Rashid — Graphic Designer",
    resumeUrl: "/resume.pdf",
    resumeLabel: "Resume ↓",
  },
  about: {
    heading: "about.",
    desc: "I'm a passionate graphic designer with over 6 years of experience crafting compelling visual identities, illustrations, and digital experiences. I believe great design is the intersection of art and communication — it should tell a story and leave a lasting impression.",
    skillsHeading: "Tools & Skills",
    skills: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Figma",
      "After Effects",
      "Brand Identity",
      "Typography",
      "Packaging Design",
      "UI / UX",
      "Motion Graphics",
      "Logo Design",
      "Editorial Design",
    ],
    funFactsHeading: "By The Numbers",
    stats: [
      { num: "6+", label: "Years of Experience" },
      { num: "80+", label: "Projects Completed" },
      { num: "40+", label: "Happy Clients" },
      { num: "12+", label: "Design Awards" },
    ],
    timeline: [
      {
        year: "2018 – 2020",
        role: "Junior Designer at CreativeHub",
        desc: "Started my journey creating brand collateral, social media graphics, and marketing materials for local businesses in Punjab.",
      },
      {
        year: "2020 – 2022",
        role: "Mid-Level Designer at PixelForge",
        desc: "Led visual identity projects for startups across Pakistan and the UAE. Delivered end-to-end branding including logo systems, typography, and brand guidelines.",
      },
      {
        year: "2022 – Present",
        role: "Senior Graphic Designer — Freelance",
        desc: "Working with international clients on brand identity, packaging design, editorial design, and digital illustrations. Based in Attock, working globally.",
      },
    ],
  },
  work: {
    heading: "work.",
    desc: "A curated selection of projects — from brand identity systems to packaging design and digital illustration.",
    projects: [
      {
        img: "/work1.png",
        date: "March 2024",
        title: "Zest Brand Identity",
        desc: "Complete visual identity for a premium food & beverage startup — logo, packaging, brand guidelines, and social media templates.",
      },
      {
        img: "/work2.png",
        date: "January 2024",
        title: "Flux UI Design System",
        desc: "A scalable UI component library and design system created in Figma for a SaaS product, covering typography, color, and patterns.",
      },
      {
        img: "/work3.png",
        date: "October 2023",
        title: "Terra Packaging Suite",
        desc: "Eco-conscious packaging design for an organic skincare brand — labels, boxes, and retail point-of-sale materials.",
      },
      {
        img: "/work1.png",
        date: "July 2023",
        title: "Novatype Editorial",
        desc: "Editorial design and typography system for a bi-annual architecture magazine, including layout grids, pull quotes, and infographics.",
      },
    ],
  },
  contact: {
    heading: "contact.",
    desc: "I'm always open to exciting projects, collaborations, and creative conversations. Whether you need a fresh brand identity, a packaging redesign, or a passion project — let's make something great together.",
    imageUrl: "/work2.png",
    imageAlt: "Design workspace",
    ctaLabel: "Say Hello →",
    ctaHref: "mailto:rashidkhan@gmail.com",
    links: [
      { label: "rashidkhan@gmail.com", href: "mailto:rashidkhan@gmail.com" },
      { label: "behance.net/rashidkhan", href: "#" },
      {
        label: "instagram.com/muhammadrashid3733",
        href: "https://www.instagram.com/muhammadrashid3733?igsh=MWtxZHpxcHNhcHk4dQ==",
      },
      { label: "linkedin.com/in/rashidkhan", href: "#" },
    ],
  },
  footer: {
    text: "© 2024 {name} — Graphic Designer · Attock, Pakistan",
    highlight: "Muhammad Rashid",
  },
  theme: {
    cssVars: {
      "--cream": "#f7f6e7",
      "--cream-dark": "#eeeccc",
      "--navy": "#1a1a3e",
      "--navy-mid": "#2c2c5e",
      "--accent": "#c8b400",
      "--accent-light": "#e8d44d",
      "--accent-bg": "#f0e96a22",
      "--text-muted": "#6b6b6b",
      "--border": "#dddbb0",
      "--white": "#ffffff",
    },
    fonts: {
      heading: "Syne",
      display: "Cormorant Garamond",
      body: "DM Sans",
    },
    customCss: "",
  },
};