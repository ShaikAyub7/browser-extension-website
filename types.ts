import { LucideIcon } from "lucide-react";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface Release {
  version: string; date: string; tag?: "latest"|"major"|"hotfix"|"comingSoon";
  headline: string; summary: string; changes: Change[]; highlight?: string;
}
export type ChangeKind = "new"|"improved"|"fixed"|"removed"|"security";
export interface Change { kind: ChangeKind; text: string; }
