"use client";

import { useState, useCallback } from "react";

export default function DynamicProgramming() {
  const [n, setN] = useState(8);
  const [dp, setDp] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const calculateFibonacci = useCallback(async () => {
    setIsRunning(true);
    setDp([]);
    setResult(null);

    const fibArray = Array.from({ length: n + 1 }, (_, i) => ({
      index: i,
      value: 0,
      calculated: false,
    }));

    // Base cases
    fibArray[0].value = 0;
    fibArray[0].calculated = true;

    if (n >= 1) {
      fibArray[1].value = 1;
      fibArray[1].calculated = true;
    }

    setDp([...fibArray]);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Fill the rest
    for (let i = 2; i <= n; i++) {
      fibArray[i].value = fibArray[i - 1].value + fibArray[i - 2].value;
      fibArray[i].calculated = true;
      setDp([...fibArray]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setResult(fibArray[n].value);
    setIsRunning(false);
  }, [n]);

  return (
    <div className="algo-container">
      <div className="controls">
        <div>
          <label>N (Fibonacci): </label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.max(0, Number(e.target.value)))}
            disabled={isRunning}
            min="0"
            max="20"
          />
        </div>
        <button onClick={calculateFibonacci} disabled={isRunning}>
          {isRunning ? "Calculating..." : "Calculate"}
        </button>
        <button
          onClick={() => {
            setDp([]);
            setResult(null);
          }}
        >
          Reset
        </button>
      </div>

      <div className="dp-container">
        <div className="dp-table">
          {dp.map((item) => (
            <div
              key={item.index}
              className={`dp-cell ${item.calculated ? "calculated" : "pending"}`}
            >
              <div className="dp-index">F({item.index})</div>
              <div className="dp-value">
                {item.calculated ? item.value : "?"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {result !== null && (
        <div className="result">
          Fibonacci({n}) = {result}
        </div>
      )}

      <div className="explanation">
        <p>
          Dynamic Programming builds solutions bottom-up. Each value depends on
          previously calculated values: F(n) = F(n-1) + F(n-2)
        </p>
      </div>
    </div>
  );
}
