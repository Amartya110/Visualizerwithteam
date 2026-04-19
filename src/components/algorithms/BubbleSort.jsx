"use client";

import { useState, useCallback } from "react";

export default function BubbleSort() {
  const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 3];
  const [array, setArray] = useState(defaultArray);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const visualizeBubbleSort = useCallback(async () => {
    setIsRunning(true);
    setCurrentIndices([]);
    setSwappedIndices([]);
    setSortedIndices([]);
    let arr = [...array];
    let n = arr.length;
    let swapped = false;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndices([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (arr[j] > arr[j + 1]) {
          setSwappedIndices([j, j + 1]);
          await new Promise((resolve) => setTimeout(resolve, 300));
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          swapped = true;
        }
        setSwappedIndices([]);
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
      if (!swapped) break;
    }
    // Add remaining to sorted
    const allSorted = [];
    for (let i = 0; i < n; i++) allSorted.push(i);
    setSortedIndices(allSorted);
    setCurrentIndices([]);
    setIsRunning(false);
  }, [array]);

  return (
    <div className="algo-container">
      <div className="controls">
        <button onClick={visualizeBubbleSort} disabled={isRunning}>
          {isRunning ? "Sorting..." : "Start Bubble Sort"}
        </button>
        <button
          onClick={() => {
            setArray(defaultArray);
            setCurrentIndices([]);
            setSwappedIndices([]);
            setSortedIndices([]);
          }}
          disabled={isRunning}
        >
          Reset
        </button>
      </div>

      <div className="array-container">
        <div className="array">
          {array.map((num, idx) => {
            let className = "cell";
            if (sortedIndices.includes(idx)) className += " found";
            else if (swappedIndices.includes(idx)) className += " current";
            else if (currentIndices.includes(idx)) className += " pointer";
            return (
              <div key={idx} className={className}>
                {num}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
