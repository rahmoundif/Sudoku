# Sudoku Game

An interactive Sudoku puzzle game with algorithmic puzzle generation and solving.

[![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38b2ac?logo=tailwind-css)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-2.3.11-60a5fa?logo=biome)](https://biomejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Overview

This implementation uses constraint satisfaction and backtracking algorithms to generate valid Sudoku puzzles and solve them with hints.

## Algorithms

This project uses four main algorithms:

**Issue:** The previous approach sucked pretty much... I realized that I had :

- **No validation** - Invalid moves were allowed, breaking game rules ex input a duplicate in a 3\*3 grid cell...
- **Unsolvable puzzles** - Random number removal created puzzles with no solution...
- **No systematic solving** - Hints were unreliable.
- **Repetitive puzzles** - Every puzzle looked the same, no variety ex: the top row was always at the same place...

## Update (17/01/2026)

### Implementation

The `sudokuUtils.ts` file implements the core algorithms:

- **`createEmptyBoard()`** - Initializes an empty 9x9 board filled with 0s.
- **`solve()`** - Backtracking algorithm. Fills empty cells (0s) by trying numbers 1-9, checking validity, and backtracking when stuck.
- **`isValid()`** - Core validation. Checks if a number exists in the row, column, or 3x3 box.
- **`generateCompleteBoard()`** - Uses backtracking to create a full valid puzzle.
- **`generateSudokuBoard(difficulty)`** - Cell removal algorithm. Removes 35-55 cells based on difficulty to create the puzzle.
- **`isValidInput()`** - Real-time validation. Ensures user input follows all Sudoku rules before placing.
- **`getConflictingPositions()`** - Highlights which cells conflict with a given position.
- **`handleNumberInput()`** - Processes number input from the numpad with validation callbacks.
- **`getCorrectNumber()`** - Hint system. Solves the board to find the correct answer for any cell.
- **`validateBoard()`** - Checks if entire board state is valid.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
