import React from 'react';

export default function CheatSheet() {
  const algorithms = [
    { name: "Binary Search", best: "O(1)", avg: "O(log N)", worst: "O(log N)", space: "O(1)" },
    { name: "Two Pointer (Target Sum)", best: "O(N)", avg: "O(N)", worst: "O(N)", space: "O(1)" },
    { name: "Bubble Sort", best: "O(N)", avg: "O(N²)", worst: "O(N²)", space: "O(1)" },
    { name: "Merge Sort", best: "O(N log N)", avg: "O(N log N)", worst: "O(N log N)", space: "O(N)" },
    { name: "Quick Sort", best: "O(N log N)", avg: "O(N log N)", worst: "O(N²)", space: "O(log N)" },
    { name: "Breadth-First Search (BFS)", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
    { name: "Depth-First Search (DFS)", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
    { name: "Binary Search Tree (Search)", best: "O(log N)", avg: "O(log N)", worst: "O(N)", space: "O(1)" },
    { name: "Dynamic Programming (Fibonacci)", best: "O(N)", avg: "O(N)", worst: "O(N)", space: "O(N)" },
  ];

  const dataStructures = [
    { name: "Linked List (Access/Search)", best: "O(1)", avg: "O(N)", worst: "O(N)", space: "O(N)" },
    { name: "Linked List (Insert/Delete)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(N)" },
    { name: "Stack (Push/Pop)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(N)" },
    { name: "Queue (Enqueue/Dequeue)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(N)" },
    { name: "Max Heap (Insert/Delete)", best: "O(1)", avg: "O(log N)", worst: "O(log N)", space: "O(N)" },
    { name: "Max Heap (Get Max)", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(N)" },
    { name: "Hash Table (Insert/Search)", best: "O(1)", avg: "O(1)", worst: "O(N)", space: "O(N)" },
  ];

  const renderTable = (data, title) => (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ color: 'var(--accent-primary)', marginBottom: '15px' }}>{title}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="complexity-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time (Best)</th>
              <th>Time (Average)</th>
              <th>Time (Worst)</th>
              <th>Space (Worst)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.name}</td>
                <td className={row.best.includes('1') || row.best.includes('log') ? 'good' : row.best.includes('N²') ? 'bad' : 'fair'}>{row.best}</td>
                <td className={row.avg.includes('1') || row.avg.includes('log') ? 'good' : row.avg.includes('N²') ? 'bad' : 'fair'}>{row.avg}</td>
                <td className={row.worst.includes('1') || row.worst.includes('log') ? 'good' : row.worst.includes('N²') ? 'bad' : 'fair'}>{row.worst}</td>
                <td>{row.space}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="glass-panel" style={{ padding: '30px' }}>
      <h2 style={{ marginTop: 0, borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
        Complexity Matrix
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        A quick reference guide for Big-O time and space complexities. Colors indicate performance: Green is excellent O(1) or O(log N), Yellow is fair O(N), and Red is poor O(N²).
      </p>
      
      {renderTable(algorithms, "Algorithms")}
      {renderTable(dataStructures, "Data Structures")}
    </div>
  );
}
