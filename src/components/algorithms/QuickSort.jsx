"use client";
import { useState, useCallback } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function QuickSort({ speed = 1 }) {
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
    const delay = (ms) => new Promise((res) => setTimeout(res, ms / speed));
    let arr = [...array];

    async function partition(arr, low, high) {
      let pivot = arr[high];
      logAction(`Partitioning array [${low}..${high}] with Pivot: ${pivot}`);
      setPivotIndices([high]);
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        setCurrentIndices([j, i + 1]);
        await delay(200);
        if (arr[j] < pivot) {
          i++;
          setSwappedIndices([i, j]);
          await delay(200);
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          setSwappedIndices([]);
        }
      }
      setSwappedIndices([i + 1, high]);
      await delay(300);
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

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`}
          python={`def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`}
          javascript={`function quickSort(arr, low = 0, high = arr.length - 1) {
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
        />
      </div>
    </div>
  );
}
