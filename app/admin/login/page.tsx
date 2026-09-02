"use client";

import Link from "next/link";
import { useState } from "react";
import "../admin.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/admin";
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="admin-scope a-login-wrap">
      <div className="a-login-box">

        {/* Brand mark */}
        <div className="a-login-brand">
          <div className="a-login-brand-mark">
            <span
              className="material-symbols-outlined"
              aria-hidden
            >
              palette
            </span>
          </div>
          <p className="a-login-eyebrow">Management Panel</p>
          <h1 className="a-login-title">Muhammad <em style={{ fontStyle: "normal", color: "var(--col-primary)" }}>Rashid</em></h1>
          <p className="a-login-subtitle">Sign in to customize your portfolio.</p>
        </div>

        {/* Login card */}
        <div className="a-login-card">
          <form id="admin-login-form" onSubmit={handleSubmit} className="a-login-form">

            {/* Email field */}
            <label className="a-field">
              <span className="a-field-label">Email</span>
              <input
                id="admin-login-email"
                type="email"
                autoComplete="email"
                className="a-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz@gmail.com"
                required
              />
            </label>

            {/* Password field */}
            <label className="a-field">
              <span className="a-field-label">Password</span>
              <input
                id="admin-login-password"
                type="password"
                autoComplete="current-password"
                className="a-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            {/* Error message */}
            {error ? (
              <div className="a-login-error" role="alert">
                <span
                  className="material-symbols-outlined"
                  aria-hidden
                  style={{ fontSize: 18, flexShrink: 0 }}
                >
                  warning
                </span>
                {error}
              </div>
            ) : null}

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="a-btn a-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="a-login-footer">
          {/* <p className="a-login-footer-note">
            First time? Run{" "}
            <code>npm run seed</code>{" "}
            to create the admin account from your environment variables.
          </p> */}
          <Link href="/" className="a-login-back">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}