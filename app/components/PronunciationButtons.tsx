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
    purple: "bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
    blue: "bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700",
    green: "bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700",
  };

  const pluralColorClasses = {
    pink: "bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700",
  };

  return (
    <div className="flex items-center justify-center gap-6 my-6">
      <div className="flex flex-col items-center group">
        <button
          onClick={() => pronounceSingular(word)}
          className={`w-16 h-16 ${singularColorClasses[singularColor]} 
            rounded-2xl flex items-center justify-center 
            transition-all duration-200 
            active:scale-90 hover:scale-110
            shadow-lg hover:shadow-xl
            text-white`}
        >
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
          </svg>
        </button>
        <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
          单数发音
        </span>
      </div>

      {parsed.pluralForPronunciation && (
        <div className="flex flex-col items-center group">
          <button
            onClick={() => pronouncePlural(word)}
            className={`w-16 h-16 ${pluralColorClasses[pluralColor]} 
              rounded-2xl flex items-center justify-center 
              transition-all duration-200 
              active:scale-90 hover:scale-110
              shadow-lg hover:shadow-xl
              text-white`}
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
            </svg>
          </button>
          <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
            复数发音
          </span>
        </div>
      )}
    </div>
  );
}
