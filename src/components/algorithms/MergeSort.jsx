"use client";
import { useState, useCallback } from "react";

export default function MergeSort() {
  const defaultArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 3];
  const [array, setArray] = useState([...defaultArray]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg].slice(-8));

  const visualizeMergeSort = useCallback(async () => {
    setIsRunning(true);
    setActionLog(["Starting Merge Sort..."]);
    let arr = [...array];

    async function merge(arr, l, m, r) {
      logAction(`Merging subarrays: [${l}..${m}] and [${m+1}..${r}]`);
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
      let i = 0, j = 0, k = l;
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
        arr[k] = L[i]; i++; k++;
        setArray([...arr]);
        await new Promise((res) => setTimeout(res, 50));
      }
      while (j < n2) {
        arr[k] = R[j]; j++; k++;
        setArray([...arr]);
        await new Promise((res) => setTimeout(res, 50));
      }
      logAction(`Merged into: ${arr.slice(l, r+1).join(", ")}`);
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
    logAction("Array fully sorted using Merge Sort!");
  }, [array]);

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Merge Sort</h3>
        <p><strong>Merge Sort</strong> is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. Time complexity: O(N log N).</p>
      </div>

      <div className="controls">
        <button onClick={visualizeMergeSort} disabled={isRunning}>
          {isRunning ? "Sorting..." : "Start Merge Sort"}
        </button>
        <button
          onClick={() => {
            setArray([...defaultArray]);
            setCurrentIndices([]);
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
              if (currentIndices.includes(idx)) className += " current";
              else className += " visited";
              return (
                <div key={idx} className={className} style={{ transition: 'all 0.3s ease' }}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Click Start Merge Sort.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`}
        </pre>
      </div>
    </div>
  );
}
