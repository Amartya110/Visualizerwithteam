"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function Heap({ speed = 1 }) {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(null);
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg].slice(-5));
  };

  const insert = async () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    let newHeap = [...heap, val];
    setHeap([...newHeap]);
    setInputValue("");
    logAction(`Inserted ${val}. Starting bubble-up...`);
    
    let curr = newHeap.length - 1;
    while (curr > 0) {
      setActive(curr);
      await new Promise(r => setTimeout(r, 600 / speed));
      let parent = Math.floor((curr - 1) / 2);
      if (newHeap[curr] > newHeap[parent]) {
        logAction(`Swapping ${newHeap[curr]} with parent ${newHeap[parent]}`);
        let temp = newHeap[curr];
        newHeap[curr] = newHeap[parent];
        newHeap[parent] = temp;
        setHeap([...newHeap]);
        curr = parent;
      } else {
        logAction(`${newHeap[curr]} is <= parent ${newHeap[parent]}. Bubble-up complete.`);
        break;
      }
    }
    if (curr === 0) logAction(`Element reached the root.`);
    setActive(null);
  };

  const renderTree = (index) => {
    if (index >= heap.length) return null;
    let className = "node";
    if (active === index) className += " active";
    
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const hasChildren = leftIndex < heap.length || rightIndex < heap.length;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 10px" }}>
        <div className={className} style={{ position: 'relative' }}>
          {heap[index]}
          <div style={{ position: 'absolute', top: '-22px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>[{index}]</div>
        </div>
        {hasChildren && (
          <div style={{ display: "flex", marginTop: "35px", position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-25px', left: '25%', right: '25%', height: '25px', borderTop: '2px solid rgba(255,255,255,0.15)', borderLeft: leftIndex < heap.length ? '2px solid rgba(255,255,255,0.15)' : 'none', borderRight: rightIndex < heap.length ? '2px solid rgba(255,255,255,0.15)' : 'none', zIndex: -1 }}></div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', gap: '20px' }}>
               <div style={{ display: 'flex', justifyContent: 'center' }}>{renderTree(leftIndex)}</div>
               <div style={{ display: 'flex', justifyContent: 'center' }}>{renderTree(rightIndex)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Max Heap</h3>
        <p>A <strong>Max Heap</strong> is a complete binary tree where the value of each node is greater than or equal to the values of its children. It is often implemented using an array, where the left child of index <code>i</code> is at <code>2i+1</code> and the right child is at <code>2i+2</code>.</p>
      </div>

      <div className="controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Value" 
        />
        <button onClick={insert} disabled={active !== null}>Insert</button>
        <button onClick={() => { setHeap([]); setActionLog(["Heap reset."]); }} disabled={active !== null}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div className="tree-container glass-panel" style={{ flex: 2, minHeight: '250px', padding: '50px 20px', margin: 0 }}>
            {heap.length > 0 ? renderTree(0) : <div style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'auto' }}>Empty Heap</div>}
          </div>

          <div className="steps" style={{ flex: 1, minWidth: '200px' }}>
            <h4>Action Log</h4>
            {actionLog.map((log, i) => (
              <div key={i} className="step">{log}</div>
            ))}
            {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No actions yet.</div>}
          </div>
        </div>

        <div className="array-container glass-panel" style={{ margin: '0', padding: '20px' }}>
          <div className="array" style={{ width: '100%', justifyContent: 'flex-start', overflowX: 'auto', paddingBottom: '10px' }}>
            <span style={{ marginRight: '10px', color: 'var(--text-secondary)', fontWeight: 'bold', alignSelf: 'center', whiteSpace: 'nowrap' }}>Array Representation:</span>
            {heap.map((item, idx) => (
              <div key={idx} className={`cell ${active === idx ? 'current' : ''}`} style={{ minWidth: '50px', height: '50px', position: 'relative' }}>
                <div style={{ fontSize: '11px', position: 'absolute', top: '4px', left: '6px', color: active === idx ? 'white' : 'var(--text-secondary)' }}>{idx}</div>
                {item}
              </div>
            ))}
            {heap.length === 0 && <span style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>None</span>}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`class MaxHeap {
    vector<int> heap;
    
    void bubbleUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap[parent] >= heap[index]) break;
            
            swap(heap[parent], heap[index]);
            index = parent;
        }
    }
public:
    void insert(int val) {
        heap.push_back(val);
        bubbleUp(heap.size() - 1);
    }
};`}
          python={`class MaxHeap:
    def __init__(self):
        self.heap = []
        
    def insert(self, val):
        self.heap.append(val)
        self.bubble_up(len(self.heap) - 1)
        
    def bubble_up(self, index):
        while index > 0:
            parent = (index - 1) // 2
            if self.heap[parent] >= self.heap[index]:
                break
                
            self.heap[parent], self.heap[index] = self.heap[index], self.heap[parent]
            index = parent`}
          javascript={`class MaxHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  
  bubbleUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      
      // If parent is greater or equal, heap property is satisfied
      if (this.heap[parent] >= this.heap[index]) break;
      
      // Otherwise, swap
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }
}`}
        />
      </div>
    </div>
  );
}
