"use client";

import type { ReactNode } from "react";

/* ─────────────────────────────────────────────
   inputClass — used by login page (imported externally)
───────────────────────────────────────────── */
export const inputClass = "a-input";

/* ─────────────────────────────────────────────
   Field
───────────────────────────────────────────── */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="a-field">
      <span className="a-field-label">{label}</span>
      {children}
      {hint ? <span className="a-field-hint">{hint}</span> : null}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Snippet — label + block wrapper
───────────────────────────────────────────── */
export function Snippet({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="a-snippet-label">{label}</p>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TextInput
───────────────────────────────────────────── */
export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      className="a-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ─────────────────────────────────────────────
   TextArea
───────────────────────────────────────────── */
export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className="a-input"
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ─────────────────────────────────────────────
   Button
───────────────────────────────────────────── */
export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
}) {
  const variantClass =
    variant === "primary"
      ? "a-btn-primary"
      : variant === "danger"
        ? "a-btn-danger"
        : "a-btn-ghost";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`a-btn ${variantClass}`}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Card
───────────────────────────────────────────── */
export function Card({
  title,
  icon,
  actions,
  children,
}: {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="a-card">
      <header className="a-card-header">
        <h2 className="a-card-title">
          {icon ? (
            <span className="a-card-icon" aria-hidden>
              {icon}
            </span>
          ) : null}
          {title}
        </h2>
        {actions}
      </header>
      <div className="a-card-body">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PageHeader
───────────────────────────────────────────── */
export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="a-page-header">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}