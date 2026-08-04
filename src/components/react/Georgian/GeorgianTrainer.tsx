import { Button, ListBox, ListBoxItem, Select } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LEVELS, type Letter, type LetterPair, type Level } from "./letters";

const NEXT_DELAY_MS = 800;
const MAX_OPTIONS = 5;

interface Option {
  id: string;
  label: string;
}

const shuffle = <T,>(items: readonly T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const randomIndexExcept = (count: number, except: number | null) => {
  let index = Math.floor(Math.random() * count);
  while (count > 1 && index === except) index = Math.floor(Math.random() * count);
  return index;
};

const pairId = (first: Letter, second: Letter) => `${first.ru}/${second.ru}`;

const pairOption = (first: Letter, second: Letter): Option => ({
  id: pairId(first, second),
  label: `${first.ru} / ${second.ru}`,
});

const letterOption = ({ ru }: Letter): Option => ({ id: ru, label: ru });

// the empty inline-block anchor sits exactly on the text baseline, so the
// absolutely-positioned rule tracks each font's real baseline without metrics
const LetterCard = ({ ka }: { ka: string }) => (
  <div className="z-0 relative flex justify-center items-center bg-background-secondary border border-border rounded-3xl w-48 h-48 overflow-hidden">
    <span className="font-georgian text-8xl">
      {ka}
      <span aria-hidden className="inline-block relative w-0">
        <span className="-left-96 -right-96 bottom-0 absolute -z-10 border-t border-border border-dashed h-0" />
      </span>
    </span>
  </div>
);

export default function GeorgianTrainer() {
  const [levelId, setLevelId] = useState(LEVELS[0].id);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState<Option[]>(LEVELS[0].letters.map(letterOption));
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState(false);
  const nextTimerRef = useRef<number | null>(null);

  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];

  const dealCard = useCallback((previousIndex: number | null, { letters, pairs }: Level) => {
    const next = randomIndexExcept(pairs ? pairs.length : letters.length, previousIndex);
    setCurrent(next);
    if (pairs) {
      setOptions(pairs.map(([a, b]) => pairOption(a, b)));
    } else {
      // letters sharing the base Russian sound (т/тх pairs) always make the cut,
      // otherwise stop-letter cards would be answerable without knowing the pair
      const correct = letters[next];
      const rest = letters.filter((_, i) => i !== next);
      const pairMates = rest.filter((l) => l.ru[0] === correct.ru[0]);
      const others = shuffle(rest.filter((l) => l.ru[0] !== correct.ru[0]));
      const distractors = [...pairMates, ...others].slice(0, MAX_OPTIONS - 1);
      setOptions(shuffle([correct, ...distractors].map(letterOption)));
    }
    setWrong(new Set());
    setSolved(false);
  }, []);

  const clearNextTimer = useCallback(() => {
    if (nextTimerRef.current !== null) {
      window.clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
  }, []);

  // randomize only after hydration so the SSR output stays deterministic
  useEffect(() => {
    dealCard(null, LEVELS[0]);
  }, [dealCard]);

  useEffect(() => clearNextTimer, [clearNextTimer]);

  const changeLevel = useCallback(
    (id: string) => {
      const nextLevel = LEVELS.find((l) => l.id === id);
      if (!nextLevel || nextLevel.id === levelId) return;
      clearNextTimer();
      setLevelId(id);
      dealCard(null, nextLevel);
    },
    [levelId, clearNextTimer, dealCard],
  );

  const displayPair: LetterPair | null = level.pairs ? level.pairs[current] : null;
  const correctId = displayPair ? pairId(...displayPair) : level.letters[current].ru;

  const answer = useCallback(
    (id: string) => {
      if (solved || wrong.has(id)) return;
      if (id !== correctId) {
        setWrong((prev) => new Set(prev).add(id));
        return;
      }
      setSolved(true);
      nextTimerRef.current = window.setTimeout(() => {
        nextTimerRef.current = null;
        dealCard(current, level);
      }, NEXT_DELAY_MS);
    },
    [solved, wrong, correctId, current, level, dealCard],
  );

  return (
    <section className="flex flex-col items-center gap-8 w-full">
      <Select
        aria-label="Level"
        value={levelId}
        onChange={(key) => changeLevel(String(key))}
        className="w-64"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {LEVELS.map(({ id, label }) => (
              <ListBoxItem key={id} id={id}>
                {label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {displayPair ? (
        <div className="flex gap-4">
          {displayPair.map((letter) => (
            <LetterCard key={letter.ru} ka={letter.ka} />
          ))}
        </div>
      ) : (
        <LetterCard ka={level.letters[current].ka} />
      )}
      <div className="flex flex-wrap justify-center gap-3 max-w-md">
        {options.map(({ id, label }) => {
          const isCorrect = solved && id === correctId;
          const isWrong = wrong.has(id);
          return (
            <Button
              key={id}
              onPress={() => answer(id)}
              size="lg"
              variant="outline"
              className={`min-w-16 ${
                isCorrect
                  ? "bg-green-500 text-white border-green-500"
                  : isWrong
                    ? "bg-red-500 text-white border-red-500"
                    : ""
              }`}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
