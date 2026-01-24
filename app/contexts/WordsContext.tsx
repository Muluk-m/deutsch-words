/**
 * 全局词库 Context
 * 应用启动时加载一次词库数据，供所有页面共享使用
 */

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";
import type { Word } from "../types/word";
import { filterWordsByUnits, getUnitWords, createUnits, getUnitList } from "../utils/unitManager";

interface WordsContextValue {
  // 原始数据
  words: Word[];
  isLoading: boolean;
  error: string | null;
  
  // 派生数据和工具函数
  getWordByName: (name: string) => Word | undefined;
  getWordsByUnit: (unitId: number) => Word[];
  filterByUnits: (unitIds: number[] | null) => Word[];
  searchWords: (query: string) => Word[];
  units: ReturnType<typeof createUnits>;
  unitList: ReturnType<typeof getUnitList>;
}

const WordsContext = createContext<WordsContextValue | null>(null);

interface WordsProviderProps {
  children: ReactNode;
}

export function WordsProvider({ children }: WordsProviderProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 应用启动时加载词库
  useEffect(() => {
    // 只在客户端加载
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    fetch("/words.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load words: ${res.status}`);
        }
        return res.json() as Promise<Word[]>;
      })
      .then((data) => {
        setWords(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading words:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // 创建单词索引 Map 用于快速查找
  const wordMap = useMemo(() => {
    const map = new Map<string, Word>();
    words.forEach((word) => map.set(word.word, word));
    return map;
  }, [words]);

  // 单元数据
  const units = useMemo(() => createUnits(words), [words]);
  const unitList = useMemo(() => getUnitList(words), [words]);

  // 工具函数
  const getWordByName = (name: string): Word | undefined => {
    return wordMap.get(name);
  };

  const getWordsByUnit = (unitId: number): Word[] => {
    return getUnitWords(words, unitId);
  };

  const filterByUnits = (unitIds: number[] | null): Word[] => {
    return filterWordsByUnits(words, unitIds);
  };

  const searchWords = (query: string): Word[] => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    return words.filter(
      (word) =>
        word.word.toLowerCase().includes(lowerQuery) ||
        word.zh_cn.toLowerCase().includes(lowerQuery)
    );
  };

  const value: WordsContextValue = {
    words,
    isLoading,
    error,
    getWordByName,
    getWordsByUnit,
    filterByUnits,
    searchWords,
    units,
    unitList,
  };

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  );
}

/**
 * 获取词库数据的 Hook
 * @throws 如果在 WordsProvider 外部使用会报错
 */
export function useWords(): WordsContextValue {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
}

/**
 * 可选的词库 Hook，不会报错
 * 在 Provider 外部返回 null
 */
export function useWordsOptional(): WordsContextValue | null {
  return useContext(WordsContext);
}
