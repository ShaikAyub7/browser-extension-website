import { CalendarClock, Cloud, FileDown, Share2 } from "lucide-react";
import UpcomingFeatureCard from "./UpcomingFeatureCard";

export default function UpcomingSyncData() {
  return (
    <UpcomingFeatureCard
      eyebrow="Upcoming Sync & Data"
      title="Keep the same setup and rules across every browser"
      description="These features focus on portability and cross-device convenience so your beta setup follows you everywhere."
      accentClassName="bg-sky-100 text-sky-700"
      features={[
        {
          title: "Cloud sync across devices",
          description: "Sync your setup across Chrome, Edge, and Firefox so your stats and settings stay aligned everywhere.",
          icon: Cloud,
        },
        {
          title: "Google Calendar integration",
          description: "Automatically block social sites when calendar events begin, so focus mode matches your schedule.",
          icon: CalendarClock,
        },
        {
          title: "Import/export presets",
          description: "Share block lists and preset configurations with teammates or move them between browsers faster.",
          icon: FileDown,
        },
        {
          title: "Shareable setup profiles",
          description: "Save a setup once and reuse it whenever you want to switch between work, study, or personal modes.",
          icon: Share2,
        },
      ]}
    />
  );
}