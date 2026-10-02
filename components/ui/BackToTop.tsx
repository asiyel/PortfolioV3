"use client";

import { useLenis } from "lenis/react";

export default function BackToTop() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group flex items-center gap-2 text-[#FACB8D] hover:text-[#F3F0EC] transition-colors cursor-pointer"
    >
      back_to_top
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 transition-transform group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
