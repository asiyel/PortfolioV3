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
        <div className="w-full max-w-[1280px] 3xl:max-w-[1350px] mb-10">
          <Link
            href="/magazines"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F3F0EC]/30
              font-mono text-[12px] text-[#F3F0EC]/80 transition-colors duration-300
              hover:border-[#B8862B] hover:text-[#FACB8D]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>
            back_to_gallery
          </Link>
        </div>

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
