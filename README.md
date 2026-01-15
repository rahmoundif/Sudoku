# Sudoku Game

An interactive Sudoku puzzle game with algorithmic puzzle generation and solving.

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38b2ac?logo=tailwind-css)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-2.3-60a5fa?logo=biome)](https://biomejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Overview

This implementation uses constraint satisfaction and backtracking algorithms to generate valid Sudoku puzzles and solve them with hints.

## Algorithm Details

### Puzzle Generation

The puzzle generator uses a backtracking algorithm with constraint propagation:

1. **Start with an empty grid** - Initialize a 9x9 grid with no values
2. **Fill with backtracking** - Recursively fill cells with valid numbers (1-9) ensuring no duplicates in rows, columns, or 3x3 boxes
3. **Remove numbers** - Strategically remove filled values to create the puzzle while maintaining a unique solution

### Puzzle Solving

The solver implements the following techniques:

- **Backtracking Algorithm** - Tests each empty cell with valid candidates and backtracks if contradictions occur
- **Constraint Propagation** - Eliminates impossible values based on Sudoku rules before guessing
- **Hint System** - Provides next solvable cell recommendations using constraint logic

### Core Logic

The algorithm tracks:

- Valid candidates for each cell (values 1-9 not in same row, column, or box)
- Constraint violations to prune the search space early
- Unique solvability verification to ensure valid puzzles

## License

This project is licensed under the MIT License - see the LICENSE file for details.
