"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ── Navigation definition ── */
const NAV_GROUPS = [
  {
    label: "Content",
    items: [
      { href: "/admin",         label: "Profile",  icon: "person"          },
      { href: "/admin/about",   label: "About",    icon: "info"            },
      { href: "/admin/work",    label: "Work",     icon: "folder_open"     },
      { href: "/admin/contact", label: "Contact",  icon: "mail"            },
    ],
  },
  {
    label: "Configure",
    items: [
      { href: "/admin/settings", label: "Settings", icon: "settings"      },
      { href: "/admin/account",  label: "Account",  icon: "manage_accounts"},
    ],
  },
];

/* Top bar sub-tabs */
const TOP_TABS = [
  { href: "/admin",          label: "Overview" },
  { href: "/admin/about",    label: "Activity" },
  { href: "/admin/work",     label: "Assets"   },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Close the mobile drawer + dropdown whenever the route changes */
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  /* Close the mobile drawer with the Escape key */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  function isActive(href: string) {
    return (
      pathname === href ||
      (href !== "/admin" && pathname.startsWith(href))
    );
  }

  /* Which top-tab is active */
  const activeTopTab =
    TOP_TABS.find((t) => isActive(t.href))?.href ?? "/admin";

  return (
    <div className="admin-scope">

      {/* ══ DESKTOP: Side Nav ══ */}
      <aside className="a-side-nav" aria-label="Primary navigation">

        {/* Brand block */}
        <div className="a-brand">
          <div className="a-brand-logo">
            <div className="a-brand-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, color: "var(--col-primary)", fontVariationSettings: "'FILL' 1" }}
                aria-hidden
              >
                palette
              </span>
            </div>
            <span className="a-brand-name">
              Muhammad <em>Rashid</em>
            </span>
          </div>
          <p className="a-brand-sub">Management Panel</p>

          {/* "View site" styled as the primary CTA pill */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="a-view-site-btn"
            id="admin-view-site"
          >
            View Site ↗
          </Link>
        </div>

        {/* Nav groups */}
        <nav className="a-nav" aria-label="Admin sections">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="a-nav-group-label">{group.label}</p>
              <div className="a-nav-items">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      id={`admin-nav-${item.label.toLowerCase()}`}
                      className={`a-nav-link${active ? " active" : ""}`}
                    >
                      <span
                        className="material-symbols-outlined"
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                      {item.label}
                      {active && (
                        <span className="a-nav-link-badge" aria-hidden />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: user row + logout */}
        <div className="a-nav-footer">
          {/* Support link (decorative — matches mockup bottom-of-sidebar item) */}
          <Link
            href="/"
            target="_blank"
            className="a-nav-link"
            style={{ marginBottom: 8 }}
          >
            <span className="material-symbols-outlined" aria-hidden>
              help
            </span>
            Support
          </Link>

          <div className="a-user-row">
            <div className="a-user-avatar" aria-hidden>
              {email.slice(0, 1).toUpperCase()}
            </div>
            <div className="a-user-info">
              <p className="a-user-email">{email}</p>
              <p className="a-user-role">Administrator</p>
            </div>
            <button
              type="button"
              id="admin-logout-sidebar"
              onClick={logout}
              className="a-logout-btn"
              title="Sign out"
              aria-label="Sign out"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* ══ DESKTOP: Top App Bar ══ */}
      <header className="a-top-bar" role="banner">
        {/* Left: logo wordmark + sub-tabs */}
        <div className="a-top-bar-left">
          <Link href="/admin" className="a-brand-logo" style={{ marginRight: 20, textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 800,
                color: "var(--col-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Muhammad <em style={{ fontStyle: "normal", color: "var(--col-on-surface)" }}>Rashid</em>
            </span>
          </Link>
          <nav className="a-top-tabs" aria-label="Top navigation">
            {TOP_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                id={`admin-top-tab-${tab.label.toLowerCase()}`}
                className={`a-top-tab${activeTopTab === tab.href ? " active" : ""}`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: search + icons + avatar */}
        <div className="a-top-bar-right">
          {/* Avatar with dropdown */}
          <div style={{ position: "relative" }}>
            {/* Close dropdown overlay */}
            {dropdownOpen && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: 10 }}
                onClick={() => setDropdownOpen(false)}
                aria-hidden
              />
            )}
            <button
              type="button"
              id="admin-avatar-menu"
              className="a-avatar-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label={`Account menu for ${email}`}
            >
              {email.slice(0, 1).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div
                className="a-avatar-dropdown"
                role="menu"
                aria-label="Account menu"
                style={{ zIndex: 20 }}
              >
                <p className="a-avatar-dropdown-email">{email}</p>

                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-dropdown-link"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  View site
                </Link>
                <Link
                  href="/admin/account"
                  className="a-dropdown-link"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined">manage_accounts</span>
                  Account settings
                </Link>
                <button
                  type="button"
                  id="admin-logout-dropdown"
                  className="a-dropdown-link danger"
                  role="menuitem"
                  onClick={() => { setDropdownOpen(false); logout(); }}
                >
                  <span className="material-symbols-outlined">logout</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══ MOBILE: Top App Bar ══ */}
      <header className="a-mobile-top-bar" role="banner">
        <Link href="/admin" className="a-mobile-brand">
          Muhammad <em>Rashid</em>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

          {/* Hamburger — opens the mobile drawer */}
          <button
            type="button"
            id="admin-mobile-menu-btn"
            className="a-hamburger-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="admin-mobile-drawer"
          >
            <span className="material-symbols-outlined" aria-hidden>
              {menuOpen ? "close" : "menu"}
            </span>
          </button>

          {/* Avatar — opens the account menu (does NOT log out) */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              id="admin-mobile-avatar"
              className="a-avatar-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label={`Account menu for ${email}`}
              title={`Signed in as ${email}`}
            >
              {email.slice(0, 1).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div
                className="a-avatar-dropdown"
                role="menu"
                aria-label="Account menu"
                style={{ zIndex: 20 }}
              >
                <p className="a-avatar-dropdown-email">{email}</p>

                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-dropdown-link"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  View site
                </Link>
                <Link
                  href="/admin/account"
                  className="a-dropdown-link"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined">manage_accounts</span>
                  Account settings
                </Link>
                <button
                  type="button"
                  id="admin-logout-dropdown"
                  className="a-dropdown-link danger"
                  role="menuitem"
                  onClick={() => { setDropdownOpen(false); logout(); }}
                >
                  <span className="material-symbols-outlined">logout</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══ MAIN CONTENT ══ */}
      <div className="a-main-wrap">
        <main className="a-main" id="admin-main-content">
          {children}
        </main>
      </div>

      {/* ══ MOBILE: Hamburger Drawer (all sidebar sections) ══ */}
      {menuOpen && (
        <div
          className="a-drawer-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
      <nav
        id="admin-mobile-drawer"
        className={`a-mobile-drawer${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="a-drawer-header">
          <span className="a-mobile-brand">
            Muhammad <em>Rashid</em>
          </span>
          <button
            type="button"
            className="a-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <span className="material-symbols-outlined" aria-hidden>
              close
            </span>
          </button>
        </div>

        <div className="a-drawer-groups">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="a-drawer-group">
              <p className="a-nav-group-label">{group.label}</p>
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    id={`admin-drawer-${item.label.toLowerCase()}`}
                    className={`a-nav-link${active ? " active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="a-drawer-footer">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="a-nav-link"
          >
            <span className="material-symbols-outlined" aria-hidden>
              open_in_new
            </span>
            View site
          </Link>
          <button
            type="button"
            id="admin-drawer-logout"
            className="a-nav-link a-drawer-logout"
            onClick={logout}
          >
            <span className="material-symbols-outlined" aria-hidden>
              logout
            </span>
            Sign out
          </button>
        </div>
      </nav>


    </div>
  );
}