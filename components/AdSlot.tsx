"use client";
import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto"|"rectangle"|"horizontal"|"vertical";
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

export default function AdSlot({ slot, format="auto", className="", style={} }: AdSlotProps) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);

  return (
    <div className={`ad-slot overflow-hidden ${className}`} style={style} aria-label="Advertisement">
      <ins className="adsbygoogle"
        style={{display:"block",...style}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"/>
    </div>
  );
}
