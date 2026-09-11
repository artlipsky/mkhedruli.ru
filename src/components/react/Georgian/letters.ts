export interface Letter {
  ka: string;
  ru: string;
}

export type LetterPair = readonly [Letter, Letter];

export interface Level {
  id: string;
  label: string;
  letters: readonly Letter[];
  pairs?: readonly LetterPair[];
}

export interface AlphabetEntry extends Letter {
  name: string;
  note: string;
}

export const ALPHABET: readonly AlphabetEntry[] = [
  { ka: "ა", name: "ани", ru: "а", note: "" },
  { ka: "ბ", name: "бани", ru: "б", note: "" },
  { ka: "გ", name: "гани", ru: "г", note: "" },
  { ka: "დ", name: "дони", ru: "д", note: "" },
  { ka: "ე", name: "эни", ru: "э", note: "всегда «э», никогда не смягчает согласную" },
  { ka: "ვ", name: "вини", ru: "в", note: "" },
  { ka: "ზ", name: "зени", ru: "з", note: "" },
  { ka: "თ", name: "тхани", ru: "тх", note: "с придыханием, как в английском top" },
  { ka: "ი", name: "ини", ru: "и", note: "" },
  { ka: "კ", name: "кани", ru: "к", note: "резкий, без выдоха (абруптив)" },
  { ka: "ლ", name: "ласи", ru: "л", note: "" },
  { ka: "მ", name: "мани", ru: "м", note: "" },
  { ka: "ნ", name: "нари", ru: "н", note: "" },
  { ka: "ო", name: "они", ru: "о", note: "всегда «о», без аканья" },
  { ka: "პ", name: "пари", ru: "п", note: "резкий, без выдоха (абруптив)" },
  { ka: "ჟ", name: "жани", ru: "ж", note: "" },
  { ka: "რ", name: "рае", ru: "р", note: "раскатистое" },
  { ka: "ს", name: "сани", ru: "с", note: "" },
  { ka: "ტ", name: "тари", ru: "т", note: "резкий, без выдоха (абруптив)" },
  { ka: "უ", name: "уни", ru: "у", note: "" },
  { ka: "ფ", name: "пхари", ru: "пх", note: "с придыханием, как в английском pen" },
  { ka: "ქ", name: "кхани", ru: "кх", note: "с придыханием, как в английском cat" },
  { ka: "ღ", name: "гъани", ru: "гъ", note: "звонкое горловое «г», как южнорусское «г» или французское r" },
  { ka: "ყ", name: "къари", ru: "къ", note: "гортанный, произносится глубоко в горле" },
  { ka: "შ", name: "шини", ru: "ш", note: "" },
  { ka: "ჩ", name: "чхини", ru: "чх", note: "с придыханием" },
  { ka: "ც", name: "цхани", ru: "цх", note: "с придыханием" },
  { ka: "ძ", name: "дзили", ru: "дз", note: "слитный звук" },
  { ka: "წ", name: "цили", ru: "ц", note: "резкий, без выдоха (абруптив)" },
  { ka: "ჭ", name: "чари", ru: "ч", note: "резкий, без выдоха (абруптив)" },
  { ka: "ხ", name: "хани", ru: "х", note: "глубже и резче русского «х»" },
  { ka: "ჯ", name: "джани", ru: "дж", note: "слитный звук" },
  { ka: "ჰ", name: "хъае", ru: "хъ", note: "лёгкий выдох, мягче русского «х», как английское h" },
] as const;

const BY_KA = new Map(ALPHABET.map((entry) => [entry.ka, entry]));

const pick = (...ka: string[]): Letter[] =>
  ka.map((letter) => {
    const entry = BY_KA.get(letter);
    if (!entry) throw new Error(`Letter ${letter} is missing from ALPHABET`);
    return entry;
  });

const pickPair = (abruptive: string, aspirated: string): LetterPair => {
  const [first, second] = pick(abruptive, aspirated);
  return [first, second];
};

const VOWELS = pick("ა", "ე", "ი", "ო", "უ");
const CONSONANTS = pick("მ", "ნ", "რ", "ს", "ლ", "ვ", "ბ", "დ", "გ");

const STOP_PAIRS = [pickPair("ტ", "თ"), pickPair("კ", "ქ"), pickPair("პ", "ფ")];
const STOPS = STOP_PAIRS.flat();

const FRICATIVES = pick("ზ", "ჟ", "შ", "ხ");
const VOICED_AFFRICATES = pick("ძ", "ჯ");

const AFFRICATE_PAIRS = [pickPair("წ", "ც"), pickPair("ჭ", "ჩ")];
const AFFRICATES = [...AFFRICATE_PAIRS.flat(), ...VOICED_AFFRICATES];

const ALL_PAIRS = [...STOP_PAIRS, ...AFFRICATE_PAIRS];

const UNFAMILIAR = pick("ღ", "ყ", "ჰ");

export const LEVELS: readonly Level[] = [
  { id: "vowels", label: "Уровень 1 — Гласные", letters: VOWELS },
  { id: "consonants", label: "Уровень 2 — Частые согласные", letters: CONSONANTS },
  { id: "mixed", label: "Уровень 3 — Гласные и согласные", letters: [...VOWELS, ...CONSONANTS] },
  { id: "stops", label: "Уровень 4 — Смычные парами", letters: STOPS, pairs: STOP_PAIRS },
  { id: "single-stops", label: "Уровень 5 — Смычные поодиночке", letters: STOPS },
  { id: "familiar", label: "Уровень 6 — Знакомые звуки", letters: [...FRICATIVES, ...VOICED_AFFRICATES] },
  { id: "all-pairs", label: "Уровень 7 — Все пары", letters: ALL_PAIRS.flat(), pairs: ALL_PAIRS },
  { id: "affricates", label: "Уровень 8 — Аффрикаты", letters: AFFRICATES },
  {
    id: "unfamiliar",
    label: "Уровень 9 — Звуки без аналогов",
    letters: [...UNFAMILIAR, ...pick("გ", "კ", "ქ", "ხ")],
  },
  { id: "all", label: "Уровень 10 — Весь алфавит", letters: ALPHABET },
] as const;
