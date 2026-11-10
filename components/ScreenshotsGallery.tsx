"use client";
import Image from "next/image";
import { useState } from "react";

const IMAGES = [
  { src: "/screens/1.png", alt: "Dashboard overview" },
  { src: "/screens/2.png", alt: "Focus session" },
  { src: "/screens/3.png", alt: "Site limits" },
];

export default function ScreenshotsGallery() {
  const [idx, setIdx] = useState(0);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        {IMAGES.map((i, j) => (
          <div key={i.src} className="rounded-xl overflow-hidden border bg-white dark:bg-[#071022]">
            <Image src={i.src} alt={i.alt} width={400} height={240} className="object-cover w-full h-44" />
            <div className="p-3 text-sm">{i.alt}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full ${idx===i?"bg-violet-600":"bg-gray-200"}`}></button>
        ))}
      </div>
    </div>
  );
}
