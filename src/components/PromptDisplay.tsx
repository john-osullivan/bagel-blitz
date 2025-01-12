import React, { useRef, useEffect, useState } from "react";

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(32); // Default font size in px

  // Function to calculate font size based on container dimensions and prompt length
  const calculateFontSize = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Calculate the maximum font size that can fit the prompt within the container
    const baseFontSize = Math.min(width / prompt.length, height / 3); // Adjust scaling factors as needed
    const adjustedFontSize = Math.max(16, Math.min(baseFontSize, 80)); // Set bounds (min: 16px, max: 80px)

    setFontSize(adjustedFontSize);
  };

  useEffect(() => {
    calculateFontSize();

    // Observe container size changes
    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup observer on unmount
    return () => resizeObserver.disconnect();
  }, [prompt]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-[60vh] p-4 text-center overflow-hidden bg-white dark:bg-gray-800 rounded-lg"
    >
      <p
        className="font-bold leading-snug break-words"
        style={{
          fontSize: `${fontSize}px`, // Use the calculated font size
        }}
      >
        {prompt}
      </p>
    </div>
  );
};

export default PromptDisplay;
