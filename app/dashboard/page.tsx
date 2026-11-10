import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard — Tab Time Tracker",
  description:
    "Upload your extension export and view a dashboard with site usage, total time, and browsing summaries.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}