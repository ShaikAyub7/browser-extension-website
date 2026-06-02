import { GripVertical, LayoutDashboard, Palette, PanelTop } from "lucide-react";
import UpcomingFeatureCard from "./UpcomingFeatureCard";

export default function UpcomingUiUx() {
  return (
    <UpcomingFeatureCard
      eyebrow="Upcoming UI / UX"
      title="A more flexible dashboard and a lighter daily workflow"
      description="These are the next usability upgrades we want to ship so the extension feels more personal and easier to use at a glance."
      accentClassName="bg-violet-100 text-violet-700"
      features={[
        {
          title: "Drag-and-drop site ordering",
          description: "Reorder your most-visited sites by dragging them into the layout that matches how you actually work.",
          icon: GripVertical,
        },
        {
          title: "Customizable dashboard widgets",
          description: "Choose which widgets appear on the dashboard so the popup only shows the numbers you care about most.",
          icon: LayoutDashboard,
        },
        {
          title: "Themes and accent colors",
          description: "Go beyond just light and dark mode with accent color options and a more expressive visual style.",
          icon: Palette,
        },
        {
          title: "Mini mode floating widget",
          description: "A tiny overlay that shows live time on the current tab without opening the full popup.",
          icon: PanelTop,
        },
      ]}
    />
  );
}