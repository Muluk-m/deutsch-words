import { parseGermanWord } from "../utils/wordParser";
import { usePronunciation } from "../hooks/usePronunciation";

interface PronunciationButtonsProps {
  word: string;
  singularColor?: "purple" | "blue" | "green";
  pluralColor?: "pink" | "purple" | "emerald";
}

export function PronunciationButtons({
  word,
  singularColor = "purple",
  pluralColor = "pink",
}: PronunciationButtonsProps) {
  const { pronounceSingular, pronouncePlural } = usePronunciation();
  const parsed = parseGermanWord(word);

  const singularColorClasses = {
    purple: "bg-purple-100 hover:bg-purple-200 text-purple-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    green: "bg-green-100 hover:bg-green-200 text-green-600",
  };

  const pluralColorClasses = {
    pink: "bg-pink-100 hover:bg-pink-200 text-pink-600",
    purple: "bg-purple-100 hover:bg-purple-200 text-purple-600",
    emerald: "bg-emerald-100 hover:bg-emerald-200 text-emerald-600",
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="flex flex-col items-center">
        <button
          onClick={() => pronounceSingular(word)}
          className={`w-12 h-12 ${singularColorClasses[singularColor]} rounded-full flex items-center justify-center transition-all active:scale-95`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>
        <span className="text-xs text-gray-500 mt-1">单数</span>
      </div>

      {parsed.pluralForPronunciation && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => pronouncePlural(word)}
            className={`w-12 h-12 ${pluralColorClasses[pluralColor]} rounded-full flex items-center justify-center transition-all active:scale-95`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </button>
          <span className="text-xs text-gray-500 mt-1">复数</span>
        </div>
      )}
    </div>
  );
}
