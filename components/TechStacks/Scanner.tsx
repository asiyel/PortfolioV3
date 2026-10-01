"use client";

import { AnimatePresence, motion } from "motion/react";
import StackIcon from "@/components/TechStacks/StackIcon";

type ScannerProps = {
  icon: string;
  label: string;
  /** 0-based position of the active stack. */
  index: number;
  total: number;
  categoryId: string;
};

const INK = "#141414";
const PAPER = "#f2efec";
const MONO = "font-mono text-[10px] lg:text-[11px] tracking-[0.22em] text-[#8d8579]";
const pad = (n: number) => String(n).padStart(2, "0");

export default function Scanner({ icon, label, index, total, categoryId }: ScannerProps) {
  // droid slides along the top edge to mirror the active stack
  const pct = total > 1 ? (index / (total - 1)) * 100 : 50;

  return (
    <div className="relative pt-16">
      {/* ---------------- droid dome peeking over the frame ---------------- */}
      <div className="pointer-events-none absolute inset-x-8 top-16 -translate-y-full">
        <motion.div
          className="absolute bottom-0 h-10 w-[68px]"
          animate={{ left: `${pct}%`, x: `-${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <div
            style={{ background: INK }}
            className="absolute inset-0 rounded-t-[34px] rounded-b-[3px]"
          />
          <div
            style={{ background: INK }}
            className="absolute left-[26px] -top-[26px] h-[26px] w-px"
          />
          <div
            style={{ background: INK }}
            className="absolute left-[38px] -top-4 h-4 w-px rotate-[8deg]"
          />
          <div className="absolute left-4 top-3 h-[18px] w-[40px] overflow-hidden">
            <div className="absolute inset-0 flex items-center gap-2">
              <div
                style={{ background: PAPER, boxShadow: `inset 0 0 0 4px ${INK}` }}
                className="h-[18px] w-[18px] rounded-full"
              />
              <div
                style={{ background: PAPER, boxShadow: `inset 0 0 0 2.5px ${INK}` }}
                className="h-2.5 w-2.5 rounded-full"
              />
            </div>
            {/* blink */}
            <motion.div
              style={{ background: INK, transformOrigin: "50% 0" }}
              className="absolute inset-0"
              animate={{ scaleY: [0, 0, 1, 0] }}
              transition={{
                duration: 6.4,
                times: [0, 0.955, 0.974, 0.99],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ---------------- frame ---------------- */}
      <div
        className="relative h-[230px] lg:h-[340px] overflow-hidden rounded-[8px] border border-[#141414]"
        style={{
          backgroundColor: PAPER,
          backgroundImage:
            "linear-gradient(#e4dfd8 1px, transparent 1px), linear-gradient(90deg, #e4dfd8 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "-1px -1px",
        }}
      >
        <span className={`absolute left-4 top-4 lg:left-5 lg:top-5 ${MONO}`}>
          SCAN {pad(index + 1)} / {pad(total)}
        </span>
        <span className={`absolute bottom-4 right-4 lg:bottom-5 lg:right-5 ${MONO}`}>
          X {pad(index + 1)} · Y {categoryId}
        </span>

        {/* sweep line on every change */}
        <motion.div
          key={`${categoryId}-${index}`}
          className="absolute inset-x-0 h-px bg-[#b8862b]"
          initial={{ top: "0%", opacity: 0.8 }}
          animate={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-32 w-32 lg:h-48 lg:w-48 items-center justify-center rounded-full border border-dashed border-[#b8862b] text-[#b8862b]">
            <AnimatePresence mode="wait">
              <motion.div
                key={icon}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                className="flex"
              >
                <StackIcon src={icon} label={label} className="h-11 w-11 lg:h-16 lg:w-16" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
