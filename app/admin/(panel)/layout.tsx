import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { AdminContentProvider } from "../components/AdminContent";
import { AdminShell } from "../components/AdminShell";
import "../admin.css";

export const metadata: Metadata = {
  title: "Muhammad Rashid — Management Panel",
  description: "Management panel for Muhammad Rashid.",
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard: redirects to /admin/login when no valid session.
  const user = await requireAdmin();

  return (
    <AdminShell email={user.email}>
      <AdminContentProvider>{children}</AdminContentProvider>
    </AdminShell>
  );
}