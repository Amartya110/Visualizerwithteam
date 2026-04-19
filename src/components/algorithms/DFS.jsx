"use client";

import { useState, useCallback } from "react";

export default function DFS() {
  const [visited, setVisited] = useState([]);
  const [active, setActive] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const tree = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };

  const visualizeDFS = useCallback(async () => {
    setIsRunning(true);
    setVisited([]);
    setActive(null);
    let visitedNodes = [];

    async function dfs(node) {
      if (!node) return;
      setActive(node.val);
      await new Promise((res) => setTimeout(res, 500));
      visitedNodes.push(node.val);
      setVisited([...visitedNodes]);
      if (node.left) await dfs(node.left);
      if (node.right) await dfs(node.right);
    }

    await dfs(tree);
    setActive(null);
    setIsRunning(false);
  }, []);

  const renderTree = (node) => {
    if (!node)
      return <div className="node" style={{ visibility: "hidden" }}></div>;
    let className = "node";
    if (active === node.val) className += " active";
    else if (visited.includes(node.val)) className += " visited";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 15px",
        }}
      >
        <div className={className}>{node.val}</div>
        {(node.left || node.right) && (
          <div style={{ display: "flex", marginTop: "30px" }}>
            <div>{renderTree(node.left)}</div>
            <div>{renderTree(node.right)}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algo-container">
      <div className="controls">
        <button onClick={visualizeDFS} disabled={isRunning}>
          {isRunning ? "Traversing..." : "Start DFS"}
        </button>
        <button
          onClick={() => {
            setVisited([]);
            setActive(null);
          }}
          disabled={isRunning}
        >
          Reset
        </button>
      </div>

      <div className="tree-container">{renderTree(tree)}</div>
    </div>
  );
}
