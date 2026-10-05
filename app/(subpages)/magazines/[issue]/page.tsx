import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { magazines } from "@/data/MagazinesData";
import { covers } from "@/components/Magazines/covers";
import Article from "@/components/Magazines/Article";

export function generateStaticParams() {
  return magazines.map((m) => ({ issue: m.slug }));
}

export default async function Page({
  params,
}: PageProps<"/magazines/[issue]">) {
  const { issue } = await params;
  const magazine = magazines.find((m) => m.slug === issue);
  if (!magazine) notFound();

  const Cover = covers[magazine.slug];

  return (
    <main className="w-full">
      <section className="relative w-full flex flex-col items-center px-6 pt-8 pb-16 bg-[#252323]">
        <Link
          href="/magazines"
          aria-label="Back to gallery"
          title="Back to gallery"
          className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full
            border border-[#F3F0EC]/30 bg-[#252323]/80 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.4)]
            font-mono text-[18px] text-[#F3F0EC]/80 transition-colors duration-300
            hover:border-[#B8862B] hover:text-[#FACB8D]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            &lt;
          </span>
        </Link>

        {Cover ? (
          <Cover magazine={magazine} />
        ) : (
          // Fallback until this issue gets its own HTML cover
          <div className="relative w-full max-w-[760px] aspect-[2/3]">
            <Image
              src={magazine.cover}
              alt={magazine.title}
              fill
              priority
              sizes="(min-width: 760px) 760px, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </section>

      <Article magazine={magazine} />
    </main>
  );
}
