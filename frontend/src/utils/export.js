/**
 * テキストをクリップボードにコピーします。
 * @param {string} text
 */
export const copyToClipboard = (text) => {
  // 一時的に要素を追加
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  textArea.id = "copyArea";
  const documentGetElementByIdApp = document.getElementById("root");
  if (documentGetElementByIdApp) {
    documentGetElementByIdApp.appendChild(textArea);
  }
  const documentGetElementByIdCopyArea = document.getElementById("copyArea");
  if (documentGetElementByIdCopyArea) {
    textArea.select();
    document.execCommand("Copy");
    documentGetElementByIdCopyArea.remove();
  }
};
