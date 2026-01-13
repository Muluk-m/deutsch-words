import type { Route } from "./+types/units";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { Word } from "../types/word";
import { PageContainer } from "../components/PageContainer";
import { BackButton } from "../components/BackButton";
import { createUnits, getUnitProgress } from "../utils/unitManager";

export function meta({}: Route.MetaArgs) {
  return [{ title: "选择单元 - Deutsch Wörter" }];
}

export default function Units() {
  const [words, setWords] = useState<Word[]>([]);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json() as Promise<Word[]>)
      .then((data) => {
        setWords(data);
        const learned = JSON.parse(
          localStorage.getItem("learnedWords") || "[]"
        ) as string[];
        setLearnedWords(learned);
      });
  }, []);

  const units = createUnits(words.length);

  return (
    <PageContainer>
      <BackButton />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">选择学习单元</h1>
        <p className="text-gray-600">每个单元包含 100 个单词</p>
      </div>

      <div className="grid gap-4 mb-6">
        {units.map((unit) => {
          const progress = getUnitProgress(unit.id, learnedWords, words);
          const isCompleted = progress.percentage === 100;
          const isStarted = progress.percentage > 0;

          return (
            <Link
              key={unit.id}
              to={`/learn?unit=${unit.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 block"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {unit.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    单词 {unit.startIndex + 1} - {unit.endIndex}
                  </p>
                </div>
                <div className="text-right">
                  {isCompleted ? (
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full text-2xl">
                      ✓
                    </span>
                  ) : isStarted ? (
                    <div className="text-2xl font-bold text-blue-600">
                      {progress.percentage}%
                    </div>
                  ) : (
                    <div className="text-2xl text-gray-400">📚</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    已学习 {progress.learned} / {progress.total}
                  </span>
                  <span>{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isCompleted
                        ? "bg-green-500"
                        : isStarted
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/learn?unit=${unit.id}`}
                  className="flex-1 text-center bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  📚 学习
                </Link>
                {isStarted && (
                  <>
                    <Link
                      to={`/review?unit=${unit.id}`}
                      className="flex-1 text-center bg-purple-50 text-purple-600 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🔄 复习
                    </Link>
                    <Link
                      to={`/random?unit=${unit.id}`}
                      className="flex-1 text-center bg-green-50 text-green-600 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🎲 测试
                    </Link>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 总体统计 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">总体进度</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">
              {learnedWords.length}
            </div>
            <div className="text-sm opacity-90">已学习</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{words.length}</div>
            <div className="text-sm opacity-90">总单词</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {words.length > 0
                ? Math.round((learnedWords.length / words.length) * 100)
                : 0}
              %
            </div>
            <div className="text-sm opacity-90">完成率</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

