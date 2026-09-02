"use client";

import { useState } from "react";

export function SaveBar({
  onSave,
  saving,
  error,
}: {
  onSave: () => Promise<boolean>;
  saving: boolean;
  error?: string | null;
}) {
  const [flash, setFlash] = useState<"saved" | "failed" | null>(null);

  async function handleClick() {
    const ok = await onSave();
    setFlash(ok ? "saved" : "failed");
    if (ok) setTimeout(() => setFlash(null), 2500);
  }

  return (
    <div className="a-save-bar">
      <p className="a-save-bar-msg">
        {saving ? (
          <span className="saving">Saving…</span>
        ) : flash === "saved" ? (
          <span className="saved">✓ Changes saved</span>
        ) : flash === "failed" ? (
          <span className="failed">Save failed — try again</span>
        ) : (
          <span>Changes preview live as you type.</span>
        )}
        {error ? (
          <span style={{ marginLeft: 8, color: "var(--col-error)" }}>
            {error}
          </span>
        ) : null}
      </p>
      <button
        id="admin-save-changes"
        type="button"
        onClick={handleClick}
        disabled={saving}
        className="a-btn a-btn-primary"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}