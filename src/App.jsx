"use client";

import { useState, useEffect } from "react";
import BinarySearch from "@/components/algorithms/BinarySearch";
import TwoPointer from "@/components/algorithms/TwoPointer";
import DynamicProgramming from "@/components/algorithms/DynamicProgramming";
import BubbleSort from "@/components/algorithms/BubbleSort";
import MergeSort from "@/components/algorithms/MergeSort";
import QuickSort from "@/components/algorithms/QuickSort";
import BST from "@/components/algorithms/BST";
import DFS from "@/components/algorithms/DFS";
import BFS from "@/components/algorithms/BFS";
import LinkedList from "@/components/algorithms/LinkedList";
import Stack from "@/components/algorithms/Stack";
import Queue from "@/components/algorithms/Queue";
import Heap from "@/components/algorithms/Heap";
import HashTable from "@/components/algorithms/HashTable";
import Graph from "@/components/algorithms/Graph";
import Intro from "@/components/Intro";
import Login from "@/components/Login";
import CheatSheet from "@/components/CheatSheet";
import BackgroundGraphics from "@/components/BackgroundGraphics";
import "./visualizer.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [activeTab, setActiveTab] = useState("binary");
  const [theme, setTheme] = useState("light");
  const [speed, setSpeed] = useState(1);
  const [userHandle, setUserHandle] = useState("Guest");

  const getProfileStats = (handle) => {
    if (!handle) return { rank: '', rating: '', color: 'var(--text-primary)', isSpecial: false };
    if (handle.toLowerCase() === 'amartya110') {
      return { rank: 'Pupil', rating: '(1385)', color: '#34d399', isSpecial: true };
    }
    
    // For everyone else, just show the simple name
    return { rank: '', rating: '', color: 'var(--text-primary)', isSpecial: false };
  };

  const profileStats = getProfileStats(userHandle);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (currentPage === "intro") {
    return (
      <div className="container" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BackgroundGraphics theme={theme} />
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <Intro onStart={() => setCurrentPage("login")} />
      </div>
    );
  }

  if (currentPage === "login") {
    return (
      <div style={{ position: "relative" }}>
        <BackgroundGraphics theme={theme} />
        <button className="theme-toggle" onClick={toggleTheme} style={{ zIndex: 100 }}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <Login onLogin={(handle) => { setUserHandle(handle); setCurrentPage("visualizer"); }} onBack={() => setCurrentPage("intro")} />
      </div>
    );
  }

  return (
    <div className="container" style={{ position: "relative" }}>
      <BackgroundGraphics theme={theme} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <button className="back-button" onClick={() => setCurrentPage("intro")}>
          ← Back to Home
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="cp-user" style={{ background: 'var(--bg-glass)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-light)', display: 'flex', gap: '8px', fontSize: '14px' }}>
            {profileStats.isSpecial ? (
              <>
                <span style={{ color: profileStats.color, fontWeight: 'bold' }}>{profileStats.rank}</span>
                <span style={{ color: profileStats.color, fontWeight: 'bold' }}>{userHandle}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{profileStats.rating}</span>
              </>
            ) : (
              <span style={{ color: profileStats.color, fontWeight: 'bold' }}>{userHandle}</span>
            )}
          </div>
          <button className="theme-toggle" style={{ position: 'relative', top: 0, right: 0 }} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>

      <header className="header" style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>AlgoLens Visualizer</h1>
        <p>Minimal visualization of core algorithms</p>
      </header>

      <div className="tabs" style={{ flexWrap: "wrap" }}>
        <button
          className={`tab ${activeTab === "binary" ? "active" : ""}`}
          onClick={() => setActiveTab("binary")}
        >
          Binary Search
        </button>
        <button
          className={`tab ${activeTab === "twoptr" ? "active" : ""}`}
          onClick={() => setActiveTab("twoptr")}
        >
          Two Pointer
        </button>
        <button
          className={`tab ${activeTab === "dp" ? "active" : ""}`}
          onClick={() => setActiveTab("dp")}
        >
          DP
        </button>
        <button
          className={`tab ${activeTab === "bubble" ? "active" : ""}`}
          onClick={() => setActiveTab("bubble")}
        >
          Bubble Sort
        </button>
        <button
          className={`tab ${activeTab === "merge" ? "active" : ""}`}
          onClick={() => setActiveTab("merge")}
        >
          Merge Sort
        </button>
        <button
          className={`tab ${activeTab === "quick" ? "active" : ""}`}
          onClick={() => setActiveTab("quick")}
        >
          Quick Sort
        </button>
        <button
          className={`tab ${activeTab === "bst" ? "active" : ""}`}
          onClick={() => setActiveTab("bst")}
        >
          BST
        </button>
        <button
          className={`tab ${activeTab === "dfs" ? "active" : ""}`}
          onClick={() => setActiveTab("dfs")}
        >
          DFS
        </button>
        <button
          className={`tab ${activeTab === "bfs" ? "active" : ""}`}
          onClick={() => setActiveTab("bfs")}
        >
          BFS
        </button>
        <button
          className={`tab ${activeTab === "ll" ? "active" : ""}`}
          onClick={() => setActiveTab("ll")}
        >
          Linked List
        </button>
        <button
          className={`tab ${activeTab === "stack" ? "active" : ""}`}
          onClick={() => setActiveTab("stack")}
        >
          Stack
        </button>
        <button
          className={`tab ${activeTab === "queue" ? "active" : ""}`}
          onClick={() => setActiveTab("queue")}
        >
          Queue
        </button>
        <button
          className={`tab ${activeTab === "heap" ? "active" : ""}`}
          onClick={() => setActiveTab("heap")}
        >
          Heap
        </button>
        <button
          className={`tab ${activeTab === "hash" ? "active" : ""}`}
          onClick={() => setActiveTab("hash")}
        >
          Hash Table
        </button>
        <button
          className={`tab ${activeTab === "graph" ? "active" : ""}`}
          onClick={() => setActiveTab("graph")}
        >
          Graph
        </button>
        <button
          className={`tab ${activeTab === "cheatsheet" ? "active" : ""}`}
          onClick={() => setActiveTab("cheatsheet")}
          style={{ marginLeft: 'auto', background: activeTab === 'cheatsheet' ? 'var(--accent-primary)' : 'rgba(16, 185, 129, 0.1)', color: activeTab === 'cheatsheet' ? 'white' : 'var(--success)' }}
        >
          📚 Cheat Sheet
        </button>
      </div>

      <div className="speed-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', padding: '15px', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <span style={{ fontWeight: 600 }}>Execution Speed:</span>
        <input 
          type="range" 
          min="0.25" 
          max="3" 
          step="0.25" 
          value={speed} 
          onChange={(e) => setSpeed(parseFloat(e.target.value))} 
          style={{ flex: 1, maxWidth: '200px' }}
        />
        <span style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>{speed}x</span>
      </div>

      <div className="content">
        {activeTab === "binary" && <BinarySearch speed={speed} />}
        {activeTab === "twoptr" && <TwoPointer speed={speed} />}
        {activeTab === "dp" && <DynamicProgramming speed={speed} />}
        {activeTab === "bubble" && <BubbleSort speed={speed} />}
        {activeTab === "merge" && <MergeSort speed={speed} />}
        {activeTab === "quick" && <QuickSort speed={speed} />}
        {activeTab === "bst" && <BST speed={speed} />}
        {activeTab === "dfs" && <DFS speed={speed} />}
        {activeTab === "bfs" && <BFS speed={speed} />}
        {activeTab === "ll" && <LinkedList speed={speed} />}
        {activeTab === "stack" && <Stack speed={speed} />}
        {activeTab === "queue" && <Queue speed={speed} />}
        {activeTab === "heap" && <Heap speed={speed} />}
        {activeTab === "hash" && <HashTable speed={speed} />}
        {activeTab === "graph" && <Graph speed={speed} />}
        {activeTab === "cheatsheet" && <CheatSheet />}
      </div>
    </div>
  );
}
