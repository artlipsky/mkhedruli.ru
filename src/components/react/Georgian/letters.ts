export interface Letter {
  ka: string;
  ru: string;
}

export type LetterPair = readonly [Letter, Letter];

export interface Level {
  id: string;
  label: string;
  letters: readonly Letter[];
  /** pair mode: the card shows both letters of a pair, answers are ordered pairs */
  pairs?: readonly LetterPair[];
}

const VOWELS: readonly Letter[] = [
  { ka: "ა", ru: "а" },
  { ka: "ე", ru: "э" },
  { ka: "ი", ru: "и" },
  { ka: "ო", ru: "о" },
  { ka: "უ", ru: "у" },
];

const CONSONANTS: readonly Letter[] = [
  { ka: "მ", ru: "м" },
  { ka: "ნ", ru: "н" },
  { ka: "რ", ru: "р" },
  { ka: "ს", ru: "с" },
  { ka: "ლ", ru: "л" },
  { ka: "ვ", ru: "в" },
  { ka: "ბ", ru: "б" },
  { ka: "დ", ru: "д" },
  { ka: "გ", ru: "г" },
];

// aspirated stops are marked with х (тх/кх/пх), ejectives read as plain т/к/п;
// pair order is fixed: ejective (hard) first, aspirated second
const STOP_PAIRS: readonly LetterPair[] = [
  [
    { ka: "ტ", ru: "т" },
    { ka: "თ", ru: "тх" },
  ],
  [
    { ka: "კ", ru: "к" },
    { ka: "ქ", ru: "кх" },
  ],
  [
    { ka: "პ", ru: "п" },
    { ka: "ფ", ru: "пх" },
  ],
];

const STOPS: readonly Letter[] = STOP_PAIRS.flat();

export const LEVELS: readonly Level[] = [
  { id: "vowels", label: "Level 1 — Vowels", letters: VOWELS },
  { id: "consonants", label: "Level 2 — Top consonants", letters: CONSONANTS },
  { id: "mixed", label: "Level 3 — Vowels + consonants", letters: [...VOWELS, ...CONSONANTS] },
  { id: "stops", label: "Level 4 — Paired stops", letters: STOPS, pairs: STOP_PAIRS },
  { id: "single-stops", label: "Level 5 — Single stops", letters: STOPS },
  { id: "all", label: "Level 6 — All learned so far", letters: [...VOWELS, ...CONSONANTS, ...STOPS] },
] as const;
