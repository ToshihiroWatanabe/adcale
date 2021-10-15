/**
 * 全角文字は2文字、半角文字は1文字としてカウントします。
 * @param {string} str
 * @returns 文字数
 */
export const byteLength = (str) => {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    str[i].match(/[ -~]/) ? (length += 1) : (length += 2);
  }
  return length;
};

/**
 * 指定された文字数を超えた分を省略します。
 * @param {string} str 文字列
 * @param {number} length 文字数
 */
export const byteSlice = (str, length) => {
  if (byteLength(str) <= length) {
    return str;
  }
  while (byteLength(str) > length) {
    str = str.slice(0, -1);
  }
  return str + "...";
};
