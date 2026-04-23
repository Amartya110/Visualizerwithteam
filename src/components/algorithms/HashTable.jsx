"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function HashTable({ speed = 1 }) {
  const [table, setTable] = useState(Array(5).fill([]));
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [actionLog, setActionLog] = useState([]);

  const logAction = (msg) => {
    setActionLog(prev => [...prev, msg].slice(-5));
  };

  const hash = (k) => {
    let sum = 0;
    for (let i = 0; i < k.length; i++) sum += k.charCodeAt(i);
    return sum % table.length;
  };

  const insert = () => {
    if (!key || !value) return;
    const index = hash(key);
    const newTable = [...table];
    const bucket = [...newTable[index]];
    const existingIdx = bucket.findIndex(item => item.key === key);
    if (existingIdx !== -1) {
      bucket[existingIdx].value = value;
      logAction(`Updated key "${key}" at bucket [${index}].`);
    } else {
      bucket.push({ key, value });
      logAction(`Inserted key "${key}" into bucket [${index}].`);
    }
    newTable[index] = bucket;
    setTable(newTable);
    setKey("");
    setValue("");
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Hash Table (Chaining)</h3>
        <p>A <strong>Hash Table</strong> maps keys to values for highly efficient lookup. It uses a <strong>hash function</strong> to compute an index into an array of buckets. If multiple keys hash to the same bucket (a collision), this implementation handles it via <strong>chaining</strong> (storing multiple items in a list within the bucket).</p>
      </div>

      <div className="controls">
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key (e.g. name)" style={{ width: '140px' }} />
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value (e.g. age)" style={{ width: '140px' }} />
        <button onClick={insert}>Put</button>
        <button onClick={() => { setTable(Array(5).fill([])); setActionLog(["Hash table reset."]); }}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '300px' }}>
          {table.map((bucket, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '65px', fontWeight: 'bold', color: 'var(--text-primary)', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '8px' }}>Idx {idx}</div>
              <div style={{ display: 'flex', gap: '8px', minHeight: '60px', padding: '10px', border: '2px dashed var(--border-light)', borderRadius: '10px', flex: 1, background: 'rgba(0,0,0,0.2)', overflowX: 'auto', alignItems: 'center' }}>
                {bucket.map((item, i) => (
                  <div key={i} style={{ padding: '8px 14px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)', fontSize: '14px', color: '#e0e7ff', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>{item.key}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>→</span>
                    <span>{item.value}</span>
                  </div>
                ))}
                {bucket.length === 0 && <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', display: 'flex', alignItems: 'center', fontSize: '13px' }}>Empty Bucket</div>}
              </div>
            </div>
          ))}
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
          cpp={`class HashTable {
    vector<list<pair<string, string>>> table;
    
    int hash(string key) {
        int sum = 0;
        for (char c : key) sum += c;
        return sum % table.size();
    }
public:
    HashTable(int size = 5) {
        table.resize(size);
    }
    
    void put(string key, string value) {
        int index = hash(key);
        for (auto& item : table[index]) {
            if (item.first == key) {
                item.second = value;
                return;
            }
        }
        table[index].push_back({key, value});
    }
};`}
          python={`class HashTable:
    def __init__(self, size=5):
        self.table = [[] for _ in range(size)]
        
    def _hash(self, key):
        return sum(ord(c) for c in key) % len(self.table)
        
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.table[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
                
        bucket.append((key, value))`}
          javascript={`class HashTable {
  constructor(size = 5) {
    this.table = new Array(size).fill(null).map(() => []);
  }
  
  hash(key) {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % this.table.length;
  }
  
  put(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists, update it
    const existingNode = bucket.find(item => item.key === key);
    if (existingNode) {
      existingNode.value = value;
    } else {
      // Handle collision by chaining (pushing to bucket)
      bucket.push({ key, value });
    }
  }
}`}
        />
      </div>
    </div>
  );
}
