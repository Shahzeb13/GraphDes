import type { Navbar as NavbarData } from "@/lib/types";

export default function Navbar({ logoFirst, logoLast, links }: NavbarData) {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo" aria-label={`${logoFirst} ${logoLast}`}>
        <span className="logo-first">{logoFirst}</span>
        <span className="logo-dot">✦</span>
        <span className="logo-last">{logoLast}</span>
      </a>

      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}