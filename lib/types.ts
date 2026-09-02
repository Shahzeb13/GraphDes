export interface Meta {
  title: string;
  description: string;
  keywords: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Navbar {
  logoFirst: string;
  logoLast: string;
  links: NavLink[];
}

export interface Hero {
  greeting: string;
  titleLines: string[];
  subtitle: string;
  photoUrl: string;
  photoAlt: string;
  resumeUrl: string;
  resumeLabel: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  desc: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface About {
  heading: string;
  desc: string;
  skillsHeading: string;
  skills: string[];
  funFactsHeading: string;
  stats: Stat[];
  timeline: TimelineItem[];
}

export interface Project {
  img: string;
  date: string;
  title: string;
  desc: string;
}

export interface Work {
  heading: string;
  desc: string;
  projects: Project[];
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface Contact {
  heading: string;
  desc: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  links: ContactLink[];
}

export interface Footer {
  /** Full text. Use the {name} token to highlight your name. */
  text: string;
  /** The text rendered as the emphasized/highlighted part. */
  highlight: string;
}

export interface Theme {
  cssVars: Record<string, string>;
  fonts: {
    heading: string;
    display: string;
    body: string;
  };
  customCss: string;
}

export interface SiteContent {
  meta: Meta;
  navbar: Navbar;
  hero: Hero;
  about: About;
  work: Work;
  contact: Contact;
  footer: Footer;
  theme: Theme;
}