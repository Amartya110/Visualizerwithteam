"use client";
import { useState } from "react";
import CodeDisplay from "@/components/CodeDisplay";

export default function Graph({ speed = 1 }) {
  const [nodes, setNodes] = useState([
    { id: 1, x: 120, y: 60 },
    { id: 2, x: 280, y: 60 },
    { id: 3, x: 200, y: 160 },
    { id: 4, x: 120, y: 260 },
    { id: 5, x: 280, y: 260 }
  ]);
  const [edges, setEdges] = useState([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 }
  ]);
  const [activeNode, setActiveNode] = useState(null);

  const getNeighbors = (id) => {
    return edges
      .filter(e => e.from === id || e.to === id)
      .map(e => (e.from === id ? e.to : e.from))
      .sort((a,b) => a-b);
  };

  return (
    <div className="algo-container">
      <div className="explanation" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Undirected Graph</h3>
        <p>A <strong>Graph</strong> is a non-linear data structure consisting of <strong>vertices (nodes)</strong> and <strong>edges</strong>. It is used to represent networks, such as social connections, roads, or internet routing. This is an <em>undirected graph</em>, meaning the edges go both ways.</p>
        <p style={{ marginTop: '5px', fontSize: '14px', color: '#34d399', fontWeight: 'bold' }}>Click on any node below to interact with the graph and highlight its neighbors!</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: 2, position: 'relative', width: '100%', minHeight: '350px', overflow: 'hidden', minWidth: '350px' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {edges.map((edge, i) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              const isActive = activeNode === edge.from || activeNode === edge.to;
              return (
                <line 
                  key={i} 
                  x1={fromNode.x} y1={fromNode.y} 
                  x2={toNode.x} y2={toNode.y} 
                  stroke={isActive ? "#6366f1" : "rgba(255,255,255,0.15)"} 
                  strokeWidth={isActive ? "4" : "2"} 
                  strokeDasharray={isActive ? "none" : "5,5"}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}
          </svg>
          {nodes.map((node) => {
            const isNeighbor = activeNode && getNeighbors(activeNode).includes(node.id);
            const isActive = activeNode === node.id;
            let bg = 'var(--bg-secondary)';
            let border = 'var(--accent-primary)';
            let color = 'var(--text-primary)';
            let transform = 'scale(1)';

            if (isActive) {
              bg = 'var(--accent-primary)'; color = 'white'; transform = 'scale(1.15)'; border = 'white';
            } else if (isNeighbor) {
              bg = 'rgba(99, 102, 241, 0.3)'; border = '#818cf8'; transform = 'scale(1.05)';
            }

            return (
              <div 
                key={node.id} 
                className="node" 
                onClick={() => setActiveNode(isActive ? null : node.id)}
                style={{ 
                  position: 'absolute', left: node.x - 25, top: node.y - 25, zIndex: 10, cursor: 'pointer',
                  width: '50px', height: '50px',
                  background: bg, borderColor: border, color: color,
                  transform: transform,
                  boxShadow: isActive ? '0 0 20px var(--accent-glow)' : (isNeighbor ? '0 0 10px rgba(99,102,241,0.3)' : '0 4px 6px rgba(0,0,0,0.5)'),
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {node.id}
              </div>
            );
          })}
        </div>

        <div className="steps" style={{ flex: 1, minWidth: '250px' }}>
          <h4>Graph Properties</h4>
          <div className="step"><strong>Total Nodes (V):</strong> {nodes.length}</div>
          <div className="step"><strong>Total Edges (E):</strong> {edges.length}</div>
          
          <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--text-secondary)', borderBottom: 'none' }}>Interaction Info</h4>
            {activeNode ? (
               <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                 <div style={{ marginBottom: '8px' }}><span style={{ color: '#818cf8', fontWeight: 'bold' }}>Selected Node:</span> {activeNode}</div>
                 <div><span style={{ color: '#34d399', fontWeight: 'bold' }}>Neighbors:</span> {getNeighbors(activeNode).length > 0 ? getNeighbors(activeNode).join(', ') : 'None'}</div>
                 <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>Degree (Number of neighbors): {getNeighbors(activeNode).length}</div>
               </div>
            ) : (
               <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                 Click any node in the graph to see its details and highlight connected edges.
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: 0, overflow: 'hidden' }}>
        <h4 style={{ margin: '20px 0 15px 20px', color: 'var(--accent-primary)', fontSize: '18px' }}>Implementation Example</h4>
        <CodeDisplay 
          cpp={`class Graph {
    unordered_map<int, vector<int>> adjList;
public:
    void addVertex(int vertex) {
        if (adjList.find(vertex) == adjList.end()) {
            adjList[vertex] = vector<int>();
        }
    }
    
    void addEdge(int v1, int v2) {
        adjList[v1].push_back(v2);
        adjList[v2].push_back(v1); // Undirected
    }
    
    vector<int> getNeighbors(int vertex) {
        return adjList[vertex];
    }
};`}
          python={`class Graph:
    def __init__(self):
        self.adj_list = {}
        
    def add_vertex(self, vertex):
        if vertex not in self.adj_list:
            self.adj_list[vertex] = []
            
    def add_edge(self, v1, v2):
        self.adj_list[v1].append(v2)
        self.adj_list[v2].append(v1) # Undirected
        
    def get_neighbors(self, vertex):
        return self.adj_list.get(vertex, [])`}
          javascript={`class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(v1, v2) {
    // Undirected graph: add edge to both vertices
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); 
  }
  
  getNeighbors(vertex) {
    return this.adjacencyList[vertex] || [];
  }
}`}
        />
      </div>
    </div>
  );
}
