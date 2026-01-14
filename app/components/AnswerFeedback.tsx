import { parseGermanWord } from "../utils/wordParser";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctWord?: string;
  correctAnswer?: string;
  userAnswer?: string;
  phonetic?: string;
}

export function AnswerFeedback({
  isCorrect,
  correctWord,
  correctAnswer,
  userAnswer,
  phonetic,
}: AnswerFeedbackProps) {
  // 兼容两种参数名称
  const answer = correctAnswer || correctWord || "";
  const parsed = parseGermanWord(answer);

  return (
    <div className={`mt-6 animate-scaleIn`}>
      {isCorrect ? (
        <div className="card-gradient p-6 border-2 border-green-400 dark:border-green-500">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg animate-bounce-once">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold gradient-text-green">
              回答正确！
            </span>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            太棒了，继续保持！
          </div>
        </div>
      ) : (
        <div className="card-gradient p-6 border-2 border-red-400 dark:border-red-500">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-lg animate-wiggle">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              答错了
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-700 dark:text-green-400 mb-1 font-medium">
                正确答案：
              </div>
              <div className="text-xl font-bold text-green-800 dark:text-green-300">
                {parsed.forPronunciation || answer}
              </div>
              {answer && parsed.forPronunciation !== answer && (
                <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                  完整形式：{answer}
                </div>
              )}
            </div>

            {userAnswer && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <div className="text-sm text-red-700 dark:text-red-400 mb-1 font-medium">
                  你的答案：
                </div>
                <div className="text-xl font-bold text-red-800 dark:text-red-300">
                  {userAnswer}
                </div>
              </div>
            )}

            {phonetic && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-700 dark:text-blue-400 mb-1 font-medium">
                  音标：
                </div>
                <div className="text-lg font-mono text-blue-800 dark:text-blue-300">
                  {phonetic}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            别气馁，再试一次吧！
          </div>
        </div>
      )}
    </div>
  );
}
