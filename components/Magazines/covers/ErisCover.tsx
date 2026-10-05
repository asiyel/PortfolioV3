import Image from "next/image";
import { Magazine } from "@/types/MagazineTypes";

const display = "font-serif";
const jp = "font-serif";
const glow = "[text-shadow:0_1px_2cqw_rgba(20,19,17,.85)]";

const contents = [
  "The Mad Dog of Fittoa",
  "Three years at the Sword Sanctum",
  "Temper, tempered",
];

export default function ErisCover({
  magazine,
  className = "",
}: {
  magazine: Magazine;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[760px] [container-type:inline-size] ${className}`}
    >
      <article className="relative aspect-[736/1075] overflow-hidden bg-[#2a2725] font-serif text-[#f3f2f2] antialiased shadow-[0_24px_60px_rgba(0,0,0,.55)]">
        {/* The only image */}
        <Image
          src={magazine.subject}
          alt="eris"
          fill
          priority
          sizes="(min-width: 760px) 760px, 100vw"
          className="object-cover [filter:sepia(.1)_saturate(.92)]"
        />

        {/* Darken the white backdrop into charcoal, keeping a soft light behind her */}
        <div className="absolute inset-0 mix-blend-multiply bg-[radial-gradient(120%_80%_at_30%_28%,#d6d3cf_0%,#8f8b87_42%,#3a3633_78%,#262321_100%)]" />

        {/* Legibility shading */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,17,.35)_0%,transparent_22%,transparent_58%,rgba(20,19,17,.6)_78%,rgba(20,19,17,.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,17,.25)_0%,transparent_30%,transparent_70%,rgba(20,19,17,.4)_100%)]" />

        {/* Masthead */}
        <div
          className={`absolute left-[4cqw] top-[3cqw] w-[24cqw] ${display} text-[3.4cqw] italic leading-[1.6] ${glow}`}
        >
          The Fontaine Review
        </div>
        <div className="absolute left-[38cqw] top-[5.6cqw] h-px w-[23cqw] bg-[#b68235]" />
        <div className="absolute left-[64cqw] right-[4cqw] top-[4.4cqw] text-[max(9px,1.6cqw)] uppercase leading-[1.6] tabular-nums tracking-[0.22em]">
          No. {magazine.issue} — {magazine.series}
        </div>

        {/* Seal */}
        <div className="absolute left-[5cqw] top-[13.5cqw] flex h-[19cqw] w-[19cqw] flex-col items-center justify-center rounded-full border border-[#b68235]/80">
          <div className="absolute inset-[1.6cqw] rounded-full border border-[#b68235]/40" />
          <span className={`${jp} text-[5cqw] leading-none text-[#dcbf8f]`}>
            剣王
          </span>
          <span className="mt-[1cqw] text-[max(7px,1.2cqw)] uppercase tracking-[0.22em]">
            Sword King
          </span>
        </div>

        {/* Left: Japanese */}
        <div
          className={`absolute left-[5cqw] top-[42cqw] ${jp} text-[5.6cqw] leading-none tracking-[0.14em] [writing-mode:vertical-rl] ${glow}`}
        >
          エリス
        </div>
        <div
          className={`absolute left-[14cqw] top-[42.5cqw] ${jp} text-[max(9px,1.7cqw)] tracking-[0.2em] text-[#dcbf8f] [writing-mode:vertical-rl] ${glow}`}
        >
          {magazine.titleJp}
        </div>

        {/* Right: contents */}
        <div className={`absolute left-[74cqw] right-[4cqw] top-[51cqw] ${glow}`}>
          <div className="border-b border-[#b68235] pb-[1.6cqw] text-[max(8px,1.3cqw)] uppercase tracking-[0.22em] text-[#dcbf8f]">
            In this issue
          </div>
          {contents.map((item, i) => (
            <div
              key={item}
              className="flex gap-[2cqw] border-b border-[#f3f2f2]/25 py-[1.8cqw]"
            >
              <span
                className={`${display} text-[2.4cqw] leading-[1.1] tabular-nums text-[#dcbf8f]`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`${display} text-[2.4cqw] leading-[1.15]`}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote
          className={`absolute left-[4cqw] top-[89cqw] m-0 w-[26cqw] border-l border-[#b68235] pl-[2.6cqw] ${display} text-[3.3cqw] italic leading-[1.2] ${glow}`}
        >
          I don&apos;t wait to be protected. I draw first.
        </blockquote>

        {/* Title */}
        <div className="absolute left-[19cqw] right-[19cqw] top-[108cqw] flex items-start justify-center gap-[2.4cqw]">
          <span className="mt-[1cqw] h-px flex-1 bg-[#b68235]" />
          <span className="text-[max(9px,1.9cqw)] uppercase leading-[1.6] tracking-[0.5em]">
            Boreas · Greyrat
          </span>
          <span className="mt-[1cqw] h-px flex-1 bg-[#b68235]" />
        </div>
        <h1
          className={`absolute inset-x-0 top-[113cqw] m-0 text-center ${display} text-[30cqw] font-normal leading-[0.8] tracking-[0.12em] pl-[0.12em] [text-shadow:0_0_6cqw_rgba(20,19,17,.6)]`}
        >
          ERIS
        </h1>

        {/* Footer line */}
        <footer className="absolute bottom-[3cqw] left-[4cqw] right-[4cqw] flex items-end justify-between gap-[3cqw] text-[max(8px,1.6cqw)] uppercase leading-[1.6] tabular-nums tracking-[0.22em] text-[#dcbf8f]">
          <span className="w-[28cqw]">Swordswoman · Asura Kingdom</span>
          <span className="w-[11cqw]">
            Vol. {magazine.issue} · {magazine.year}
          </span>
        </footer>
      </article>
    </div>
  );
}
