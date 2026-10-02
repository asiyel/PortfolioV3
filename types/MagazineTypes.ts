export type MagazineArticle = {
  headline: string;
  deck: string;
  author: string;
  readTime: string;
  filedUnder: string;
  body: string[];
  pullQuote: { text: string; attribution: string };
  dossier: { title: string; rows: { label: string; value: string }[] };
  next: { title: string; text: string; numeral: string };
};

export type Magazine = {
  slug: string;
  issue: string;
  series: string;
  title: string;
  titleJp: string;
  description: string;
  cover: string;
  subject: string;
  palette: string[];
  format: string;
  year: string;
  article: MagazineArticle;
};
