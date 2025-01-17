import React, { useRef, useEffect, useState } from "react";
import clsx from 'clsx';

interface PromptDisplayProps {
  prompt: string;
  category: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, category }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(32); // Default font size in px

  const calculateFontSize = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    console.debug("Container dimensions:", { width, height });

    const tempElement = document.createElement("p");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.lineHeight = "1.2";
    tempElement.className = "font-bold break-words p-4 w-full lg:w-3/5";
    tempElement.innerText = prompt;

    document.body.appendChild(tempElement);

    let currentFontSize = 16; // Start small
    let measuredHeight = 0;

    while (true) {
      tempElement.style.fontSize = `${currentFontSize}px`;
      measuredHeight = tempElement.offsetHeight;

      if (measuredHeight >= height) {
        console.debug(`Overshot height at font size ${currentFontSize}px`);
        break;
      }

      currentFontSize++;
    }

    document.body.removeChild(tempElement);

    // Set font size to one step below the overshot value
    const finalFontSize = Math.max(16, currentFontSize - 5);
    console.debug("Final font size:", finalFontSize);
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

  const sharedBoxStyles = "w-full lg:w-3/5 text-center"

  return (
    <>
      <div className={clsx(sharedBoxStyles, "bg-primary-shade-500 p-2 rounded-t-lg")}>
        <span className='text-2xl font-bold text-slate-600'>{category}</span>
      </div>
      <div
        ref={containerRef}
        className={clsx(sharedBoxStyles, "flex items-center bg-slate-100 text-slate-800 justify-center h-[60vh] p-4 overflow-auto border-primary-shade-500 border-8 rounded-b-lg")}
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
    </>
  );
};

export default PromptDisplay;
