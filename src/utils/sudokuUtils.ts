// Sudoku utility functions for validation, solving, and generation

export type SudokuBoard = number[][];

/**
 * Randomize the positions of numbers in a solved Sudoku board
 */
function randomizeBoardPositions(board: SudokuBoard): void {
	// Apply random transformations that preserve Sudoku validity

	// Randomly apply transformations
	const transformations = Math.floor(Math.random() * 8);

	switch (transformations) {
		case 0:
			// Rotate 90 degrees clockwise
			rotateBoard90(board);
			break;
		case 1:
			// Rotate 180 degrees
			rotateBoard180(board);
			break;
		case 2:
			// Rotate 270 degrees clockwise
			rotateBoard270(board);
			break;
		case 3:
			// Reflect horizontally
			reflectHorizontal(board);
			break;
		case 4:
			// Reflect vertically
			reflectVertical(board);
			break;
		case 5:
			// Rotate 90 + reflect horizontal
			rotateBoard90(board);
			reflectHorizontal(board);
			break;
		case 6:
			// Rotate 180 + reflect vertical
			rotateBoard180(board);
			reflectVertical(board);
			break;
		case 7:
			// No transformation (original board)
			break;
	}
}

/**
 * Rotate board 90 degrees clockwise
 */
function rotateBoard90(board: SudokuBoard): void {
	const temp = board.map((row) => [...row]);
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			board[j][8 - i] = temp[i][j];
		}
	}
}

/**
 * Rotate board 180 degrees
 */
function rotateBoard180(board: SudokuBoard): void {
	const temp = board.map((row) => [...row]);
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			board[8 - i][8 - j] = temp[i][j];
		}
	}
}

/**
 * Rotate board 270 degrees clockwise (90 degrees counter-clockwise)
 */
function rotateBoard270(board: SudokuBoard): void {
	const temp = board.map((row) => [...row]);
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			board[8 - j][i] = temp[i][j];
		}
	}
}

/**
 * Reflect board horizontally (left-right flip)
 */
function reflectHorizontal(board: SudokuBoard): void {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 4; j++) {
			[board[i][j], board[i][8 - j]] = [board[i][8 - j], board[i][j]];
		}
	}
}

/**
 * Reflect board vertically (up-down flip)
 */
function reflectVertical(board: SudokuBoard): void {
	for (let i = 0; i < 4; i++) {
		[board[i], board[8 - i]] = [board[8 - i], board[i]];
	}
}

/**
 * Shuffle array in place using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

/**
 * Check if placing a number at a specific position is valid
 */
export function isValid(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
): boolean {
	// Check row
	for (let x = 0; x < 9; x++) {
		if (board[row][x] === num && x !== col) return false;
	}

	// Check column
	for (let x = 0; x < 9; x++) {
		if (board[x][col] === num && x !== row) return false;
	}

	// Check 3x3 subgrid
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (
				board[startRow + i][startCol + j] === num &&
				(startRow + i !== row || startCol + j !== col)
			) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Solve the Sudoku board using backtracking
 */
export function solve(board: SudokuBoard): boolean {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] === 0) {
				for (let k = 1; k <= 9; k++) {
					if (isValid(board, i, j, k)) {
						board[i][j] = k;
						if (solve(board)) {
							return true;
						} else {
							board[i][j] = 0;
						}
					}
				}
				return false;
			}
		}
	}
	return true;
}

/**
 * Generate a new Sudoku board with the specified difficulty
 */
export function generateSudokuBoard(
	difficulty: string = "medium",
): SudokuBoard {
	const board = Array(9)
		.fill(null)
		.map(() => Array(9).fill(0));

	// Fill the board completely first
	if (!solve(board)) {
		throw new Error("Failed to generate valid Sudoku board");
	}

	// Randomize the positions of numbers for variety
	randomizeBoardPositions(board);

	// Determine how many cells to remove based on difficulty
	let toRemove: number;
	switch (difficulty) {
		case "easy":
			toRemove = Math.floor(Math.random() * 10) + 36; // 36-45 removed
			break;
		case "veteran":
			toRemove = Math.floor(Math.random() * 10) + 55; // 55-64 removed
			break;
		case "difficult":
			toRemove = Math.floor(Math.random() * 7) + 49; // 49-55 removed
			break;
		case "medium":
		default:
			toRemove = Math.floor(Math.random() * 5) + 45; // 45-49 removed
			break;
	}

	// Create array of all positions and shuffle them
	const positions: [number, number][] = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			positions.push([i, j]);
		}
	}

	// Fisher-Yates shuffle
	for (let i = positions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[positions[i], positions[j]] = [positions[j], positions[i]];
	}

	// Remove cells randomly
	for (let k = 0; k < toRemove; k++) {
		const [r, c] = positions[k];
		board[r][c] = 0;
	}

	return board;
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
				const isValidPlacement = isValid(board, row, col, num);
				board[row][col] = num; // Restore

				if (!isValidPlacement) return false;
			}
		}
	}
	return true;
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
 * Create an empty 9x9 board
 */
export function createEmptyBoard(): SudokuBoard {
	return Array(9)
		.fill(null)
		.map(() => Array(9).fill(0));
}
