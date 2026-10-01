"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { techStack } from "@/data/TechStacksData";
import Scanner from "@/components/TechStacks/Scanner";
import StackIcon from "@/components/TechStacks/StackIcon";

const MONO = "font-mono text-[10px] tracking-[0.22em] text-[#8d8579]";
const NO_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const pad = (n: number) => String(n).padStart(2, "0");

/** Scroll a horizontal row so its active child sits in the middle. */
const centerActive = (row: HTMLElement | null) => {
  const el = row?.querySelector<HTMLElement>('[data-active="true"]');
  if (!row || !el || row.scrollWidth <= row.clientWidth) return;
  row.scrollTo({
    left: el.offsetLeft - row.clientWidth / 2 + el.clientWidth / 2,
    behavior: "smooth",
  });
};

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 16 16" className="h-3 w-3 lg:h-4 lg:w-4" aria-hidden>
    <path
      d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Stacks() {
  const [catIndex, setCatIndex] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);
  const catRow = useRef<HTMLDivElement | null>(null);
  const tileRow = useRef<HTMLDivElement | null>(null);

  const category = techStack[catIndex];
  const stack = category.stacks[stackIndex];
  const total = category.stacks.length;

  const selectCategory = (i: number) => {
    setCatIndex(i);
    setStackIndex(0);
  };
  const step = (d: number) => setStackIndex((i) => (i + d + total) % total);

  useEffect(() => centerActive(catRow.current), [catIndex]);
  useEffect(() => centerActive(tileRow.current), [catIndex, stackIndex]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="w-full h-full">
        <div className="w-full max-w-[1280px] 3xl:max-w-[1350px] mx-auto px-4">
          <div className="rounded-[14px] bg-[#f2efec] p-5 lg:p-8">
            {/* ---------------- heading ---------------- */}
            <p className={MONO}>TECH STACK</p>
            <h1 className="mt-2 font-serif text-[30px] lg:text-[32px] leading-[1.15] text-[#141414]">
              What I <em>build with</em>
            </h1>

            <div className="mt-5 lg:mt-8 grid gap-2 lg:grid-cols-[250px_1fr] lg:gap-10">
              {/* ---------------- categories: chips on mobile, list on desktop ---------------- */}
              <div
                ref={catRow}
                className={`relative -mx-5 px-5 lg:mx-0 lg:px-0 flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible ${NO_SCROLLBAR}`}
              >
                {techStack.map((c, i) => {
                  const active = i === catIndex;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-active={active}
                      aria-pressed={active}
                      onClick={() => selectCategory(i)}
                      className={`group flex shrink-0 items-center gap-2.5 lg:gap-3 rounded-[6px] border px-4 py-3 lg:px-3 lg:py-2.5 whitespace-nowrap text-[15px] lg:text-[16px] transition-colors ${
                        active
                          ? "border-[#b8862b] bg-[#f6f4f1] text-[#141414]"
                          : "border-[#e0dad2] bg-[#ebe7e1] text-[#4a453f] lg:border-transparent lg:bg-transparent hover:text-[#141414]"
                      }`}
                    >
                      <StackIcon
                        src={c.icon}
                        label={c.label}
                        className={`h-4 w-4 lg:h-5 lg:w-5 shrink-0 ${active ? "text-[#b8862b]" : "text-[#8d8579]"}`}
                      />
                      <span className="lg:flex-1 lg:text-left">{c.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ---------------- scanner + detail ---------------- */}
              <div className="grid gap-6 xl:grid-cols-[380px_1fr] xl:gap-12 xl:items-center lg:self-start">
                <Scanner
                  icon={stack.icon}
                  label={stack.name}
                  index={stackIndex}
                  total={total}
                  categoryId={category.id}
                />

                <div className="xl:pt-16">
                  <p className={`${MONO} lg:text-[12px]`}>
                    {category.label.toUpperCase()} · {pad(stackIndex + 1)}
                  </p>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${category.id}-${stackIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                    >
                      <h2 className="mt-4 lg:mt-5 font-serif text-[32px] lg:text-[56px] leading-[1.1] text-[#141414] text-balance">
                        {stack.name}
                      </h2>
                      <p className="mt-3 lg:mt-4 font-serif italic text-[14px] lg:text-[19px] text-[#a87a2c]">
                        {stack.content}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 lg:mt-7 flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous stack"
                      onClick={() => step(-1)}
                      className="order-1 flex h-11 w-11 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border border-[#c9c2b8] text-[#141414] transition-colors hover:border-[#141414]"
                    >
                      <Chevron dir="left" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next stack"
                      onClick={() => step(1)}
                      className="order-3 lg:order-2 flex h-11 w-11 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border border-[#b8862b] text-[#141414] transition-colors hover:bg-[#b8862b] hover:text-[#f2efec]"
                    >
                      <Chevron dir="right" />
                    </button>
                    <div className="order-2 lg:order-3 relative h-px flex-1 lg:flex-none lg:w-[200px] bg-[#d9d3ca] lg:ml-2">
                      <motion.div
                        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#141414]"
                        animate={{
                          width: `${((stackIndex + 1) / total) * 100}%`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 160,
                          damping: 24,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- stack tiles ---------------- */}
            <div
              ref={tileRow}
              className={`relative -mx-5 px-5 lg:mx-0 lg:px-0 mt-8 lg:mt-12 pt-2 overflow-x-auto ${NO_SCROLLBAR}`}
            >
              <div className="flex w-max gap-2 lg:gap-3 lg:mx-auto">
                {category.stacks.map((s, i) => {
                  const active = i === stackIndex;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      data-active={active}
                      aria-pressed={active}
                      aria-label={s.name}
                      title={s.name}
                      onClick={() => setStackIndex(i)}
                      className={`relative flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                        active
                          ? "border-[#141414] bg-[#f6f4f1] text-[#141414]"
                          : "border-[#e0dad2] bg-[#ebe7e1] text-[#6f685f] hover:text-[#141414]"
                      }`}
                    >
                      {active && (
                        <span className="absolute -top-2 left-1/2 h-2 w-px bg-[#141414]" />
                      )}
                      <StackIcon
                        src={s.icon}
                        label={s.name}
                        className="h-[18px] w-[18px] lg:h-6 lg:w-6"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
