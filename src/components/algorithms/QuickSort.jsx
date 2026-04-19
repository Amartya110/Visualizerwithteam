"use client";

import { useState, useCallback } from "react";

export default function QuickSort() {
  const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 3];
  const [array, setArray] = useState([...defaultArray]);
  const [isRunning, setIsRunning] = useState(false);
  const [pivotIndices, setPivotIndices] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [swappedIndices, setSwappedIndices] = useState([]);

  const visualizeQuickSort = useCallback(async () => {
    setIsRunning(true);
    let arr = [...array];

    async function partition(arr, low, high) {
      let pivot = arr[high];
      setPivotIndices([high]);
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        setCurrentIndices([j, i + 1]);
        await new Promise((res) => setTimeout(res, 200));
        if (arr[j] < pivot) {
          i++;
          setSwappedIndices([i, j]);
          await new Promise((res) => setTimeout(res, 200));
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          setSwappedIndices([]);
        }
      }
      setSwappedIndices([i + 1, high]);
      await new Promise((res) => setTimeout(res, 300));
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      setSwappedIndices([]);
      setPivotIndices([]);
      return i + 1;
    }

    async function quickSort(arr, low, high) {
      if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
      }
    }

    await quickSort(arr, 0, arr.length - 1);
    setCurrentIndices([]);
    setPivotIndices([]);
    setIsRunning(false);
  }, [array]);

  return (
    <div className="algo-container">
      <div className="controls">
        <button onClick={visualizeQuickSort} disabled={isRunning}>
          {isRunning ? "Sorting..." : "Start Quick Sort"}
        </button>
        <button
          onClick={() => {
            setArray([...defaultArray]);
            setCurrentIndices([]);
            setPivotIndices([]);
            setSwappedIndices([]);
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
            if (pivotIndices.includes(idx)) className += " found";
            else if (swappedIndices.includes(idx)) className += " current";
            else if (currentIndices.includes(idx)) className += " pointer";
            else className += " visited";
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
