import React, { useRef, useEffect, useState } from "react";

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(32); // Default font size in px

  const calculateFontSize = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    console.log("Container dimensions:", { width, height });

    const tempElement = document.createElement("p");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.lineHeight = "1.2";
    tempElement.className = "font-bold break-words p-4";
    tempElement.innerText = prompt;

    document.body.appendChild(tempElement);

    let currentFontSize = 16; // Start small
    let measuredHeight = 0;

    while (true) {
      tempElement.style.fontSize = `${currentFontSize}px`;
      measuredHeight = tempElement.offsetHeight;

      if (measuredHeight >= height) {
        console.log(`Overshot height at font size ${currentFontSize}px`);
        break;
      }

      currentFontSize++;
    }

    document.body.removeChild(tempElement);

    // Set font size to one step below the overshot value
    const finalFontSize = Math.max(16, currentFontSize - 5);
    console.log("Final font size:", finalFontSize);
    setFontSize(finalFontSize);
  };



  useEffect(() => {
    calculateFontSize();

    // Observe container size changes
    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [prompt]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center text-center w-full h-[60vh] p-4 overflow-auto border-gray-300 border-2 rounded-lg"
    >
      <p
        className="font-bold break-words"
        style={{
          fontSize: `${fontSize}px`,
          whiteSpace: "pre-wrap",
          lineHeight: "1.2", // Tighter line height for better use of vertical space
        }}
      >
        {prompt}
      </p>
    </div>
  );
};

export default PromptDisplay;