import Image from "next/image";
import { Magazine } from "@/types/MagazineTypes";

const display = "font-serif";
const jp = "font-serif";
// Light halo for ink text over the pale background, dark halo for light text over the shaded base
const inkGlow = "[text-shadow:0_1px_2cqw_rgba(244,241,236,.9)]";
const glow = "[text-shadow:0_1px_2cqw_rgba(28,26,24,.85)]";

export default function FrierenCover({
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
      <article className="relative aspect-[736/1075] overflow-hidden bg-[#f4f1ec] font-serif text-[#2a2826] antialiased shadow-[0_24px_60px_rgba(0,0,0,.55)]">
        {/* The only image */}
        <Image
          src={magazine.subject}
          alt="frieren"
          fill
          priority
          sizes="(min-width: 760px) 760px, 100vw"
          className="object-cover [filter:sepia(.1)_saturate(.9)]"
        />

        {/* Legibility shading */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,241,236,.8)_0%,transparent_20%,transparent_62%,rgba(28,26,24,.6)_76%,rgba(28,26,24,.95)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,241,236,.45)_0%,transparent_30%,transparent_72%,rgba(244,241,236,.35)_100%)]" />

        {/* Top strip */}
        <header className="absolute left-[4cqw] right-[4cqw] top-[3cqw] flex items-center justify-between gap-[2cqw] text-[max(9px,1.7cqw)] uppercase tabular-nums tracking-[0.22em]">
          <div className="flex items-center gap-[1.6cqw]">
            <span className="border border-[#c9a15a] px-[1.2cqw] py-[0.5cqw] text-[#8f6c2c]">
              Special
            </span>
            <span>{magazine.series}</span>
          </div>
          <div className="flex items-center gap-[1.6cqw]">
            <span>Time · Magic · Memory</span>
            <span className="border border-[#2a2826] px-[1.2cqw] py-[0.5cqw]">
              Vol. {magazine.issue}
            </span>
          </div>
        </header>

        {/* Left: Japanese */}
        <div
          className={`absolute left-[4cqw] top-[12cqw] ${jp} text-[6.4cqw] leading-none tracking-[0.14em] [writing-mode:vertical-rl] ${inkGlow}`}
        >
          フリーレン
        </div>
        <div
          className={`absolute left-[13cqw] top-[14cqw] text-[max(8px,1.5cqw)] uppercase tracking-[0.5em] text-[#8f6c2c] [writing-mode:vertical-rl] ${inkGlow}`}
        >
          Beyond the Journey
        </div>

        {/* Right: seal */}
        <div
          className={`absolute right-[4cqw] top-[11cqw] flex h-[9cqw] w-[9cqw] items-center justify-center border border-[#2a2826] ${jp} text-[5cqw]`}
        >
          葬
        </div>

        {/* Right: stats */}
        <div
          className={`absolute right-[4cqw] top-[40cqw] text-right text-[max(9px,2.1cqw)] uppercase leading-[1.55] tabular-nums tracking-[0.14em] ${inkGlow}`}
        >
          <div className="text-[#8f6c2c]">Race: Elf</div>
          <div>Age: 1,000+</div>
          <div>Arms: Staff</div>
          <div>Hero&apos;s Party</div>
        </div>
        <div className="absolute right-[4cqw] top-[54cqw] flex gap-[1cqw]">
          <span className="h-[0.7cqw] w-[4cqw] border border-[#c9a15a]" />
          <span className="h-[0.7cqw] w-[4cqw] bg-[#c9a15a]" />
          <span className="h-[0.7cqw] w-[4cqw] bg-[#c9a15a]" />
          <span className="h-[0.7cqw] w-[4cqw] bg-[#c9a15a]" />
        </div>

        {/* Right: virtues */}
        <div
          className={`absolute right-[4cqw] top-[60cqw] text-right text-[max(9px,1.9cqw)] uppercase leading-[1.6] tracking-[0.16em] ${inkGlow}`}
        >
          <div>Patience</div>
          <div>Curiosity</div>
          <div>Memory</div>
          <div className="text-[#8f6c2c]">Timeless</div>
        </div>

        {/* Quote */}
        <blockquote
          className={`absolute left-[4cqw] top-[60cqw] m-0 w-[36cqw] ${display} text-[4.6cqw] font-normal leading-[1.02] ${inkGlow}`}
        >
          <span className="block text-[7cqw] leading-[0.6] text-[#c9a15a]">
            “
          </span>
          Ten years was nothing — until it was everything.
        </blockquote>

        {/* Numeral + file */}
        <div
          className={`absolute left-[4cqw] top-[86cqw] ${display} text-[11cqw] font-normal leading-[0.8] tabular-nums text-transparent [-webkit-text-stroke:1px_#2a2826]`}
        >
          VIII
        </div>
        <div
          className={`absolute left-[4cqw] top-[96.5cqw] text-[max(8px,1.5cqw)] uppercase leading-[1.7] tabular-nums tracking-[0.2em] ${inkGlow}`}
        >
          <div>Journey: ten years, retraced</div>
          <div className="text-[#8f6c2c]">File · FRN-08-HRO</div>
        </div>

        {/* Title */}
        <h1
          className={`absolute inset-x-0 top-[107cqw] m-0 text-center ${display} text-[18cqw] font-normal leading-[0.85] tracking-[0.01em] text-[#f4f1ec] [text-shadow:0_0_6cqw_rgba(28,26,24,.6)]`}
        >
          FRIEREN
        </h1>
        <p
          className={`absolute inset-x-0 top-[124cqw] m-0 text-center text-[max(9px,1.9cqw)] uppercase tracking-[0.32em] text-[#f4f1ec] ${glow}`}
        >
          The Mage of the Hero&apos;s Party
        </p>
        <div className="absolute inset-x-0 top-[128.5cqw] flex justify-center gap-[1.2cqw]">
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 border border-[#c9a15a]" />
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 bg-[#c9a15a]" />
          <span className="h-[1.3cqw] w-[1.3cqw] rotate-45 bg-[#c9a15a]" />
        </div>

        {/* Footer line */}
        <footer className="absolute bottom-[3cqw] left-[4cqw] right-[4cqw] flex items-baseline justify-between gap-[3cqw] border-t border-[#c9a15a] pt-[2.4cqw] text-[#f4f1ec]">
          <span className="text-[max(9px,2cqw)] uppercase tracking-[0.16em]">
            “Time flows on. Memories remain.”
          </span>
          <span
            className={`${display} text-[5cqw] italic leading-none text-[#e3c98f]`}
          >
            Frieren
          </span>
        </footer>
      </article>
    </div>
  );
}
