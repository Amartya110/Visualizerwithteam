"use client";

import { useState, useCallback } from "react";

export default function BinarySearch() {
  const [target, setTarget] = useState(45);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("");

  const sortedArray = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
  ];

  const visualizeBinarySearch = useCallback(async () => {
    setIsRunning(true);
    setSteps([]);
    setResult("");

    let left = 0;
    let right = sortedArray.length - 1;
    const newSteps = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      newSteps.push({
        left,
        right,
        mid,
        status: "searching",
      });

      setSteps([...newSteps]);
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (sortedArray[mid] === target) {
        newSteps[newSteps.length - 1].status = "found";
        setSteps([...newSteps]);
        setResult(`Found ${target} at index ${mid}!`);
        setIsRunning(false);
        return;
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setResult(`Target ${target} not found in array`);
    setIsRunning(false);
  }, [target, sortedArray]);

  return (
    <div className="algo-container">
      <div className="controls">
        <div>
          <label>Target: </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={isRunning}
            min="0"
            max="100"
          />
        </div>
        <button onClick={visualizeBinarySearch} disabled={isRunning}>
          {isRunning ? "Searching..." : "Start Search"}
        </button>
        <button
          onClick={() => {
            setSteps([]);
            setResult("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="array-container">
        <div className="array">
          {sortedArray.map((num, idx) => {
            const step = steps[steps.length - 1];
            let className = "cell";

            if (step) {
              if (idx === step.mid && step.status === "found")
                className += " found";
              else if (idx === step.mid) className += " current";
              else if (idx >= step.left && idx <= step.right)
                className += " range";
              else className += " visited";
            }

            return (
              <div key={idx} className={className}>
                {num}
              </div>
            );
          })}
        </div>
      </div>

      {result && <div className="result">{result}</div>}

      <div className="steps">
        {steps.map((step, idx) => (
          <div key={idx} className="step">
            Step {idx + 1}: L={step.left}, R={step.right}, Mid={step.mid} (
            {sortedArray[step.mid]}){step.status === "found" && " ✓"}
          </div>
        ))}
      </div>
    </div>
  );
}
