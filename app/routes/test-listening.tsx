import type { Route } from "./+types/test-listening";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { Word } from "../types/word";
import { useAnswerCheck } from "../hooks/useAnswerCheck";
import { usePronunciation } from "../hooks/usePronunciation";
import { getUnitWords } from "../utils/unitManager";
import {
  getMistakesList,
  addMistake,
  recordStudySession,
  saveTestResult,
} from "../utils/storageManager";
import {
  ChevronLeft,
  Volume2,
  RefreshCw,
  Lightbulb,
  Flag,
  Trophy,
  Home,
  RotateCcw,
  Headphones,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "听写模式 - Deutsch Wörter" }];
}

export default function TestListening() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const unit = searchParams.get("unit");
  const count = parseInt(searchParams.get("count") || "20");
  const source = searchParams.get("source");

  const [testWords, setTestWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [startTime] = useState(Date.now());

  const currentWord = testWords[currentIndex];
  const { checkAnswer } = useAnswerCheck();
  const { pronounce } = usePronunciation();

  useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json() as Promise<Word[]>)
      .then((data) => {
        let wordsToTest: Word[];

        if (source === "mistakes") {
          const mistakes = getMistakesList();
          const mistakeWords = mistakes.map((m) => m.word);
          wordsToTest = data.filter((w) => mistakeWords.includes(w.word));
        } else if (unit) {
          wordsToTest = getUnitWords(data, parseInt(unit));
        } else {
          wordsToTest = data;
        }

        const shuffled = [...wordsToTest].sort(() => Math.random() - 0.5);
        setTestWords(shuffled.slice(0, Math.min(count, shuffled.length)));
      });
  }, [unit, count, source]);

  useEffect(() => {
    if (currentWord && autoPlayEnabled && isCorrect === null) {
      const timer = setTimeout(() => pronounce(currentWord.word), 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentWord, autoPlayEnabled, isCorrect]);

  const handleCheckAnswer = () => {
    if (!currentWord) return;
    const correct = checkAnswer(userInput, currentWord.word);
    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      setScore({ correct: score.correct + 1, total: score.total + 1 });
      recordStudySession(true);
    } else {
      setScore({ correct: score.correct, total: score.total + 1 });
      addMistake(currentWord.word, userInput, currentWord.zh_cn);
      recordStudySession(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setIsCorrect(null);
      setShowHint(false);
      setAttempts(0);
    } else {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      saveTestResult({
        mode: "listening",
        date: new Date().toISOString(),
        correct: score.correct + (isCorrect ? 1 : 0),
        total: score.total + 1,
        accuracy:
          ((score.correct + (isCorrect ? 1 : 0)) / (score.total + 1)) * 100,
        timeSpent,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGiveUp = () => {
    setIsCorrect(false);
    setScore({ correct: score.correct, total: score.total + 1 });
    if (currentWord)
      addMistake(currentWord.word, userInput || "(放弃)", currentWord.zh_cn);
    recordStudySession(false);
  };

  const progress =
    testWords.length > 0 ? ((currentIndex + 1) / testWords.length) * 100 : 0;

  // Completion State
  if (currentIndex >= testWords.length && testWords.length > 0) {
    const accuracy = Math.round((score.correct / score.total) * 100);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate("/test-modes")}
              className="p-2 -ml-2 text-gray-500 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              听写完成
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              accuracy >= 90
                ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                : accuracy >= 70
                ? "bg-gradient-to-br from-blue-400 to-purple-500"
                : "bg-gradient-to-br from-orange-400 to-red-500"
            }`}
          >
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {accuracy >= 90
              ? "太棒了！"
              : accuracy >= 70
              ? "不错！"
              : "继续加油！"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            听力和拼写都有进步
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {score.correct}
              </div>
              <div className="text-xs text-gray-500 mt-1">正确</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600">
                {score.total - score.correct}
              </div>
              <div className="text-xs text-gray-500 mt-1">错误</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {accuracy}%
              </div>
              <div className="text-xs text-gray-500 mt-1">正确率</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-500 mt-1">用时</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-semibold cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              再测一次
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-medium cursor-pointer"
            >
              <Home className="w-5 h-5" />
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Loading State
  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">准备中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-500 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {currentIndex + 1} / {testWords.length}
            </div>
            {score.total > 0 && (
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  score.correct / score.total >= 0.8
                    ? "bg-green-100 text-green-600"
                    : score.correct / score.total >= 0.6
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {Math.round((score.correct / score.total) * 100)}%
              </div>
            )}
            {score.total === 0 && <div className="w-10" />}
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 py-6">
        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Headphones className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            听写模式
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            听发音，输入你听到的德语单词
          </p>

          {/* Play Buttons */}
          <div className="flex gap-3 justify-center mb-4">
            <button
              onClick={() => pronounce(currentWord.word)}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-medium cursor-pointer active:scale-95 transition-transform"
            >
              <Volume2 className="w-5 h-5" />
              播放发音
            </button>
            <button
              onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${
                autoPlayEnabled
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              自动播放
            </button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">提示：{currentWord.zh_cn}</span>
              </div>
            </div>
          )}
        </div>

        {/* Answer Section */}
        <div className="flex-1 flex flex-col">
          {isCorrect === null ? (
            <>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && userInput.trim() && handleCheckAnswer()
                }
                placeholder="输入德语单词..."
                autoFocus
                className="w-full h-14 px-4 text-center text-xl font-medium bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 rounded-2xl outline-none transition-all mb-4"
              />
              <div className="flex gap-4 justify-center text-sm">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? "隐藏提示" : "显示提示"}
                </button>
                {attempts >= 2 && (
                  <button
                    onClick={handleGiveUp}
                    className="flex items-center gap-1 text-gray-500 hover:text-red-600 cursor-pointer"
                  >
                    <Flag className="w-4 h-4" />
                    放弃本题
                  </button>
                )}
              </div>
            </>
          ) : (
            <div
              className={`p-4 rounded-2xl mb-4 ${
                isCorrect
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <p
                    className={`font-semibold ${
                      isCorrect
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {isCorrect ? "回答正确！" : "回答错误"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    正确答案:{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {currentWord.word}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      {isCorrect === null ? (
        <footer className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3">
            <button
              onClick={handleCheckAnswer}
              disabled={!userInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-semibold disabled:opacity-40 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              检查答案
            </button>
          </div>
        </footer>
      ) : (
        <footer className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3">
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-semibold cursor-pointer"
            >
              {currentIndex < testWords.length - 1 ? "下一题" : "查看结果"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
