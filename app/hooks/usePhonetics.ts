import { useState, useEffect } from "react";

/**
 * 获取德语单词的 IPA 音标
 * @param word 完整的单词（可能包含冠词和复数）
 * @param cachedPhonetic 缓存的音标（来自 words.json）
 */
export function usePhonetics(word: string, cachedPhonetic?: string) {
  const [phonetic, setPhonetic] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!word) {
      setPhonetic("");
      return;
    }

    // 如果有缓存的音标，直接使用
    if (cachedPhonetic) {
      setPhonetic(cachedPhonetic);
      return;
    }

    // 提取纯单词（去掉冠词和复数信息）
    const cleanWord = word
      .replace(/^(der|die|das)\s+/, "")
      .replace(/,.*$/, "")
      .replace(/\(.*?\)/g, "")
      .trim();

    const fetchPhonetic = async () => {
      setLoading(true);
      try {
        // 使用 Wiktionary REST API 获取 HTML 页面
        const response = await fetch(
          `https://de.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(
            cleanWord
          )}`
        );

        if (response.ok) {
          const html = await response.text();
          
          // 使用 DOMParser 解析 HTML
          const doc = new DOMParser().parseFromString(html, "text/html");
          
          // 查找所有 class="ipa" 的元素
          const ipas = Array.from(doc.querySelectorAll(".ipa"))
            .map(el => el.textContent?.trim())
            .filter(Boolean);
          
          // 使用第一个找到的 IPA 音标
          if (ipas.length > 0 && ipas[0]) {
            let ipa = ipas[0];
            // 确保音标前后都有斜杠
            if (!ipa.startsWith('/')) {
              ipa = '/' + ipa;
            }
            if (!ipa.endsWith('/')) {
              ipa = ipa + '/';
            }
            setPhonetic(ipa);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching phonetic:", error);
      } finally {
        setLoading(false);
      }
    };

    // 添加小延迟，避免过于频繁的 API 调用
    const timeoutId = setTimeout(() => {
      fetchPhonetic();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [word, cachedPhonetic]);

  return { phonetic, loading };
}

