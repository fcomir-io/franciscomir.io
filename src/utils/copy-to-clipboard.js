const copyToClipboard = (str) => {
  const clipboard = window.navigator.clipboard;

  if (!clipboard || typeof clipboard.writeText != "function") {
    const textArea = document.createElement("textarea");
    textArea.value = str;
    textArea.setAttribute("readonly", true);
    textArea.setAttribute("contenteditable", true);
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    const range = document.createRange();
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    textArea.setSelectionRange(0, textArea.value.length);
    document.execCommand("copy");
    document.body.removeChild(textArea);

    return Promise.resolve(true);
  }

  return clipboard.writeText(str);
};

export default copyToClipboard;
