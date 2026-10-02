import { Magazine } from "@/types/MagazineTypes";

export default function Article({ magazine }: { magazine: Magazine }) {
  const { article, issue } = magazine;
  const [first, ...rest] = article.body;

  return (
    <section className="w-full bg-[#F3F0EC] text-[#201E1E]">
      <div className="w-full max-w-[860px] mx-auto px-6 py-16 md:py-24">
        {/* Heading */}
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#201E1E]/50">
          Cover Story · {issue}
        </span>
        <h2 className="mt-4 max-w-[560px] text-[40px] md:text-[56px] leading-[1.05] font-serif">
          {article.headline}
        </h2>
        <p className="mt-5 max-w-[520px] text-[17px] md:text-[19px] leading-relaxed italic text-[#B8862B] font-serif">
          {article.deck}
        </p>

        {/* Byline */}
        <div className="mt-8 py-3 flex flex-wrap gap-x-6 gap-y-1 border-y border-[#201E1E]/15 font-mono text-[11px] text-[#201E1E]/60">
          <span>
            Words by{" "}
            <em className="font-serif text-[#201E1E]">{article.author}</em>
          </span>
          <span>{article.readTime}</span>
          <span>Filed under {article.filedUnder}</span>
        </div>

        {/* Body */}
        <div className="mt-10 md:columns-2 gap-12 [column-rule:1px_solid_rgba(32,30,30,0.12)] font-serif text-[15px] leading-[1.75] text-justify text-[#201E1E]/85">
          <p className="mb-5 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-[56px] first-letter:leading-[0.8] first-letter:text-[#B8862B]">
            {first}
          </p>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-5">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <figure className="w-full max-w-[1080px] mx-auto px-6">
        <div className="py-14 md:py-20 border-y border-[#B8862B] text-center">
          <blockquote className="max-w-[640px] mx-auto text-[30px] md:text-[44px] leading-[1.2] font-serif">
            “{article.pullQuote.text}”
          </blockquote>
          <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#201E1E]/50">
            — {article.pullQuote.attribution}
          </figcaption>
        </div>
      </figure>

      {/* Dossier + next */}
      <div className="w-full max-w-[860px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-14">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#201E1E]/50">
            Dossier
          </span>
          <h3 className="mt-3 text-[26px] font-serif">
            {article.dossier.title}
          </h3>
          <dl className="mt-6 border-t border-[#201E1E]/15">
            {article.dossier.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[110px_1fr] py-3 border-b border-[#201E1E]/15 text-[13px]"
              >
                <dt className="font-mono text-[#201E1E]/50">{row.label}</dt>
                <dd className="font-serif text-[#201E1E]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:pt-8">
          <h3 className="text-[22px] font-serif text-[#B8862B]">
            {article.next.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.75] font-serif text-[#201E1E]/80">
            {article.next.text}
          </p>
          <span className="block mt-6 text-[64px] leading-none font-serif text-transparent [-webkit-text-stroke:1px_#B8862B]">
            {article.next.numeral}
          </span>
        </div>
      </div>
    </section>
  );
}
