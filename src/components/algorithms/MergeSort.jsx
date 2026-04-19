"use client";

import { useState, useCallback } from "react";

export default function MergeSort() {
  const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 3];
  const [array, setArray] = useState([...defaultArray]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndices, setCurrentIndices] = useState([]);

  const visualizeMergeSort = useCallback(async () => {
    setIsRunning(true);
    let arr = [...array];
    async function merge(arr, l, m, r) {
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
      let i = 0,
        j = 0,
        k = l;
      while (i < n1 && j < n2) {
        setCurrentIndices([l + i, m + 1 + j]);
        await new Promise((res) => setTimeout(res, 200));
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setArray([...arr]);
        k++;
        await new Promise((res) => setTimeout(res, 100));
      }
      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        setArray([...arr]);
        await new Promise((res) => setTimeout(res, 50));
      }
      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        setArray([...arr]);
        await new Promise((res) => setTimeout(res, 50));
      }
    }

    async function mergeSort(arr, l, r) {
      if (l >= r) return;
      let m = l + Math.floor((r - l) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }

    await mergeSort(arr, 0, arr.length - 1);
    setCurrentIndices([]);
    setIsRunning(false);
  }, [array]);

  return (
    <div className="algo-container">
      <div className="controls">
        <button onClick={visualizeMergeSort} disabled={isRunning}>
          {isRunning ? "Sorting..." : "Start Merge Sort"}
        </button>
        <button
          onClick={() => {
            setArray([...defaultArray]);
            setCurrentIndices([]);
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
            if (currentIndices.includes(idx)) className += " current";
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
