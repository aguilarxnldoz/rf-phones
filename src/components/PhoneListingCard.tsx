"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhoneListingProps {
  id: string;
  brand: string;
  model: string;
  imageUrl: string;
  financePrice: number;
  financeTerm: number;
  fullPrice: number;
  features: string[];
  badge?: string;
  className?: string;
}

export function PhoneListingCard({
  brand,
  model,
  imageUrl,
  financePrice,
  financeTerm,
  fullPrice,
  features,
  badge,
  className,
}: PhoneListingProps) {
  return (
    <div
      className={cn(
        // Perf notes:
        // - Removed `backdrop-blur-md`: composited blur over every card in a
        //   grid was a major repaint cost on hover and during scroll.
        // - Removed `box-shadow` from the transition list and from hover:
        //   animating shadow forces a paint each frame. Glow is provided by
        //   the cheaper radial-gradient overlay below.
        // - Limited transitions to `transform` + `colors` (cheap, GPU-friendly).
        "group relative flex flex-col rounded-2xl bg-dark-card/80 border border-white/5 p-6 transition-transform transition-colors duration-200 hover:border-primary/30 hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {badge && (
        <span className="absolute top-4 left-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
          {badge}
        </span>
      )}

      <div className="relative mb-6 mt-4 flex h-[240px] items-center justify-center p-4">
        {/* Static glow behind phone, faded in on hover via opacity only (cheap, compositor-only). */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(163,0,21,0.4)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${brand} ${model}`}
          // Removed `drop-shadow-2xl`: combining a filter() with a hover
          // scale transform re-rasterized the image every frame.
          className="relative z-10 h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="mb-1 text-sm font-medium text-gray-400">{brand}</div>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-white">{model}</h3>

        <div className="mb-4 flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-gray-300 border border-white/10"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-end gap-1 mb-1">
            <span className="text-3xl font-bold text-white">${financePrice.toFixed(2)}</span>
            <span className="text-sm text-gray-400 mb-1">/mo. for {financeTerm} mo.</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500 line-through">
              Full price: ${fullPrice.toFixed(2)}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-primary group-hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
