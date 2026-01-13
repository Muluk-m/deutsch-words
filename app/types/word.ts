export interface Word {
  word: string;
  zh_cn: string;
  phonetic?: string; // IPA 音标，例如 /haʊ̯s/
}

export interface ParsedWord {
  word: string;
  article?: string;
  plural?: string;
  forPronunciation: string;
  singularForPronunciation: string;
  pluralForPronunciation?: string;
}

