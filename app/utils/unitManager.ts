import type { Word } from "../types/word";

export const WORDS_PER_UNIT = 100;

export interface Unit {
  id: number;
  name: string;
  startIndex: number;
  endIndex: number;
  totalWords: number;
}

export function createUnits(totalWords: number): Unit[] {
  const units: Unit[] = [];
  const totalUnits = Math.ceil(totalWords / WORDS_PER_UNIT);

  for (let i = 0; i < totalUnits; i++) {
    const startIndex = i * WORDS_PER_UNIT;
    const endIndex = Math.min((i + 1) * WORDS_PER_UNIT, totalWords);
    
    units.push({
      id: i + 1,
      name: `单元 ${i + 1}`,
      startIndex,
      endIndex,
      totalWords: endIndex - startIndex,
    });
  }

  return units;
}

export function getUnitWords(words: Word[], unitId: number): Word[] {
  const units = createUnits(words.length);
  const unit = units.find((u) => u.id === unitId);
  
  if (!unit) return [];
  
  return words.slice(unit.startIndex, unit.endIndex);
}

export function getWordUnit(wordIndex: number): number {
  return Math.floor(wordIndex / WORDS_PER_UNIT) + 1;
}

export function getUnitProgress(unitId: number, learnedWords: string[], allWords: Word[]): {
  learned: number;
  total: number;
  percentage: number;
} {
  const unitWords = getUnitWords(allWords, unitId);
  const learned = unitWords.filter((w) => learnedWords.includes(w.word)).length;
  const total = unitWords.length;
  const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

  return { learned, total, percentage };
}

export function getAllUnitsProgress(learnedWords: string[], allWords: Word[]) {
  const units = createUnits(allWords.length);
  return units.map((unit) => ({
    ...unit,
    progress: getUnitProgress(unit.id, learnedWords, allWords),
  }));
}

