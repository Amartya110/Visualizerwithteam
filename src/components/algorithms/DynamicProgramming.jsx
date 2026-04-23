"use client";
import { useState, useCallback } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function DynamicProgramming({ speed = 1 }) {
  const [n, setN] = useState(8);
  const [dp, setDp] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg].slice(-8));

  const calculateFibonacci = useCallback(async () => {
    setIsRunning(true);
    setDp([]);
    setResult(null);
    setActionLog([`Calculating Fibonacci sequence up to N=${n}...`]);

    const fibArray = Array.from({ length: n + 1 }, (_, i) => ({
      index: i,
      value: 0,
      calculated: false,
    }));

    // Base cases
    fibArray[0].value = 0;
    fibArray[0].calculated = true;
    logAction(`Base Case: F(0) = 0`);

    if (n >= 1) {
      fibArray[1].value = 1;
      fibArray[1].calculated = true;
      logAction(`Base Case: F(1) = 1`);
    }

    setDp([...fibArray]);
    await new Promise((resolve) => setTimeout(resolve, 600 / speed));

    // Fill the rest
    for (let i = 2; i <= n; i++) {
      let v1 = fibArray[i - 1].value;
      let v2 = fibArray[i - 2].value;
      fibArray[i].value = v1 + v2;
      fibArray[i].calculated = true;
      logAction(`Calculating F(${i}): F(${i-1}) + F(${i-2}) = ${v1} + ${v2} = ${fibArray[i].value}`);
      setDp([...fibArray]);
      await new Promise((resolve) => setTimeout(resolve, 600 / speed));
    }

    setResult(fibArray[n].value);
    setIsRunning(false);
    logAction(`Calculation Complete! F(${n}) = ${fibArray[n].value}`);
  }, [n, speed]);

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Dynamic Programming (Fibonacci)</h3>
        <p><strong>Dynamic Programming</strong> builds solutions bottom-up by breaking down a problem into smaller overlapping subproblems. Here, we calculate Fibonacci numbers by caching previous results: <code>F(n) = F(n-1) + F(n-2)</code>. This avoids redundant calculations, turning an O(2^N) recursive approach into an O(N) iterative one.</p>
      </div>

      <div className="controls">
        <label>N (Fibonacci): </label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Math.max(0, Number(e.target.value)))}
          disabled={isRunning}
          min="0"
          max="20"
        />
        <button onClick={calculateFibonacci} disabled={isRunning}>
          {isRunning ? "Calculating..." : "Calculate"}
        </button>
        <button
          onClick={() => {
            setDp([]);
            setResult(null);
            setActionLog(["Reset."]);
          }}
          disabled={isRunning}
        >
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '350px' }}>
          
          {result !== null && (
            <div className="result" style={{ marginBottom: '20px', fontSize: '18px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '15px 25px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)' }}>
              <strong>Result:</strong> Fibonacci({n}) = {result}
            </div>
          )}

          <div className="dp-container" style={{ width: '100%', margin: 0 }}>
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
              {dp.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Empty DP Table</div>}
            </div>
          </div>
        </div>
        
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Select N and click Calculate.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`int fibonacci(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`}
          python={`def fibonacci(n):
    if n <= 1:
        return n
        
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
        
    return dp[n]`}
          javascript={`function fibonacci(n) {
  if (n <= 1) return n;
  
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`}
        />
      </div>
    </div>
  );
}
