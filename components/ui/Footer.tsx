import Image from "next/image";

export default function Footer() {
  return (
    <section className="relative w-full h-full pt-20 bg-foreground overflow-hidden">
      <div className="relative w-full lg:max-w-[1280px] 3xl:max-w-[1350px] mx-auto flex flex-col justify-end">
        <h2 className="text-[52px] text-center text-[#F3F0EC] font-sans font-semibold">
          Behind the Code
        </h2>
        <span className="text-[18px] text-center text-[#F3F0EC] font-sans font-light">
          A product of fleeting midnight moments, persistence, and unwavering
          passion.
        </span>
        <span className="text-[18px] text-center text-[#F3F0EC] font-sans font-light">
          A product of fleeting midnight moments, persistence, and unwavering
          passion.
        </span>
        <p
          className="-mb-[0.2em] mt-20 text-[20vw] text-center text-transparent
            font-sans font-semibold whitespace-nowrap leading-none tracking-tighter
            bg-clip-text bg-gradient-to-b from-background/50 from-40% to-transparent to-100%"
        >
          ASIYEL
        </p>
      </div>
    </section>
  );
}
