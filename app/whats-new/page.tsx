import type { Metadata } from "next";
import WhatsNewClient from "./WhatsNewClient";

export const metadata: Metadata = {
  title: "What's New — Tab Time Tracker",
  description:
    "Full release history and changelog for Tab Time Tracker. See every new feature, fix, and improvement across all versions.",
};

export default function WhatsNewPage() {
  return <WhatsNewClient />;
}
