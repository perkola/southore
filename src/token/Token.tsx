/**
 * Represents a Chinese character with its properties and optional components.
 *
 * Example:
 * {
 *   type: 'character',
 *   sign: '好',
 *   pinyin: 'hǎo',
 *   translation: 'good',
 *   components: [
 *     { type: 'character', sign: '女', pinyin: 'nǚ', translation: 'woman' },
 *     { type: 'character', sign: '子', pinyin: 'zǐ', translation: 'child' }
 *   ]
 * }
 */
export interface ChineseCharacter {
  /** The type identifier for this interface. */
  type: "character";
  /** The Chinese character itself. */
  sign: string;
  /** The pinyin (romanized pronunciation) of the character. */
  pinyin: string;
  /** The English translation or meaning of the character. */
  translation: string;
  /** Optional array of component characters that make up this character. */
  components?: ChineseCharacter[];
}

/**
 * Represents a Chinese word, which may consist of multiple characters.
 *
 * Example:
 * {
 *   type: 'word',
 *   word: '今天',
 *   pinyin: 'jīntiān',
 *   translation: 'today',
 *   characters: [
 *     { type: 'character', sign: '今', pinyin: 'jīn', translation: 'now' },
 *     { type: 'character', sign: '天', pinyin: 'tiān', translation: 'day' }
 *   ]
 * }
 */
export interface ChineseWord {
  /** The type identifier for this interface. */
  type: "word";
  /** The Chinese word itself. */
  word: string;
  /** The pinyin (romanized pronunciation) of the word. */
  pinyin: string;
  /** The English translation or meaning of the word. */
  translation: string;
  /** The array of ChineseCharacter objects that make up this word. */
  characters: ChineseCharacter[];
}

export type ChineseToken = ChineseCharacter | ChineseWord;

export interface TokenProps {
  token: ChineseToken;
}

export function Token({ token }: TokenProps) {
  const main = token.type === "character" ? token.sign : token.word;
  const pinyin = token.pinyin;
  const translation = token.translation;

  return (
    <div className="flex flex-col w-fit rounded shadow-sm bg-gray-500 text-center overflow-hidden min-w-16">
      <div className="bg-blue-200 px-3 py-1">{main}</div>
      <div className="bg-blue-100 px-3 py-1">{pinyin}</div>
      <div className="bg-blue-50 px-3 py-1">{translation}</div>
    </div>
  );
}
