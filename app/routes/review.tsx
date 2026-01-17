import type { Route } from "./+types/review";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import type { Word } from "../types/word";
import { useAnswerCheck } from "../hooks/useAnswerCheck";
import { usePhonetics } from "../hooks/usePhonetics";
import { getUnitWords, filterWordsByUnits } from "../utils/unitManager";
import { getSelectedUnits } from "../utils/storageManager";
import { PageContainer } from "../components/PageContainer";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { PronunciationButtons } from "../components/PronunciationButtons";
import { AnswerInput } from "../components/AnswerInput";
import { AnswerFeedback } from "../components/AnswerFeedback";
import { BookOpen, Home, CheckCircle, XCircle, Trophy } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "复习模式 - Deutsch Wörter" }];
}

export default function Review() {
  const [searchParams] = useSearchParams();
  const unitId = searchParams.get("unit");

  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const currentWord = words[currentIndex];

  const { checkAnswer } = useAnswerCheck();
  const { phonetic } = usePhonetics(
    currentWord?.word || "",
    currentWord?.phonetic
  );

  useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json() as Promise<Word[]>)
      .then((data) => {
        const learnedWords = JSON.parse(
          localStorage.getItem("learnedWords") || "[]"
        ) as string[];

        // 根据是否有 unitId 参数来决定复习哪些单词
        let wordsToReview: Word[];
        if (unitId) {
          const unitWords = getUnitWords(data, parseInt(unitId));
          wordsToReview = unitWords.filter((w: Word) =>
            learnedWords.includes(w.word)
          );
        } else {
          // 使用全局选中的单元过滤
          const selectedUnits = getSelectedUnits();
          const filteredWords = filterWordsByUnits(data, selectedUnits);
          wordsToReview = filteredWords.filter((w: Word) =>
            learnedWords.includes(w.word)
          );
        }

        if (wordsToReview.length === 0) {
          return;
        }

        const shuffled = wordsToReview.sort(() => Math.random() - 0.5);
        setWords(shuffled);
      });
  }, [unitId]);

  const handleCheckAnswer = () => {
    const correct = checkAnswer(userInput, currentWord.word);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setIsCorrect(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userInput && isCorrect === null) {
      handleCheckAnswer();
    }
  };

  // 空状态
  if (words.length === 0) {
    return (
      <PageContainer>
        <BackButton />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center mt-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {unitId
              ? `单元 ${unitId} 还没有学习过的单词`
              : "还没有学习过的单词"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">请先去学习一些单词吧</p>
          <Link
            to={unitId ? `/unit/${unitId}` : "/"}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium cursor-pointer active:scale-95 transition-all"
          >
            <Home className="w-5 h-5" />
            {unitId ? `学习单元 ${unitId}` : "返回首页"}
          </Link>
        </div>
      </PageContainer>
    );
  }

  if (!currentWord) {
    return null;
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="text-right">
          {unitId && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">单元 {unitId}</div>
          )}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentIndex + 1} / {words.length}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {correctCount}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">正确</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {wrongCount}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">错误</div>
        </div>
      </div>

      <ProgressBar
        current={currentIndex + 1}
        total={words.length}
        colorFrom="from-purple-500"
        colorTo="to-pink-500"
      />

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="mb-6">
          {/* 中文释义 */}
          <div className="text-center mb-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl px-6 py-4">
              <div className="text-2xl text-gray-800 dark:text-gray-100 font-medium">
                {currentWord.zh_cn}
              </div>
            </div>
          </div>

          {/* 音标 */}
          {phonetic && (
            <div className="text-center mb-4">
              <div className="text-base text-gray-500 dark:text-gray-400 font-mono">
                {phonetic}
              </div>
            </div>
          )}

          {/* 发音按钮 */}
          <div className="mb-6">
            <PronunciationButtons
              wordObj={currentWord}
              singularColor="purple"
              pluralColor="pink"
            />
          </div>

          {/* 输入框 */}
          <AnswerInput
            value={userInput}
            onChange={setUserInput}
            onKeyPress={handleKeyPress}
            disabled={isCorrect !== null}
            borderColor="purple"
          />

          {/* 答案反馈 */}
          {isCorrect !== null && (
            <AnswerFeedback
              isCorrect={isCorrect}
              correctWord={currentWord.word}
            />
          )}
        </div>

        {isCorrect === null ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!userInput.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold cursor-pointer active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            检查答案
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold cursor-pointer active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentIndex === words.length - 1 ? "复习完成" : "下一个单词"}
          </button>
        )}
      </div>

      {/* Completion Message */}
      {currentIndex === words.length - 1 && isCorrect !== null && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">复习完成！</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            正确率：
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {Math.round((correctCount / (correctCount + wrongCount)) * 100)}%
            </span>
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium cursor-pointer active:scale-95 transition-all"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      )}
    </PageContainer>
  );
}
