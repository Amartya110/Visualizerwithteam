"use client";
import { useState } from "react";

export default function BubbleSort() {
  const initialArray = [64, 34, 25, 12, 22, 11, 90];
  const [array, setArray] = useState([...initialArray]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg].slice(-8));
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const sort = async () => {
    setIsRunning(true);
    setActionLog(["Starting Bubble Sort..."]);
    let arr = [...array];
    let n = arr.length;
    let sorted = [];

    for (let i = 0; i < n - 1; i++) {
      logAction(`--- Pass ${i+1} ---`);
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await delay(500);
        
        if (arr[j] > arr[j + 1]) {
          logAction(`Swapping ${arr[j]} and ${arr[j+1]} (since ${arr[j]} > ${arr[j+1]})`);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await delay(500);
        } else {
          logAction(`No swap for ${arr[j]} and ${arr[j+1]} (${arr[j]} <= ${arr[j+1]})`);
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
      logAction(`Element ${arr[n - i - 1]} is now locked in its correct position.`);
    }
    sorted.push(0);
    setSortedIndices([...sorted]);
    setActiveIndices([]);
    setIsRunning(false);
    logAction("Array fully sorted!");
  };

  const reset = () => {
    setArray([...initialArray]);
    setActiveIndices([]);
    setSortedIndices([]);
    setActionLog(["Reset."]);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Bubble Sort</h3>
        <p><strong>Bubble Sort</strong> is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Time complexity: O(N²).</p>
      </div>

      <div className="controls">
        <button onClick={sort} disabled={isRunning}>
          {isRunning ? "Sorting..." : "Start Sort"}
        </button>
        <button onClick={reset} disabled={isRunning}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '350px' }}>
          <div className="array">
            {array.map((val, idx) => {
              let className = "cell";
              if (sortedIndices.includes(idx)) className += " found";
              else if (activeIndices.includes(idx)) className += " current";

              return (
                <div key={idx} className={className} style={{ transition: 'all 0.3s ease', transform: activeIndices.includes(idx) ? 'translateY(-10px)' : 'none' }}>
                  {val}
                </div>
              );
            })}
          </div>
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step" style={{ borderLeftColor: log.includes('---') ? 'transparent' : 'var(--accent-secondary)' }}>{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Click Start Sort.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`}
        </pre>
      </div>
    </div>
  );
}
