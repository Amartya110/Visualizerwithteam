"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function Stack({ speed = 1 }) {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg].slice(-5));
  };

  const push = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    setStack([...stack, val]);
    logAction(`Pushed ${val} onto the stack.`);
    setInputValue("");
  };

  const pop = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setStack(stack.slice(0, stack.length - 1));
    logAction(`Popped ${val} from the stack.`);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Stack (LIFO)</h3>
        <p>A <strong>Stack</strong> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle. Elements are added (pushed) and removed (popped) from the same end, called the "top". Think of it like a stack of plates.</p>
      </div>

      <div className="controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Value" 
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
        <button onClick={() => { setStack([]); setActionLog(["Stack reset."]); }}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '5px', minHeight: '250px', borderBottom: '4px solid var(--accent-primary)', borderLeft: '4px solid var(--border-light)', borderRight: '4px solid var(--border-light)', minWidth: '200px' }}>
          {stack.map((item, idx) => (
            <div key={idx} className="cell" style={{ width: '140px', height: '45px', background: idx === stack.length - 1 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)', position: 'relative', border: idx === stack.length - 1 ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)' }}>
              {item}
              {idx === stack.length - 1 && <span style={{ position: 'absolute', right: '-60px', fontSize: '12px', color: '#818cf8', fontWeight: 'bold' }}>← Top</span>}
            </div>
          ))}
          {stack.length === 0 && <div style={{ margin: 'auto', color: 'var(--text-secondary)' }}>Empty Stack</div>}
        </div>

        <div className="steps" style={{ flex: 1, minWidth: '200px', height: 'fit-content' }}>
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
          cpp={`class Stack {
    vector<int> items;
public:
    void push(int element) {
        items.push_back(element);
    }
    
    void pop() {
        if (!isEmpty()) {
            items.pop_back();
        }
    }
    
    int peek() {
        return items.back();
    }
    
    bool isEmpty() {
        return items.empty();
    }
};`}
          python={`class Stack:
    def __init__(self):
        self.items = []
        
    def push(self, element):
        self.items.append(element)
        
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
            
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
            
    def is_empty(self):
        return len(self.items) == 0`}
          javascript={`class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
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
