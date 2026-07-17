export type HebrewLetter = {
  index: number;
  character: string;
  name: string;
  slug: string;
};

export type ReservedGate = {
  number: number;
  slug: string;
  hebrew: string;
  title: string;
  firstLetter: HebrewLetter;
  secondLetter: HebrewLetter;
  status: "Reserved";
};

export const hebrewLetters: HebrewLetter[] = [
  ["א", "Aleph", "aleph"],
  ["ב", "Bet", "bet"],
  ["ג", "Gimel", "gimel"],
  ["ד", "Dalet", "dalet"],
  ["ה", "He", "he"],
  ["ו", "Vav", "vav"],
  ["ז", "Zayin", "zayin"],
  ["ח", "Chet", "chet"],
  ["ט", "Tet", "tet"],
  ["י", "Yod", "yod"],
  ["כ", "Kaf", "kaf"],
  ["ל", "Lamed", "lamed"],
  ["מ", "Mem", "mem"],
  ["נ", "Nun", "nun"],
  ["ס", "Samekh", "samekh"],
  ["ע", "Ayin", "ayin"],
  ["פ", "Pe", "pe"],
  ["צ", "Tsadi", "tsadi"],
  ["ק", "Qof", "qof"],
  ["ר", "Resh", "resh"],
  ["ש", "Shin", "shin"],
  ["ת", "Tav", "tav"],
].map(([character, name, slug], index) => ({
  index: index + 1,
  character,
  name,
  slug,
}));

export const gates: ReservedGate[] = hebrewLetters
  .flatMap((firstLetter, firstIndex) =>
    hebrewLetters.slice(firstIndex + 1).map((secondLetter) => ({
      number: 0,
      slug: `${firstLetter.slug}-${secondLetter.slug}`,
      hebrew: `${firstLetter.character}־${secondLetter.character}`,
      title: `${firstLetter.name}–${secondLetter.name}`,
      firstLetter,
      secondLetter,
      status: "Reserved" as const,
    })),
  )
  .map((gate, index) => ({ ...gate, number: index + 1 }));
