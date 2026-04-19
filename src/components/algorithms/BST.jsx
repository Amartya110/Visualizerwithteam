"use client";

import { useState } from "react";

class TreeNode {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

export default function BST() {
  const [root, setRoot] = useState(() => {
    let r = new TreeNode(50);
    r.left = new TreeNode(30);
    r.right = new TreeNode(70);
    r.left.left = new TreeNode(20);
    r.left.right = new TreeNode(40);
    r.right.left = new TreeNode(60);
    r.right.right = new TreeNode(80);
    return r;
  });
  const [insertVal, setInsertVal] = useState("");
  const insertNode = (val) => {
    if (!root) {
      setRoot(new TreeNode(val));
      return;
    }
    const newRoot = cloneTree(root);
    let curr = newRoot;
    while (curr) {
      if (val < curr.value) {
        if (!curr.left) {
          curr.left = new TreeNode(val);
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = new TreeNode(val);
          break;
        }
        curr = curr.right;
      }
    }
    setRoot(newRoot);
    setInsertVal("");
  };
  const cloneTree = (node) => {
    if (!node) return null;
    let newNode = new TreeNode(node.value);
    newNode.left = cloneTree(node.left);
    newNode.right = cloneTree(node.right);
    return newNode;
  };
  const renderTree = (node) => {
    if (!node)
      return <div className="node" style={{ visibility: "hidden" }}></div>;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 10px",
        }}
      >
        <div className="node">{node.value}</div>
        {(node.left || node.right) && (
          <div
            style={{ display: "flex", marginTop: "20px", position: "relative" }}
          >
            <div style={{ marginRight: "10px" }}>{renderTree(node.left)}</div>
            <div style={{ marginLeft: "10px" }}>{renderTree(node.right)}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algo-container">
      <div className="controls">
        <div>
          <label>Add Node:</label>
          <input
            type="number"
            value={insertVal}
            onChange={(e) => setInsertVal(e.target.value)}
            placeholder="Num"
            style={{ width: "80px" }}
          />
        </div>
        <button
          onClick={() => {
            if (insertVal) insertNode(parseInt(insertVal));
          }}
        >
          Insert
        </button>
        <button onClick={() => setRoot(null)}>Clear</button>
      </div>

      <div className="tree-container">{renderTree(root)}</div>
    </div>
  );
}
