"use client";

import { UtensilsCrossed } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/20" />
        {/* Inner Spinning Border */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        {/* Center Icon */}
        <UtensilsCrossed className="absolute h-6 w-6 text-primary animate-bounce" />
      </div>
      <h2 className="mt-6 text-lg font-bold tracking-tight text-slate-800 animate-pulse">
        Preparing something <span className="text-primary">delicious...</span>
      </h2>
    </div>
  );
}