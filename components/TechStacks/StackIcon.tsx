"use client";

import { useEffect, useState } from "react";

type StackIconProps = {
  src: string;
  label: string;
  className?: string;
};

const initials = (label: string) =>
  label
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Renders a monochrome PNG as a mask so it takes the current text colour.
 * Falls back to the label's initials if the image is missing.
 */
export default function StackIcon({ src, label, className = "" }: StackIconProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onerror = () => setFailedSrc(src);
    img.src = src;
    return () => {
      img.onerror = null;
    };
  }, [src]);

  if (failedSrc === src) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <text
          x="12"
          y="12"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="10"
          fill="currentColor"
          className="font-mono"
        >
          {initials(label)}
        </text>
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
