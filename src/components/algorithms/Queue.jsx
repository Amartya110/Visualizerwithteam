"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function Queue({ speed = 1 }) {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg].slice(-5));
  };

  const enqueue = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    setQueue([...queue, val]);
    logAction(`Enqueued ${val} to the back of the queue.`);
    setInputValue("");
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setQueue(queue.slice(1));
    logAction(`Dequeued ${val} from the front of the queue.`);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Queue (FIFO)</h3>
        <p>A <strong>Queue</strong> is a linear data structure that follows the <strong>FIFO (First In, First Out)</strong> principle. Elements are added (enqueued) at the "back" and removed (dequeued) from the "front". Think of it like a line of people waiting.</p>
      </div>

      <div className="controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Value" 
        />
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
        <button onClick={() => { setQueue([]); setActionLog(["Queue reset."]); }}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, position: 'relative', borderTop: '4px solid var(--border-light)', borderBottom: '4px solid var(--border-light)', display: 'flex', gap: '10px', overflowX: 'auto', minHeight: '160px', alignItems: 'center', minWidth: '300px' }}>
          
          <div style={{ position: 'absolute', top: '15px', left: '20px', color: '#818cf8', fontWeight: 'bold', fontSize: '14px' }}>← Front (Dequeue)</div>
          <div style={{ position: 'absolute', bottom: '15px', right: '20px', color: '#818cf8', fontWeight: 'bold', fontSize: '14px' }}>Back (Enqueue) ←</div>

          {queue.map((item, idx) => (
            <div key={idx} className="cell" style={{ minWidth: '60px', height: '60px', background: idx === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)', border: idx === 0 ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)' }}>
              {item}
            </div>
          ))}
          {queue.length === 0 && <div style={{ margin: 'auto', color: 'var(--text-secondary)' }}>Empty Queue</div>}
        </div>

        <div className="steps" style={{ flex: 1, minWidth: '200px' }}>
          <h4>Action Log</h4>
          {actionLog.map((log, i) => (
            <div key={i} className="step">{log}</div>
          ))}
          {actionLog.length === 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No actions yet.</div>}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`class Queue {
    queue<int> items;
public:
    void enqueue(int element) {
        items.push(element);
    }
    
    void dequeue() {
        if (!isEmpty()) {
            items.pop();
        }
    }
    
    int front() {
        return items.front();
    }
    
    bool isEmpty() {
        return items.empty();
    }
};`}
          python={`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
        
    def enqueue(self, element):
        self.items.append(element)
        
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
            
    def front(self):
        if not self.is_empty():
            return self.items[0]
            
    def is_empty(self):
        return len(self.items) == 0`}
          javascript={`class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`}
        />
      </div>
    </div>
  );
}
