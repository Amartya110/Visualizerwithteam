"use client";
import { useState, useCallback } from "react";

export default function BFS() {
  const [visited, setVisited] = useState([]);
  const [active, setActive] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg]);
  };

  const tree = {
    val: 1,
    left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
    right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } },
  };

  const visualizeBFS = useCallback(async () => {
    setIsRunning(true);
    setVisited([]);
    setActive(null);
    setActionLog([]);
    let visitedNodes = [];
    let queue = [tree];

    logAction("Starting BFS. Pushing root node (1) to queue.");

    while (queue.length > 0) {
      let node = queue.shift();
      if (!node) continue;
      
      setActive(node.val);
      logAction(`Dequeued node ${node.val}. Processing...`);
      await new Promise((res) => setTimeout(res, 800));
      
      visitedNodes.push(node.val);
      setVisited([...visitedNodes]);
      logAction(`Marked ${node.val} as visited.`);

      if (node.left) {
        queue.push(node.left);
        logAction(`Enqueued left child (${node.left.val}) of ${node.val}.`);
      }
      if (node.right) {
        queue.push(node.right);
        logAction(`Enqueued right child (${node.right.val}) of ${node.val}.`);
      }
    }

    setActive(null);
    setIsRunning(false);
    logAction("BFS Traversal Complete!");
  }, [tree]);

  const renderTree = (node) => {
    if (!node) return <div className="node" style={{ visibility: "hidden" }}></div>;
    let className = "node";
    if (active === node.val) className += " active";
    else if (visited.includes(node.val)) className += " visited";

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 15px", position: 'relative' }}>
        <div className={className}>{node.val}</div>
        {(node.left || node.right) && (
          <div style={{ display: "flex", marginTop: "35px", position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-25px', left: '25%', right: '25%', height: '25px', borderTop: '2px solid rgba(255,255,255,0.15)', borderLeft: node.left ? '2px solid rgba(255,255,255,0.15)' : 'none', borderRight: node.right ? '2px solid rgba(255,255,255,0.15)' : 'none', zIndex: -1 }}></div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', gap: '20px' }}>
               <div style={{ display: 'flex', justifyContent: 'center' }}>{renderTree(node.left)}</div>
               <div style={{ display: 'flex', justifyContent: 'center' }}>{renderTree(node.right)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Breadth-First Search (BFS)</h3>
        <p>BFS explores the tree level-by-level. It uses a <strong>Queue (FIFO)</strong> to keep track of the next nodes to visit. It starts at the root, visits all immediate children, and then moves to the next level.</p>
      </div>

      <div className="controls">
        <button onClick={visualizeBFS} disabled={isRunning}>
          {isRunning ? "Traversing..." : "Start BFS"}
        </button>
        <button onClick={() => { setVisited([]); setActive(null); setActionLog(["Reset."]); }} disabled={isRunning}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="tree-container glass-panel" style={{ flex: 2, minHeight: '300px', display: 'flex', justifyContent: 'center', margin: 0, minWidth: '350px' }}>
          {renderTree(tree)}
        </div>
        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => <div key={i} className="step">{log}</div>)}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Click Start BFS.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`function bfs(root) {
  if (!root) return;
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}`}
        </pre>
      </div>
    </div>
  );
}
