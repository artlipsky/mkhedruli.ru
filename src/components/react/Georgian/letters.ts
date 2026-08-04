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
  { id: "vowels", label: "Уровень 1 — Гласные", letters: VOWELS },
  { id: "consonants", label: "Уровень 2 — Частые согласные", letters: CONSONANTS },
  { id: "mixed", label: "Уровень 3 — Гласные и согласные", letters: [...VOWELS, ...CONSONANTS] },
  { id: "stops", label: "Уровень 4 — Смычные парами", letters: STOPS, pairs: STOP_PAIRS },
  { id: "single-stops", label: "Уровень 5 — Смычные поодиночке", letters: STOPS },
  { id: "all", label: "Уровень 6 — Всё пройденное", letters: [...VOWELS, ...CONSONANTS, ...STOPS] },
] as const;

export interface AlphabetEntry {
  ka: string;
  /** традиционное название буквы в русской транскрипции */
  name: string;
  ru: string;
  note: string;
}

/** справочная таблица под тренажёром: все 33 буквы в порядке грузинского алфавита */
export const ALPHABET: readonly AlphabetEntry[] = [
  { ka: "ა", name: "ани", ru: "а", note: "" },
  { ka: "ბ", name: "бани", ru: "б", note: "" },
  { ka: "გ", name: "гани", ru: "г", note: "" },
  { ka: "დ", name: "дони", ru: "д", note: "" },
  { ka: "ე", name: "эни", ru: "э", note: "всегда «э», никогда не смягчает согласную" },
  { ka: "ვ", name: "вини", ru: "в", note: "" },
  { ka: "ზ", name: "зени", ru: "з", note: "" },
  { ka: "თ", name: "тани", ru: "тх", note: "с придыханием, как в английском top" },
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
  { ka: "ფ", name: "пари", ru: "пх", note: "с придыханием, как в английском pen" },
  { ka: "ქ", name: "кани", ru: "кх", note: "с придыханием, как в английском cat" },
  { ka: "ღ", name: "гани", ru: "гх", note: "звонкое горловое «г», как украинское «г»" },
  { ka: "ყ", name: "къари", ru: "къ", note: "гортанный, произносится глубоко в горле" },
  { ka: "შ", name: "шини", ru: "ш", note: "" },
  { ka: "ჩ", name: "чини", ru: "чх", note: "с придыханием" },
  { ka: "ც", name: "цани", ru: "цх", note: "с придыханием" },
  { ka: "ძ", name: "дзили", ru: "дз", note: "слитный звук" },
  { ka: "წ", name: "цили", ru: "ц", note: "резкий, без выдоха (абруптив)" },
  { ka: "ჭ", name: "чари", ru: "ч", note: "резкий, без выдоха (абруптив)" },
  { ka: "ხ", name: "хани", ru: "х", note: "" },
  { ka: "ჯ", name: "джани", ru: "дж", note: "слитный звук" },
  { ka: "ჰ", name: "хае", ru: "х", note: "лёгкий выдох, как английское h" },
] as const;
