import { Award, Target, Trophy, Users } from "lucide-react";
import UpcomingFeatureCard from "./UpcomingFeatureCard";

export default function UpcomingGamification() {
  return (
    <UpcomingFeatureCard
      eyebrow="Upcoming Gamification"
      title="Make progress feel visible and motivating"
      description="The next release wave adds more ways to celebrate consistency, build habits, and stay engaged without making the product feel noisy."
      accentClassName="bg-amber-100 text-amber-800"
      features={[
        {
          title: "Badges and achievements",
          description: "Earn badges for streaks, focus sessions completed, and daily limits held consistently.",
          icon: Award,
        },
        {
          title: "Weekly challenges",
          description: "Try goals like staying under one hour on social media for five days in a row.",
          icon: Target,
        },
        {
          title: "Friend and team leaderboards",
          description: "Compete with friends or teammates if you want a little accountability and fun.",
          icon: Users,
        },
        {
          title: "Progress trophies",
          description: "See a clearer snapshot of wins over time so the extension feels more rewarding to use.",
          icon: Trophy,
        },
      ]}
    />
  );
}