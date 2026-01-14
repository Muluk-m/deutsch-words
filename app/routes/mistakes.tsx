import type { Route } from "./+types/mistakes";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { MistakeRecord } from "../types/word";
import { PageContainer } from "../components/PageContainer";
import { BackButton } from "../components/BackButton";
import { getMistakesList, removeMistake } from "../utils/storageManager";

export function meta({}: Route.MetaArgs) {
  return [{ title: "错题本 - Deutsch Wörter" }];
}

export default function Mistakes() {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'frequent'>('all');

  useEffect(() => {
    loadMistakes();
  }, []);

  const loadMistakes = () => {
    const allMistakes = getMistakesList();
    setMistakes(allMistakes);
  };

  const handleRemove = (word: string) => {
    if (confirm(`确定要从错题本中移除「${word}」吗？`)) {
      removeMistake(word);
      loadMistakes();
    }
  };

  const filteredMistakes = filter === 'frequent'
    ? mistakes.filter(m => m.wrongCount >= 3)
    : mistakes;

  if (mistakes.length === 0) {
    return (
      <PageContainer>
        <div className="animate-fadeIn">
          <div className="flex justify-center mb-8">
            <BackButton />
          </div>
          <div className="text-center py-20">
            <div className="text-8xl mb-6 animate-bounce-once">✨</div>
            <h2 className="text-3xl font-extrabold mb-3">
              <span className="gradient-text-green">错题本是空的</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-medium">
              你还没有答错过任何单词，继续保持！🎉
            </p>
            <Link
              to="/"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              返回首页
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="animate-fadeIn">
        <BackButton />

        {/* 标题 */}
        <div className="mb-8 mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
                错题本
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                重点攻克这 {mistakes.length} 个易错单词
              </p>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-slideInUp">
          <div className="card-gradient p-5 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              {mistakes.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">错题总数</div>
          </div>
          <div className="card-gradient p-5 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              {mistakes.filter(m => m.wrongCount >= 3).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">高频错误</div>
          </div>
          <div className="card-gradient p-5 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
              {Math.max(...mistakes.map(m => m.wrongCount), 0)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">最多错误</div>
          </div>
        </div>

        {/* 筛选按钮 */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            全部 ({mistakes.length})
          </button>
          <button
            onClick={() => setFilter('frequent')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
              filter === 'frequent'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            高频错误 ({mistakes.filter(m => m.wrongCount >= 3).length})
          </button>
        </div>

      {/* 错题列表 */}
      <div className="space-y-4 mb-8">
        {filteredMistakes.map((mistake, idx) => (
          <div
            key={mistake.word}
            className="card p-6 border-l-4 border-red-500 hover:shadow-xl transition-all animate-slideInUp"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {mistake.word}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                    mistake.wrongCount >= 5
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                      : mistake.wrongCount >= 3
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                  }`}>
                    ⚠️ 错误 {mistake.wrongCount} 次
                  </span>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 font-medium">{mistake.zh_cn}</p>
                
                {/* 错误答案历史 */}
                {mistake.wrongAnswers.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      常见错误：
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mistake.wrongAnswers.slice(0, 5).map((wrongAnswer, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-mono border border-red-200 dark:border-red-800"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                          {wrongAnswer || '(空)'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  最后错误时间: {new Date(mistake.lastWrongDate).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <button
                onClick={() => handleRemove(mistake.word)}
                className="ml-4 p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                title="从错题本移除"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/test-modes?source=mistakes"
          className="flex-1 btn-danger py-4 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
          </svg>
          专项练习错题
        </Link>
        <Link
          to="/"
          className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
          返回首页
        </Link>
      </div>
      </div>
    </PageContainer>
  );
}

