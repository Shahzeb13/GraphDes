"use client";

import { useState } from "react";
import { Card, Field, PageHeader, TextInput } from "../../components/ui";

export default function AccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          email: email.trim() || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update account");
      setMessage({ type: "ok", text: `Account updated ✓ (${data.email})` });
      setCurrentPassword("");
      setNewPassword("");
      setEmail("");
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Account" subtitle="Update your admin email or password. Your current password is required." />

      <Card title="Change email or password" icon="◎">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Current password (required to make changes)">
            <TextInput
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="••••••••"
            />
          </Field>
          <Field label="New email (leave empty to keep current)">
            <TextInput type="email" value={email} onChange={setEmail} placeholder="admin@rashid.dev" />
          </Field>
          <Field label="New password (leave empty to keep current)" hint="At least 8 characters.">
            <TextInput
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="••••••••"
            />
          </Field>

          {message ? (
            <p className={message.type === "ok" ? "a-msg-ok" : "a-msg-error"}>
              {message.text}
            </p>
          ) : null}

          <button
            id="admin-update-account"
            type="submit"
            disabled={loading || !currentPassword}
            className="a-btn a-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Saving…" : "Update account"}
          </button>
        </form>
      </Card>
    </div>
  );
}