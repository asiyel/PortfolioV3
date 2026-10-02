import Image from "next/image";
import { Magazine } from "@/types/MagazineTypes";

const display = "font-serif";
const jp = "font-serif";
const glow = "[text-shadow:0_1px_2cqw_rgba(20,19,17,.85)]";

export default function ClorindeCover({
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
      <article className="relative aspect-[736/1075] overflow-hidden bg-[#141311] font-serif text-[#f3f2f2] antialiased shadow-[0_24px_60px_rgba(0,0,0,.55)]">
        {/* The only image */}
        <Image
          src={magazine.subject}
          alt="Clorinde, lying on blue silk, aiming a glowing pistol at the viewer"
          fill
          priority
          sizes="(min-width: 760px) 760px, 100vw"
          className="object-cover [filter:sepia(.12)_saturate(.92)]"
        />

        {/* Legibility shading */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,17,.85)_0%,transparent_30%,transparent_62%,rgba(20,19,17,.95)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,17,.55)_0%,transparent_34%,transparent_70%,rgba(20,19,17,.55)_100%)]" />

        {/* Top strip */}
        <header className="absolute left-[4cqw] right-[4cqw] top-[3cqw] flex items-center justify-between gap-[2cqw] text-[max(9px,1.7cqw)] uppercase tabular-nums tracking-[0.22em]">
          <div className="flex items-center gap-[1.6cqw]">
            <span className="border border-[#b68235] px-[1.2cqw] py-[0.5cqw] text-[#dcbf8f]">
              Review
            </span>
            <span>{magazine.series}</span>
          </div>
          <div className="flex items-center gap-[1.6cqw]">
            <span>Justice · Blade · Oath</span>
            <span className="border border-[#f3f2f2] px-[1.2cqw] py-[0.5cqw]">
              Vol. {magazine.issue}
            </span>
          </div>
        </header>

        {/* Title */}
        <h1
          className={`absolute inset-x-0 top-[7cqw] m-0 text-center ${display} text-[19.5cqw] font-normal leading-[0.85] tracking-[0.01em] [text-shadow:0_0_6cqw_rgba(20,19,17,.6)]`}
        >
          CLORINDE
        </h1>
        <p className="absolute inset-x-0 top-[25.5cqw] m-0 text-center text-[max(9px,1.9cqw)] uppercase tracking-[0.32em]">
          The Champion Duelist of Fontaine
        </p>
        <div className="absolute inset-x-0 top-[30cqw] flex justify-center gap-[1.2cqw]">
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 bg-[#b68235]" />
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 bg-[#b68235]" />
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 border border-[#b68235]" />
        </div>

        {/* Left: stats */}
        <div
          className={`absolute left-[4cqw] top-[42cqw] text-[max(9px,2.1cqw)] uppercase leading-[1.55] tabular-nums tracking-[0.14em] ${glow}`}
        >
          <div className="text-[#dcbf8f]">Vision: Electro</div>
          <div>Arms: Sword &amp; Pistol</div>
          <div>Post: Palais</div>
          <div>Mermonia</div>
        </div>
        <div className="absolute left-[4cqw] top-[62cqw] flex gap-[1cqw]">
          <span className="h-[0.7cqw] w-[4cqw] bg-[#b68235]" />
          <span className="h-[0.7cqw] w-[4cqw] bg-[#b68235]" />
          <span className="h-[0.7cqw] w-[4cqw] bg-[#b68235]" />
          <span className="h-[0.7cqw] w-[4cqw] border border-[#b68235]" />
        </div>

        {/* Right: Japanese */}
        <div
          className={`absolute right-[4cqw] top-[40cqw] ${jp} text-[6.4cqw] leading-none tracking-[0.14em] [writing-mode:vertical-rl] ${glow}`}
        >
          クロリンデ
        </div>
        <div className="absolute right-[14cqw] top-[42cqw] text-[max(8px,1.5cqw)] uppercase tracking-[0.5em] text-[#dcbf8f] [writing-mode:vertical-rl]">
          Champion Duelist
        </div>

        {/* Quote */}
        <blockquote
          className={`absolute left-[4cqw] top-[86cqw] m-0 w-[38cqw] ${display} text-[4.6cqw] font-normal leading-[1.02] ${glow}`}
        >
          <span className="block text-[7cqw] leading-[0.6] text-[#b68235]">
            “
          </span>
          A verdict is only as true as the hand that delivers it.
        </blockquote>

        {/* Right: virtues */}
        <div
          className={`absolute right-[4cqw] top-[80cqw] text-right text-[max(9px,1.9cqw)] uppercase leading-[1.6] tracking-[0.16em] ${glow}`}
        >
          <div>Precision</div>
          <div>Discipline</div>
          <div>Resolve</div>
          <div className="text-[#dcbf8f]">Absolute</div>
        </div>

        {/* Numeral + file */}
        <div
          className={`absolute left-[4cqw] top-[116cqw] ${display} text-[13cqw] font-normal leading-[0.8] tabular-nums text-transparent [-webkit-text-stroke:1px_#dcbf8f]`}
        >
          VII
        </div>
        <div className="absolute left-[4cqw] top-[128.5cqw] text-[max(8px,1.5cqw)] uppercase leading-[1.7] tabular-nums tracking-[0.2em]">
          <div>Duel record: undefeated</div>
          <div className="text-[#dcbf8f]">File · CLR-07-FTN</div>
        </div>
        <div
          className={`absolute right-[4cqw] top-[116cqw] flex h-[9cqw] w-[9cqw] items-center justify-center border border-[#f3f2f2] ${jp} text-[5cqw]`}
        >
          決
        </div>

        {/* Footer line */}
        <footer className="absolute bottom-[3cqw] left-[4cqw] right-[4cqw] flex items-baseline justify-between gap-[3cqw] border-t border-[#b68235] pt-[2.4cqw]">
          <span className="text-[max(9px,2cqw)] uppercase tracking-[0.16em]">
            “The court waits for no one. Neither does she.”
          </span>
          <span
            className={`${display} text-[5cqw] italic leading-none text-[#dcbf8f]`}
          >
            Clorinde
          </span>
        </footer>
      </article>
    </div>
  );
}
