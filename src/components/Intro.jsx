"use client";
import React, { useState, useEffect } from "react";

export default function Intro({ onStart }) {
  const [codeText, setCodeText] = useState("");
  const fullCode = `#include <bits/stdc++.h>
using namespace std;

void solve() {
    // Initialize the visualizer
    AlgorithmVisualizer viz;
    
    // Load Core Modules
    viz.load(Graph | Tree | DP | Sorting);
    
    // Gain intuition
    while(knowledge < MAX_INT) {
        viz.simulate_next_step();
        knowledge++;
    }
    
    cout << "Verdict: Accepted (15ms, 0KB)" << endl;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    solve();
    
    return 0;
}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(fullCode.substring(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cp-intro-container">
      <div className="cp-nav">
        <div className="cp-logo">{"AlgoLens"}</div>
        <div className="cp-user">
          <span style={{ color: '#9ca3af', fontWeight: 'bold', marginRight: '5px' }}>Unrated</span>
          <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>Guest</span>
        </div>
      </div>

      <div className="cp-content">
        <div className="cp-problem-section">
          <div className="cp-problem-header">
            <h1 className="cp-title">A. Master of Algorithms</h1>
            <div className="cp-limits">
              <div>time limit per test: 1.0 seconds</div>
              <div>memory limit per test: 256 megabytes</div>
              <div>input: standard input</div>
              <div>output: standard output</div>
            </div>
          </div>

          <div className="cp-statement">
            <p>
              You are a computer science student facing a difficult exam. You are given <strong>15+ complex algorithms and data structures</strong>.
            </p>
            <p>
              Your task is to understand them completely. To achieve this, you are provided with an interactive visualizer that shows real-time node traversals, array mutations, and execution logs.
            </p>
            
            <div className="cp-io-header">Input</div>
            <p>The only input is clicking the "Compile & Run" button below.</p>

            <div className="cp-io-header">Output</div>
            <p>Print "Accepted" if you successfully master Binary Search, DP, Graphs, Trees, Heaps, and Sorting algorithms.</p>
          </div>

          <button className="cp-submit-btn" onClick={onStart}>
            ▶ Compile & Login
          </button>
        </div>

        <div className="cp-editor-section glass-panel">
          <div className="editor-tab">
            <span className="file-name">solution.cpp</span>
            <span className="status">Running...</span>
          </div>
          <div className="editor-body">
            <div className="line-numbers">
              {Array.from({ length: 23 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="typing-code">
              {codeText}
              <span className="cursor">|</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
