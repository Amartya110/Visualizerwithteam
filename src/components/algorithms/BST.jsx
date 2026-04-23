"use client";
import { useState, useCallback } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function BST({ speed = 1 }) {
  const [visited, setVisited] = useState([]);
  const [active, setActive] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [target, setTarget] = useState(6);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => setActionLog(prev => [...prev, msg]);

  const tree = {
    val: 8,
    left: { val: 3, left: { val: 1, left: null, right: null }, right: { val: 6, left: { val: 4, left: null, right: null }, right: { val: 7, left: null, right: null } } },
    right: { val: 10, left: null, right: { val: 14, left: { val: 13, left: null, right: null }, right: null } },
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms / speed));

  const visualizeSearch = useCallback(async () => {
    setIsRunning(true);
    setVisited([]);
    setActive(null);
    setActionLog([]);
    let visitedNodes = [];
    let current = tree;

    logAction(`Starting BST Search for target: ${target}`);

    while (current) {
      setActive(current.val);
      logAction(`Comparing target (${target}) with current node (${current.val})`);
      await delay(800);
      
      visitedNodes.push(current.val);
      setVisited([...visitedNodes]);

      if (current.val === target) {
        logAction(`Target ${target} found!`);
        break;
      } else if (target < current.val) {
        logAction(`${target} < ${current.val}. Moving left.`);
        current = current.left;
      } else {
        logAction(`${target} > ${current.val}. Moving right.`);
        current = current.right;
      }
    }
    
    if (!current) logAction(`Target ${target} not found in the tree.`);

    setActive(null);
    setIsRunning(false);
  }, [tree, target]);

  const renderTree = (node) => {
    if (!node) return <div className="node" style={{ visibility: "hidden" }}></div>;
    let className = "node";
    if (active === node.val) className += " active";
    else if (visited.includes(node.val)) className += " visited";

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 10px", position: 'relative' }}>
        <div className={className}>{node.val}</div>
        {(node.left || node.right) && (
          <div style={{ display: "flex", marginTop: "35px", position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-25px', left: '25%', right: '25%', height: '25px', borderTop: '2px solid rgba(255,255,255,0.15)', borderLeft: node.left ? '2px solid rgba(255,255,255,0.15)' : 'none', borderRight: node.right ? '2px solid rgba(255,255,255,0.15)' : 'none', zIndex: -1 }}></div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', gap: '15px' }}>
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
        <h3 style={{ marginTop: 0 }}>Binary Search Tree (BST)</h3>
        <p>A <strong>BST</strong> is a node-based binary tree data structure where each node has at most two child nodes. For every node, its left subtree contains only values smaller than it, and its right subtree contains only values larger. This property allows for very fast search operations, similar to Binary Search on arrays.</p>
      </div>

      <div className="controls">
        <label>Target:</label>
        <input 
          type="number" 
          value={target} 
          onChange={(e) => setTarget(parseInt(e.target.value))} 
          disabled={isRunning}
        />
        <button onClick={visualizeSearch} disabled={isRunning}>
          {isRunning ? "Searching..." : "Search"}
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
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Enter a number and click Search.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`bool searchBST(TreeNode* root, int target) {
    TreeNode* current = root;
    
    while (current != nullptr) {
        if (current->val == target) return true;
        
        if (target < current->val)
            current = current->left;
        else
            current = current->right;
    }
    
    return false;
}`}
          python={`def search_bst(root, target):
    current = root
    
    while current is not None:
        if current.val == target:
            return True
            
        if target < current.val:
            current = current.left
        else:
            current = current.right
            
    return False`}
          javascript={`function searchBST(root, target) {
  let current = root;
  
  while (current !== null) {
    if (current.val === target) {
      return true; // Found target
    }
    
    if (target < current.val) {
      current = current.left; // Search left subtree
    } else {
      current = current.right; // Search right subtree
    }
  }
  
  return false; // Target not found
}`}
        />
      </div>
    </div>
  );
}
