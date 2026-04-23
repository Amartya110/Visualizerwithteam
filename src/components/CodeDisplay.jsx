import React, { useState } from 'react';

export default function CodeDisplay({ cpp, python, javascript }) {
  const [lang, setLang] = useState('cpp');

  const code = lang === 'cpp' ? cpp : lang === 'python' ? python : javascript;

  return (
    <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
      <div style={{ display: 'flex', background: '#1e1e1e', borderBottom: '1px solid #333' }}>
        <button 
          onClick={() => setLang('cpp')}
          style={{ 
            padding: '10px 20px', 
            background: lang === 'cpp' ? '#2d2d2d' : 'transparent', 
            color: lang === 'cpp' ? '#9cdcfe' : '#858585', 
            border: 'none', 
            cursor: 'pointer', 
            fontFamily: 'monospace',
            borderTop: lang === 'cpp' ? '2px solid #3b82f6' : '2px solid transparent'
          }}
        >
          C++
        </button>
        <button 
          onClick={() => setLang('python')}
          style={{ 
            padding: '10px 20px', 
            background: lang === 'python' ? '#2d2d2d' : 'transparent', 
            color: lang === 'python' ? '#4ade80' : '#858585', 
            border: 'none', 
            cursor: 'pointer', 
            fontFamily: 'monospace',
            borderTop: lang === 'python' ? '2px solid #10b981' : '2px solid transparent'
          }}
        >
          Python
        </button>
        <button 
          onClick={() => setLang('javascript')}
          style={{ 
            padding: '10px 20px', 
            background: lang === 'javascript' ? '#2d2d2d' : 'transparent', 
            color: lang === 'javascript' ? '#fcd34d' : '#858585', 
            border: 'none', 
            cursor: 'pointer', 
            fontFamily: 'monospace',
            borderTop: lang === 'javascript' ? '2px solid #f59e0b' : '2px solid transparent'
          }}
        >
          JavaScript
        </button>
      </div>
      <pre style={{ 
        background: '#1e1e1e', 
        padding: '20px', 
        overflowX: 'auto', 
        color: '#d4d4d4', 
        fontSize: '14px', 
        fontFamily: '"Consolas", "Monaco", monospace', 
        margin: 0,
        border: 'none'
      }}>
        {code}
      </pre>
    </div>
  );
}
