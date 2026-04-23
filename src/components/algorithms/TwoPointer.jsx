"use client";
import { useState } from "react";

export default function TwoPointer() {
  const [array] = useState([2, 7, 11, 15, 20, 25]);
  const [target, setTarget] = useState(18);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [found, setFound] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const startSearch = async () => {
    setIsRunning(true);
    setFound(false);
    let l = 0;
    let r = array.length - 1;
    setLeft(l);
    setRight(r);
    setActionLog([`Starting Two Pointer search for sum = ${target}`]);
    await delay(800);

    while (l < r) {
      let sum = array[l] + array[r];
      logAction(`Current sum: ${array[l]} + ${array[r]} = ${sum}`);
      await delay(800);

      if (sum === target) {
        setFound(true);
        logAction(`Found match! Indices [${l}, ${r}] give sum ${target}.`);
        break;
      } else if (sum < target) {
        logAction(`Sum ${sum} is less than target ${target}. Moving left pointer rightwards.`);
        l++;
        setLeft(l);
        await delay(500);
      } else {
        logAction(`Sum ${sum} is greater than target ${target}. Moving right pointer leftwards.`);
        r--;
        setRight(r);
        await delay(500);
      }
    }
    
    if (l >= r && !found) logAction(`No two elements sum up to ${target}.`);
    setIsRunning(false);
  };

  const reset = () => {
    setLeft(0); setRight(array.length - 1); setFound(false); setActionLog(["Reset."]);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Two Pointers (Target Sum)</h3>
        <p>The <strong>Two Pointer</strong> technique is often used to search pairs in a sorted array. One pointer starts at the beginning and the other at the end. We move them towards each other based on conditions (e.g. comparing the sum of the two elements against a target). This reduces the time complexity from O(N²) to O(N).</p>
      </div>

      <div className="controls">
        <label>Target Sum:</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          disabled={isRunning}
        />
        <button onClick={startSearch} disabled={isRunning}>
          {isRunning ? "Running..." : "Start"}
        </button>
        <button onClick={reset} disabled={isRunning}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '350px' }}>
          <div className="array" style={{ position: 'relative', marginTop: '30px' }}>
            {array.map((val, idx) => {
              let className = "cell";
              if (found && (idx === left || idx === right)) className += " found";
              else if (idx === left || idx === right) className += " pointer";

              return (
                <div key={idx} style={{ position: 'relative' }}>
                  {idx === left && !found && <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>L↓</div>}
                  {idx === right && !found && <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>R↓</div>}
                  <div className={className} style={{ flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', color: 'inherit', opacity: 0.6 }}>{idx}</span>
                    {val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enter a target sum and click Start.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`function twoSum(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  
  while (left < right) {
    let sum = sortedArr[left] + sortedArr[right];
    
    if (sum === target) {
      return [left, right]; // Found pair
    }
    
    if (sum < target) {
      left++; // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  
  return null; // No pair found
}`}
        </pre>
      </div>
    </div>
  );
}
