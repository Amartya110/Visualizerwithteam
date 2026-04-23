# Algorithm & Data Structure Visualizer

A premium, interactive web application built with **React** and **Vite** that helps users understand core computer science algorithms and data structures through real-time visualizations.

## Features

- **15+ Algorithms & Data Structures**: 
  - **Searching**: Binary Search, Two Pointers
  - **Sorting**: Bubble Sort, Merge Sort, Quick Sort
  - **Graph/Tree**: Breadth-First Search (BFS), Depth-First Search (DFS), Binary Search Tree (BST)
  - **Data Structures**: Linked List, Stack, Queue, Max Heap, Hash Table, Graph
  - **Other**: Dynamic Programming (Fibonacci)
- **Interactive Execution**: Step through algorithms dynamically and watch how data changes.
- **Action Logs**: Live-updating terminal log that explains the exact steps being executed by the algorithm.
- **Code Implementations**: Every component includes a clean, syntax-highlighted static JavaScript implementation.
- **Dual Themes**: Toggle seamlessly between a "Clean Light Mode SaaS" design and a "Premium Dark Mode Glassmorphism" aesthetic.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Modules / Global Theme System)
- **Deployment**: Any static host (Vercel, Netlify, GitHub Pages)

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or download the source code:
   ```bash
   git clone <your-repo-url>
   cd b_pfGkSzkaVbr
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The visualizer will be running at `http://localhost:5173/`.

### Building for Production

To create a production build of the visualizer:
```bash
npm run build
```
This will compile the optimized application into the `dist/` directory, which can be deployed to any standard web server.

## Usage Guide

1. **Select an Algorithm**: Use the beautifully styled tab navigation at the top to choose what you want to learn.
2. **Read the Theory**: The "Explanation" block at the top of each page breaks down how the algorithm works and its time complexity.
3. **Set Parameters**: Use the controls to input target values, change array sizes, or add/remove nodes depending on the data structure.
4. **Start Visualization**: Click the primary action button to watch the algorithm execute.
5. **Follow the Logs**: The "Action Log" window on the right provides step-by-step documentation corresponding to the visual changes.
6. **Review the Code**: Scroll down to view a real-world, static JavaScript code snippet showing how the algorithm is typically implemented.

## Theming

You can switch between Light and Dark mode using the toggle button located in the top right corner of the application. 
- **Light Mode**: Provides a crisp, modern, standard SaaS interface.
- **Dark Mode**: Employs a premium, glassmorphism UI with neon accents.

## Contributing
Feel free to open an issue or submit a pull request if you want to add a new algorithm or improve an existing visualization. All algorithms live inside `src/components/algorithms/` and share styles through `src/visualizer.css`.

---
*Built for educational purposes to make computer science concepts accessible, beautiful, and intuitive.*
