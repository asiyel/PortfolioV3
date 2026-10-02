import { Magazine } from "@/types/MagazineTypes";

export const magazines: Magazine[] = [
  {
    slug: "clorinde",
    issue: "07",
    series: "The Fontaine Review",
    title: "The Champion Duelist",
    titleJp: "クロリンデ — 決",
    description:
      "A verdict is only as true as the hand that delivers it — precision, discipline, resolve.",
    cover: "/images/magazines/cover/clorinde.png",
    palette: ["#2B3A78", "#8E6BD8", "#14151F"],
    format: "2 : 3 cover",
    year: "2026",
  },
  {
    slug: "frieren",
    issue: "08",
    series: "Special Collection",
    title: "Beyond the Journey",
    titleJp: "葬送のフリーレン",
    description:
      "Ten years was nothing — until it was everything. Time flows on, but memories remain.",
    cover: "/images/magazines/cover/frieren.png",
    palette: ["#E8E4DC", "#C9A15A", "#2A2826"],
    format: "2 : 3 cover",
    year: "2026",
  },
  {
    slug: "eris",
    issue: "09",
    series: "The Sword Issue",
    title: "Eris Boreas Greyrat",
    titleJp: "狂犬と呼ばれた剣士",
    description:
      "I don't wait to be protected. I draw first. Three years at the Sword Sanctum — temper, tempered.",
    cover: "/images/magazines/cover/eris.png",
    palette: ["#B3261E", "#5A3A2A", "#2B2826"],
    format: "2 : 3 cover",
    year: "2027",
  },
];
