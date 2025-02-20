import { useState, useEffect } from "react";

export default function TypingText({ htmlContent, speed = 25 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const fullText = tempDiv.innerText; // Extract text without HTML tags

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [htmlContent, speed]);

  return (
    <div className="text-xl font-mono">
      <span
        dangerouslySetInnerHTML={{
          __html: applyHTMLFormatting(htmlContent, displayedText),
        }}
      />
      <span className="border-r-2 border-black animate-pulse"></span>
    </div>
  );
}

// Applies HTML formatting to the typed text
const applyHTMLFormatting = (htmlContent, typedText) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT);
  let remaining = typedText.length;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (remaining >= node.textContent.length) {
      remaining -= node.textContent.length;
    } else {
      node.textContent = node.textContent.slice(0, remaining);
      remaining = 0;
    }
  }

  return tempDiv.innerHTML;
};