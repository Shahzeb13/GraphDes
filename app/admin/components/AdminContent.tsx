"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";
import { DEFAULT_CONTENT } from "@/lib/defaultContent";

interface AdminContentContextValue {
  content: SiteContent;
  loading: boolean;
  saving: boolean;
  error: string | null;
  save: (next: SiteContent) => Promise<boolean>;
}

const AdminContentContext = createContext<AdminContentContextValue | null>(null);

export function AdminContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site content");
        return res.json();
      })
      .then((data: SiteContent) => setContent(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(async (next: SiteContent): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save content");
      setContent(data.content ?? next);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <AdminContentContext.Provider value={{ content, loading, saving, error, save }}>
      {loading ? (
        <div className="a-loading">
          <div className="a-spinner" aria-hidden />
          <p className="a-loading-text">Loading site content…</p>
        </div>
      ) : (
        children
      )}
    </AdminContentContext.Provider>
  );
}

export function useAdminContent(): AdminContentContextValue {
  const ctx = useContext(AdminContentContext);
  if (!ctx) throw new Error("useAdminContent must be used within AdminContentProvider");
  return ctx;
}