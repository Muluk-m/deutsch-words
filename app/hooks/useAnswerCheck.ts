import { parseGermanWord } from "../utils/wordParser";

export function useAnswerCheck() {
  const checkAnswer = (userInput: string, correctWord: string): boolean => {
    const parsed = parseGermanWord(correctWord);
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedAnswer = parsed.forPronunciation.toLowerCase();
    return normalizedInput === normalizedAnswer;
  };

  return { checkAnswer };
}

