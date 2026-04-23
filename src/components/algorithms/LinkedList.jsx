"use client";
import { useState } from "react";

export default function LinkedList() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg].slice(-5));
  };

  const append = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    setList([...list, val]);
    logAction(`Appended ${val} to the end of the list.`);
    setInputValue("");
  };

  const pop = () => {
    if (list.length === 0) return;
    const val = list[list.length - 1];
    setList(list.slice(0, list.length - 1));
    logAction(`Popped ${val} from the end of the list.`);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Linked List</h3>
        <p>A <strong>Singly Linked List</strong> is a linear data structure where each element (node) contains a value and a reference (pointer) to the next node. Operations like insertion and deletion can be very fast if the node reference is known, but accessing an element by index requires O(N) time.</p>
      </div>

      <div className="controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Value" 
        />
        <button onClick={append}>Append</button>
        <button onClick={pop}>Pop</button>
        <button onClick={() => { setList([]); setActionLog(["List reset."]); }}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="array-container glass-panel" style={{ flex: 2, alignItems: 'center', gap: '5px', overflowX: 'auto', minHeight: '100px', margin: 0, minWidth: '300px' }}>
          {list.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div className="cell" style={{ flexDirection: 'column', height: '60px', minWidth: '60px', background: 'rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Node {idx}</span>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item}</span>
              </div>
              <div style={{ fontSize: '24px', color: 'var(--text-secondary)', margin: '0 5px' }}>→</div>
            </div>
          ))}
          {list.length > 0 && <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 'bold', padding: '10px' }}>null</div>}
          {list.length === 0 && <div style={{ color: 'var(--text-secondary)', margin: 'auto' }}>Empty Linked List</div>}
        </div>
        
        <div className="steps" style={{ flex: 1, minWidth: '200px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => (
            <div key={i} className="step">{log}</div>
          ))}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No actions yet.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--accent-primary)', fontSize: '18px' }}>JavaScript Implementation Example</h4>
        <pre style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: '#e2e8f0', fontSize: '14px', fontFamily: 'monospace', margin: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
{`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(val) {
    if (!this.head) {
      this.head = new Node(val);
      return;
    }
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = new Node(val);
  }
  
  pop() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null; 
      return;
    }
    let curr = this.head;
    while (curr.next.next) {
      curr = curr.next;
    }
    curr.next = null;
  }
}`}
        </pre>
      </div>
    </div>
  );
}
