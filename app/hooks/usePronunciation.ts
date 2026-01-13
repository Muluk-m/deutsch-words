import { parseGermanWord } from "../utils/wordParser";

export function usePronunciation() {
  const pronounce = (text: string, rate: number = 0.8) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const pronounceSingular = (word: string) => {
    const parsed = parseGermanWord(word);
    pronounce(parsed.singularForPronunciation);
  };

  const pronouncePlural = (word: string) => {
    const parsed = parseGermanWord(word);
    if (parsed.pluralForPronunciation) {
      pronounce(parsed.pluralForPronunciation);
    }
  };

  return {
    pronounce,
    pronounceSingular,
    pronouncePlural,
  };
}

