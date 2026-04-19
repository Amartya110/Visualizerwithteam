"use client";

import { useState, useCallback } from "react";

export default function TwoPointer() {
  const [target, setTarget] = useState(75);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("");

  const sortedArray = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
  ];

  const visualizeTwoPointer = useCallback(async () => {
    setIsRunning(true);
    setSteps([]);
    setResult("");

    let left = 0;
    let right = sortedArray.length - 1;
    const newSteps = [];

    while (left < right) {
      const sum = sortedArray[left] + sortedArray[right];

      newSteps.push({
        left,
        right,
        sum,
        status: "searching",
      });

      setSteps([...newSteps]);
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (sum === target) {
        newSteps[newSteps.length - 1].status = "found";
        setSteps([...newSteps]);
        setResult(
          `Found pair! ${sortedArray[left]} + ${sortedArray[right]} = ${target}`,
        );
        setIsRunning(false);
        return;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    setResult(`No pair found that sums to ${target}`);
    setIsRunning(false);
  }, [target, sortedArray]);

  return (
    <div className="algo-container">
      <div className="controls">
        <div>
          <label>Target Sum: </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={isRunning}
            min="0"
            max="150"
          />
        </div>
        <button onClick={visualizeTwoPointer} disabled={isRunning}>
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
              if (
                (idx === step.left || idx === step.right) &&
                step.status === "found"
              )
                className += " found";
              else if (idx === step.left || idx === step.right)
                className += " pointer";
              else className += " inactive";
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
            Step {idx + 1}: L={step.left} ({sortedArray[step.left]}) + R=
            {step.right} ({sortedArray[step.right]}) = {step.sum}
            {step.status === "found" && " ✓"}
          </div>
        ))}
      </div>
    </div>
  );
}
