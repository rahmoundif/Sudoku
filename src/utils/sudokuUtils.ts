import type { SudokuBoard, Position } from "../types/global.types";
/**
 * Create an empty 9x9 board
 */
export function createEmptyBoard(): SudokuBoard {
	return Array(9)
		.fill(null)
		.map(() => Array(9).fill(0));
}

/**
 * Generate a complete valid Sudoku board
 */
export function generateCompleteBoard(): SudokuBoard {
	const board: SudokuBoard = Array(9)
		.fill(null)
		.map(() => Array(9).fill(0));

	if (!solve(board)) {
		throw new Error("Failed to generate complete Sudoku board");
	}

	return board;
}

/**
 * Solve Sudoku using backtracking algorithm
 */

export function hasAtLeastOneSolution(board: SudokuBoard): boolean {
  const copy = board.map(r => [...r]);
  return solve(copy);
}

function solve(board: SudokuBoard): boolean {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (isValid(board, row, col, num)) {
						board[row][col] = num;
						if (solve(board)) {
							return true;
						}
						board[row][col] = 0; // Backtrack
					}
				}
				return false;
			}
		}
	}
	return true;
}

/**
 * Check if placing a number at position is valid
 */

export function isValid(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
): boolean {
	// Check row 1-9 must be unique
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
  }

	// Check column 1-9 must be unique
 for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === num) return false;
  }

	// Check 3x3 box 1-9 must be unique 
const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if ((r !== row || c !== col) && board[r][c] === num) return false;
    }
  }

  return true;
}

/**
 * Generate puzzle by removing numbers from complete board
 */
export function generateSudokuBoard(
	difficulty: string = "medium",
): SudokuBoard {
	const completeBoard = generateCompleteBoard();
	const puzzle = completeBoard.map((row) => [...row]);

	// Determine how many cells to remove based on difficulty
	let cellsToRemove = 0;
	switch (difficulty) {
		case "easy":
			cellsToRemove = 25;
			break;
		case "medium":
			cellsToRemove = 45;
			break;
		case "hard":
			cellsToRemove = 55;
			break;
	}

	// Remove cells randomly 
	let removed = 0;
	while (removed < cellsToRemove) {
		const row = Math.floor(Math.random() * 9);
		const col = Math.floor(Math.random() * 9);

		if (puzzle[row][col] !== 0) {
			puzzle[row][col] = 0;
			removed++;
		}
	}

	return puzzle;
}

/**
 * Validate if a number can be placed at a position
 */

export function isValidInput(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
): boolean {
	// Check if position is empty (0)
	if (board[row][col] !== 0) return false;

	// Check if number is valid (1-9)
	if (num < 1 || num > 9) return false;

	// Check if placing this number would be valid (row, column, box)
	return isValid(board, row, col, num);
}

/**
 * Get all positions that conflict with a given position
 */
export function getConflictingPositions(
	board: SudokuBoard,
	row: number,
	col: number,
): Position[] {
	const conflicts: Position[] = [];

	// Check same row 
	for (let c = 0; c < 9; c++) {
		if (c !== col && board[row][c] !== 0) {
			conflicts.push([row, c]);
		}
	}

	// Check same column 
	for (let r = 0; r < 9; r++) {
		if (r !== row && board[r][col] !== 0) {
			conflicts.push([r, col]);
		}
	}

	// Check same 3x3 box
	const boxRow = Math.floor(row / 3) * 3;
	const boxCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const r = boxRow + i;
			const c = boxCol + j;
			if ((r !== row || c !== col) && board[r][c] !== 0) {
				conflicts.push([r, c]);
			}
		}
	}

	return conflicts;
}

/**
 * Handle number input from numpad
 */
export function handleNumberInput(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
	onValidInput: () => void,
	onInvalidInput: () => void,
): boolean {
	if (isValidInput(board, row, col, num)) {
		board[row][col] = num;
		onValidInput();
		return true;
	} else {
		onInvalidInput();
		return false;
	}
}

/**
 * Get the correct number for a specific position by solving
 */
export function getCorrectNumber(
	board: SudokuBoard,
	row: number,
	col: number,
): number | null {
	const solvedBoard = board.map((r) => [...r]);
	if (solve(solvedBoard)) {
		return solvedBoard[row][col];
	}
	return null;
}

/**
 * Validate if the current board state is valid
 */
export function validateBoard(board: SudokuBoard): boolean {
	// Check all filled cells are valid
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] !== 0) {
				// Temporarily set to 0 to check if valid
				const num = board[row][col];
				board[row][col] = 0;
				const isValidPlacementCheck = isValid(board, row, col, num);
				board[row][col] = num; // Restore

				if (!isValidPlacementCheck) return false;
			}
		}
	}
	return true;
}
