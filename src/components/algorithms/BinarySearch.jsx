"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function BinarySearch({ speed = 1 }) {
  const [array] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  const [target, setTarget] = useState(11);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms / speed));

  const startSearch = async () => {
    setIsRunning(true);
    setFound(-1);
    setActionLog([]);
    let l = 0;
    let r = array.length - 1;
    
    logAction(`Starting Binary Search for target: ${target}`);

    while (l <= r) {
      setLeft(l);
      setRight(r);
      logAction(`Search bounds updated: Left index = ${l}, Right index = ${r}`);
      await delay(800);
      
      let m = Math.floor((l + r) / 2);
      setMid(m);
      logAction(`Calculated Midpoint index = ${m} (Value: ${array[m]})`);
      await delay(800);

      if (array[m] === target) {
        setFound(m);
        logAction(`Target ${target} found at index ${m}!`);
        break;
      } else if (array[m] < target) {
        logAction(`Value ${array[m]} is less than target ${target}. Ignoring left half.`);
        l = m + 1;
      } else {
        logAction(`Value ${array[m]} is greater than target ${target}. Ignoring right half.`);
        r = m - 1;
      }
    }
    
    if (l > r && array[mid] !== target) {
       setLeft(-1);
       setRight(-1);
       setMid(-1);
       logAction(`Target ${target} not found in the array.`);
    }

    setIsRunning(false);
  };

  const reset = () => {
    setLeft(-1); setRight(-1); setMid(-1); setFound(-1); setActionLog(["Reset."]);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Binary Search</h3>
        <p><strong>Binary Search</strong> is an efficient algorithm for finding an item from a <strong>sorted list</strong> of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. Time complexity: O(log N).</p>
      </div>

      <div className="controls">
        <label>Target:</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          disabled={isRunning}
        />
        <button onClick={startSearch} disabled={isRunning}>
          {isRunning ? "Searching..." : "Search"}
        </button>
        <button onClick={reset} disabled={isRunning}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '350px' }}>
          <div className="array">
            {array.map((val, idx) => {
              let className = "cell";
              if (found === idx) className += " found";
              else if (mid === idx) className += " current";
              else if (idx >= left && idx <= right) className += " range";
              else if (left !== -1 && (idx < left || idx > right)) className += " inactive";

              return (
                <div key={idx} className={className} style={{ flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: 'inherit', opacity: 0.6 }}>{idx}</span>
                  {val}
                </div>
              );
            })}
          </div>
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enter a target and click Search.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        
        if (arr[mid] < target)
            left = mid + 1; // Ignore left half
        else
            right = mid - 1; // Ignore right half
    }
    
    return -1; // Not found
}`}
          python={`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1 # Ignore left half
        else:
            right = mid - 1 # Ignore right half
            
    return -1 # Not found`}
          javascript={`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      left = mid + 1; // Ignore left half
    } else {
      right = mid - 1; // Ignore right half
    }
  }
  
  return -1; // Not found
}`}
        />
      </div>
    </div>
  );
}
