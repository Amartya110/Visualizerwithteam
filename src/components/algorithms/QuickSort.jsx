"use client";
import { useState, useCallback } from "react";

export default function QuickSort() {
  const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 3];
  const [array, setArray] = useState([...defaultArray]);
  const [isRunning, setIsRunning] = useState(false);
  const [pivotIndices, setPivotIndices] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg].slice(-8));

  const visualizeQuickSort = useCallback(async () => {
    setIsRunning(true);
    setActionLog(["Starting Quick Sort..."]);
    let arr = [...array];

    async function partition(arr, low, high) {
      let pivot = arr[high];
      logAction(`Partitioning array [${low}..${high}] with Pivot: ${pivot}`);
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
      logAction(`Placed Pivot ${pivot} at its correct position (index ${i+1})`);
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
    logAction("Array fully sorted using Quick Sort!");
  }, [array]);

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Quick Sort</h3>
        <p><strong>Quick Sort</strong> is a Divide and Conquer algorithm. It picks an element as a <strong>pivot</strong> and partitions the given array around the picked pivot, placing smaller elements to the left and larger elements to the right. Time complexity: O(N log N) on average.</p>
      </div>

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
            setActionLog(["Reset."]);
          }}
          disabled={isRunning}
        >
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '350px' }}>
          <div className="array">
            {array.map((num, idx) => {
              let className = "cell";
              if (pivotIndices.includes(idx)) className += " found"; // Pivot
              else if (swappedIndices.includes(idx)) className += " current"; // Swapped
              else if (currentIndices.includes(idx)) className += " pointer"; // Scanning
              else className += " visited";
              return (
                <div key={idx} className={className} style={{ position: 'relative' }}>
                  {pivotIndices.includes(idx) && <div style={{ position: 'absolute', top: '-25px', color: '#10b981', fontSize: '10px', fontWeight: 'bold' }}>PIVOT</div>}
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Click Start Quick Sort.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap
  return i + 1;
}`}
        </pre>
      </div>
    </div>
  );
}
