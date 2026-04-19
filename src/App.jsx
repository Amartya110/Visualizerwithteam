"use client";

import { useState } from "react";
import BinarySearch from "@/components/algorithms/BinarySearch";
import TwoPointer from "@/components/algorithms/TwoPointer";
import DynamicProgramming from "@/components/algorithms/DynamicProgramming";
import BubbleSort from "@/components/algorithms/BubbleSort";
import MergeSort from "@/components/algorithms/MergeSort";
import QuickSort from "@/components/algorithms/QuickSort";
import BST from "@/components/algorithms/BST";
import DFS from "@/components/algorithms/DFS";
import BFS from "@/components/algorithms/BFS";
import "./visualizer.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("binary");

  return (
    <div className="container">
      <header className="header">
        <h1>Algorithm Visualizer</h1>
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
      </div>

      <div className="content">
        {activeTab === "binary" && <BinarySearch />}
        {activeTab === "twoptr" && <TwoPointer />}
        {activeTab === "dp" && <DynamicProgramming />}
        {activeTab === "bubble" && <BubbleSort />}
        {activeTab === "merge" && <MergeSort />}
        {activeTab === "quick" && <QuickSort />}
        {activeTab === "bst" && <BST />}
        {activeTab === "dfs" && <DFS />}
        {activeTab === "bfs" && <BFS />}
      </div>
    </div>
  );
}
