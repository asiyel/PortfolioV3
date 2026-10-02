import Image from "next/image";
import BackToTop from "./BackToTop";
import FooterNav from "./FooterNav";

export default function Footer() {
  return (
    <section className="relative w-full h-full pt-24 bg-foreground overflow-hidden">
      <div className="relative w-full px-6 lg:px-0 lg:max-w-[1280px] 3xl:max-w-[1350px] mx-auto flex flex-col items-center">
        <h2 className="text-[44px] md:text-[64px] leading-tight text-center text-[#F3F0EC] font-serif">
          Behind the <em className="text-[#FACB8D]">Code</em>
        </h2>
        <p className="mt-5 max-w-[440px] text-[16px] md:text-[18px] leading-relaxed text-center text-[#F3F0EC]/80 font-serif italic">
          A product of fleeting midnight moments, persistence, and unwavering
          passion.
        </p>

        <div className="mt-12 flex items-center gap-4 text-[#FACB8D]">
          <span className="h-px w-20 bg-[#F3F0EC]/40" />
          <Image
            src={"/icons/icon.png"}
            alt="logo"
            width={50}
            height={50}
            className="w-[30px] h-auto object-contain"
          />
          <span className="h-px w-20 bg-[#F3F0EC]/40" />
        </div>

        <div className="mt-16">
          <FooterNav />
        </div>

        <div
          className="mt-20 h-[12vw] lg:h-[160px] overflow-hidden"
          aria-hidden
        >
          <p
            className="-translate-y-[0.09em] text-[20vw] lg:text-[260px] leading-none text-center text-transparent font-serif
              whitespace-nowrap select-none [-webkit-text-stroke:1px_#b68235]
              md:[-webkit-text-stroke:1.5px_#b68235]"
          >
            ASIYEL
          </p>
        </div>

        <div className="w-full py-6 flex items-center justify-between border-t border-[#F3F0EC]/15 font-sans text-[13px] text-[#F3F0EC]/70">
          <span>
            © {new Date().getFullYear()} Aziel Randel Rabano. All rights
            reserved.
          </span>
          <BackToTop />
        </div>
      </div>
    </section>
  );
}
