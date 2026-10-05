"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Tech Stack", href: "/techstacks" },
  { label: "Magazine Gallery", href: "/magazines" },
  { label: "Automation", href: "/automations" },
  { label: "DSA Learnings", href: "/dsa" },
];

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap justify-center gap-3">
      {LINKS.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`px-6 py-3 rounded-full border font-sans text-[15px] transition-colors ${
              active
                ? "border-[#FACB8D] text-[#FACB8D]"
                : "border-[#F3F0EC]/20 text-[#F3F0EC]/85 hover:border-[#FACB8D]/60 hover:text-[#FACB8D]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
