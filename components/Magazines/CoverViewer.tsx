"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Magazine } from "@/types/MagazineTypes";

export default function CoverViewer({
  magazine,
  open,
  onClose,
  onPrev,
  onNext,
}: {
  magazine: Magazine;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Freeze page scroll while the viewer is open
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${magazine.title} cover`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#141313]/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-5 font-mono text-[12px]">
            <span className="text-[#F3F0EC]/60">
              <span className="text-[#FACB8D]">No. {magazine.issue}</span> —{" "}
              {magazine.series}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#F3F0EC]/30 text-[#F3F0EC]/80
                transition-colors hover:border-[#B8862B] hover:text-[#FACB8D] cursor-pointer"
            >
              close [esc]
            </button>
          </div>

          {/* Cover */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center gap-4 px-4 md:px-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous issue"
              className="hidden md:flex shrink-0 w-11 h-11 items-center justify-center rounded-full
                border border-[#F3F0EC]/30 hover:bg-[#B8862B]/20 transition-colors cursor-pointer"
            >
              <Image
                src="/icons/arrow-left.png"
                alt=""
                width={50}
                height={50}
                className="w-[16px] h-auto"
              />
            </button>

            <div
              className="relative h-full aspect-[2/3] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={magazine.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={magazine.cover}
                    alt={magazine.title}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next issue"
              className="hidden md:flex shrink-0 w-11 h-11 items-center justify-center rounded-full
                border border-[#B8862B] hover:bg-[#B8862B]/20 transition-colors cursor-pointer"
            >
              <Image
                src="/icons/arrow-right.png"
                alt=""
                width={50}
                height={50}
                className="w-[16px] h-auto"
              />
            </button>
          </div>

          {/* Caption */}
          <div className="px-6 py-5 text-center">
            <p className="text-[22px] text-[#F3F0EC] font-serif">
              {magazine.title}
            </p>
            <p className="mt-1 text-[15px] italic text-[#FACB8D] font-serif">
              {magazine.titleJp}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
