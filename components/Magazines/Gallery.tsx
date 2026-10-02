"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { magazines } from "@/data/MagazinesData";
import CoverViewer from "./CoverViewer";

const pad = (n: number) => String(n).padStart(2, "0");

function ViewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B8862B]
        font-mono text-[12px] text-[#FACB8D] transition-colors duration-300
        hover:bg-[#B8862B]/20 cursor-pointer"
    >
      view_cover
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </button>
  );
}

function SiteButton({ slug }: { slug: string }) {
  return (
    <Link
      href={`/magazines/${slug}`}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B8862B] bg-[#B8862B]
        font-mono text-[12px] text-[#201E1E] transition-colors duration-300
        hover:bg-[#FACB8D] hover:border-[#FACB8D]"
    >
      go_to_site
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function Controls({
  index,
  total,
  onPrev,
  onNext,
  className = "",
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <span className="font-mono text-[13px] text-[#F3F0EC]/70">
        {pad(index + 1)} / {pad(total)}
      </span>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous issue"
          className="w-10 h-10 flex justify-center items-center cursor-pointer
          rounded-full border border-[#F3F0EC]/30 transition-all duration-300
          hover:bg-[#B8862B]/20 hover:scale-105"
        >
          <Image
            src={"/icons/arrow-left.png"}
            alt=""
            width={50}
            height={50}
            className="w-[16px] h-auto object-contain"
          />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next issue"
          className="w-10 h-10 flex justify-center items-center cursor-pointer
          rounded-full border border-[#B8862B] transition-all duration-300
          hover:bg-[#B8862B]/20 hover:scale-105"
        >
          <Image
            src={"/icons/arrow-right.png"}
            alt=""
            width={50}
            height={50}
            className="w-[16px] h-auto object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [viewing, setViewing] = useState(false);
  const closeViewer = useCallback(() => setViewing(false), []);
  const total = magazines.length;
  const active = magazines[index];

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Arrow keys browse issues (ignored while typing in a field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // Keep the mobile track and desktop thumbnail row in sync with the active issue
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (track && card && Math.abs(track.scrollLeft - card.offsetLeft) > 2) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }

    const thumbs = thumbsRef.current;
    const thumb = thumbs?.children[index] as HTMLElement | undefined;
    if (thumbs && thumb) {
      thumbs.scrollTo({
        left: thumb.offsetLeft - (thumbs.clientWidth - thumb.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [index]);

  // When the user swipes the mobile track, pick the card it settled on
  const onTrackScroll = () => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      let nearest = 0;
      cards.forEach((card, i) => {
        if (
          Math.abs(card.offsetLeft - track.scrollLeft) <
          Math.abs(cards[nearest].offsetLeft - track.scrollLeft)
        )
          nearest = i;
      });
      setIndex(nearest);
    }, 120);
  };

  return (
    <section className="w-full h-full py-10 bg-[#252323]">
      <div className="w-full px-6 xl:px-0 max-w-[1280px] 3xl:max-w-[1350px] h-full mx-auto flex flex-col mt-10">
        {/* Header */}
        <div className="flex pb-6 justify-between items-end border-b border-[#F3F0EC]/15">
          <div>
            <h2 className="mt-3 text-[44px] md:text-[64px] text-[#F3F0EC] leading-[1.05] font-serif">
              Covers & <br className="md:hidden" />
              <em className="text-[#B8862B]">Collections</em>
            </h2>
          </div>
          <div className="hidden lg:block pb-2">
            <Controls index={index} total={total} onPrev={prev} onNext={next} />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-[400px_1fr] gap-16 mt-13.5">
          {/* Preview */}
          <div className="relative w-full aspect-[2/3] p-3 rounded-sm border border-[#B8862B]/70 shadow-2xl shadow-black/40">
            <button
              type="button"
              onClick={() => setViewing(true)}
              aria-label={`View ${active.title} cover`}
              className="relative block w-full h-full rounded-sm overflow-hidden cursor-zoom-in"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <Image
                    src={active.cover}
                    alt={active.title}
                    fill
                    sizes="400px"
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-black/60 font-mono text-[11px] tracking-widest text-[#FACB8D]">
                VOL. {active.issue}
              </span>
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 font-mono text-[12px]">
                  <span className="text-[#FACB8D]">No. {active.issue}</span>
                  <span className="h-px w-8 bg-[#B8862B]/70" />
                  <span className="text-[#F3F0EC]/60">{active.series}</span>
                </div>
                <h3 className="mt-6 text-[64px] xl:text-[76px] leading-[1.05] text-[#F3F0EC] font-serif">
                  {active.title}
                </h3>
                <p className="mt-5 text-[20px] italic text-[#FACB8D] font-serif">
                  {active.titleJp}
                </p>
                <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed italic text-[#F3F0EC]/80 font-serif">
                  {active.description}
                </p>

                <div className="mt-10 flex gap-12 font-mono">
                  <div>
                    <span className="block text-[11px] text-[#F3F0EC]/50">
                      palette
                    </span>
                    <div className="mt-3 flex gap-1.5">
                      {active.palette.map((color) => (
                        <span
                          key={color}
                          className="size-3 rounded-full border border-[#F3F0EC]/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#F3F0EC]/50">
                      format
                    </span>
                    <span className="block mt-2 text-[12px] text-[#F3F0EC]">
                      {active.format}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#F3F0EC]/50">
                      year
                    </span>
                    <span className="block mt-2 text-[12px] text-[#F3F0EC]">
                      {active.year}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <ViewButton onClick={() => setViewing(true)} />
                    <SiteButton slug={active.slug} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* More issues */}
            <div className="mt-auto pt-12">
              <div className="flex justify-between font-mono text-[11px] text-[#F3F0EC]/50">
                <span>more_issues</span>
                <span>← → to browse</span>
              </div>
              <div
                ref={thumbsRef}
                className="relative mt-3 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]"
              >
                {magazines.map((mag, i) => (
                  <button
                    key={mag.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${mag.title}`}
                    aria-current={i === index}
                    className="group w-[150px] shrink-0 text-left cursor-pointer"
                  >
                    <div
                      className={`relative aspect-[3/4] p-1.5 rounded-sm border transition-colors duration-300 ${
                        i === index
                          ? "border-[#B8862B]"
                          : "border-[#F3F0EC]/15 group-hover:border-[#B8862B]/50"
                      }`}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-sm">
                        <Image
                          src={mag.cover}
                          alt=""
                          fill
                          sizes="150px"
                          className={`object-cover object-top transition-opacity duration-300 ${
                            i === index
                              ? "opacity-100"
                              : "opacity-60 group-hover:opacity-90"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-[11px]">
                      <span className="text-[#F3F0EC]/70">{mag.slug}</span>
                      <span className="text-[#FACB8D]">{mag.issue}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden mt-8">
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="relative -mr-6 flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]"
          >
            {magazines.map((mag, i) => (
              <button
                key={mag.slug}
                type="button"
                onClick={() => go(i)}
                className="w-[75%] sm:w-[55%] shrink-0 snap-start text-left last:mr-6"
              >
                <div
                  className={`relative aspect-[2/3] p-2 rounded-sm border transition-colors duration-300 ${
                    i === index ? "border-[#B8862B]" : "border-[#F3F0EC]/15"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src={mag.cover}
                      alt={mag.title}
                      fill
                      sizes="(min-width: 640px) 55vw, 75vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between font-mono text-[12px]">
                  <span className="text-[#FACB8D]">No. {mag.issue}</span>
                  <span className="text-[#F3F0EC]/60">{mag.year}</span>
                </div>
                <h3 className="mt-2 text-[24px] leading-tight text-[#F3F0EC] font-sans">
                  {mag.title}
                </h3>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <p className="text-[18px] italic text-[#FACB8D] font-serif">
                {active.titleJp}
              </p>
              <p className="mt-3 text-[16px] leading-relaxed italic text-[#F3F0EC]/80 font-serif">
                {active.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ViewButton onClick={() => setViewing(true)} />
                <SiteButton slug={active.slug} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-[#F3F0EC]/15">
            <Controls
              index={index}
              total={total}
              onPrev={prev}
              onNext={next}
              className="justify-between"
            />
          </div>
        </div>
      </div>

      <CoverViewer
        magazine={active}
        open={viewing}
        onClose={closeViewer}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
