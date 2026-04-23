import React, { useState } from 'react';
import '../visualizer.css';

export default function Login({ onLogin, onBack }) {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handle || !password) return;
    
    setIsLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      setIsLoading(false);
      onLogin(handle); // transition to visualizer
    }, 1500);
  };

  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div className="glass-panel" style={{ maxWidth: '400px', width: '100%', padding: '40px', position: 'relative' }}>
        <button 
          onClick={onBack} 
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px' }}
        >
          ← Back
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
          <div className="cp-logo" style={{ fontSize: '28px', marginBottom: '10px', color: 'var(--accent-primary)', fontWeight: 'bold', fontFamily: 'monospace' }}>AlgoLens</div>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Authenticate to access the visualizer.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 'bold' }}>Codeforces Handle</label>
            <input 
              type="text" 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g., amartya110"
              style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', fontFamily: 'monospace' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', fontFamily: 'monospace' }}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="cp-submit-btn"
            style={{ 
              marginTop: '10px', 
              width: '100%',
              padding: '14px', 
              display: 'flex',
              justifyContent: 'center',
              background: isLoading ? 'var(--border-light)' : 'var(--success)', 
              color: 'white', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
