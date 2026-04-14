'use client'

import { useState } from 'react'
import BinarySearch from '@/components/algorithms/BinarySearch'
import TwoPointer from '@/components/algorithms/TwoPointer'
import DynamicProgramming from '@/components/algorithms/DynamicProgramming'
import './visualizer.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'binary' | 'twoptr' | 'dp'>('binary')

  return (
    <div className="container">
      <header className="header">
        <h1>Algorithm Visualizer</h1>
        <p>Minimal visualization of core algorithms</p>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'binary' ? 'active' : ''}`}
          onClick={() => setActiveTab('binary')}
        >
          Binary Search
        </button>
        <button
          className={`tab ${activeTab === 'twoptr' ? 'active' : ''}`}
          onClick={() => setActiveTab('twoptr')}
        >
          Two Pointer
        </button>
        <button
          className={`tab ${activeTab === 'dp' ? 'active' : ''}`}
          onClick={() => setActiveTab('dp')}
        >
          Dynamic Programming
        </button>
      </div>

      <div className="content">
        {activeTab === 'binary' && <BinarySearch />}
        {activeTab === 'twoptr' && <TwoPointer />}
        {activeTab === 'dp' && <DynamicProgramming />}
      </div>
    </div>
  )
}
