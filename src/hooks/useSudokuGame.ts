import { hasAtLeastOneSolution } from "../utils/sudokuUtils.ts";
import { useState, useCallback } from "react";
import {
	createEmptyBoard,
	generateSudokuBoard,
	getCorrectNumber,
	isValid,
	validateBoard,
} from "../utils/sudokuUtils.ts";
import type { SudokuBoard } from "../types/global.types.ts";
import type { SelectedCell } from "../types/global.types.ts";

export function useSudokuGame() {
	const [board, setBoard] = useState<SudokuBoard>(createEmptyBoard);
	const [initialBoard, setInitialBoard] = useState<SudokuBoard>(createEmptyBoard);
	const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
	const [difficulty, setDifficulty] = useState<string>("easy");
	const [hintsUsed, setHintsUsed] = useState<number>(0);
	const [isInvalid, setIsInvalid] = useState<boolean>(false);
	const [validFlashes, setValidFlashes] = useState<Set<string>>(new Set());
	const [message, setMessage] = useState<string>("");
	const [messageType, setMessageType] = useState<string>("");

	// Generate a new board
	const fetchBoard = useCallback(
		(selectedDifficulty: string = difficulty) => {
			try {
				const newBoard = generateSudokuBoard(selectedDifficulty);
				setBoard(newBoard);
				setInitialBoard(newBoard.map((row) => [...row]));
				setDifficulty(selectedDifficulty);
				setMessage("");
				setMessageType("");
				setHintsUsed(0);
				setIsInvalid(false);
				setValidFlashes(new Set());
			} catch (err) {
				setMessage(`${err}`);
				setMessageType("error");
			}
		},
		[difficulty],
	);

	// Check for conflicts in the board

	// Handle cell input
	const handleCellChange = useCallback(
		(row: number, col: number, value: string) => {
			// Prevent changing fixed cells
			if (initialBoard[row][col] !== 0) return;
			 if (!(value === "" || (value >= "1" && value <= "9"))) return;

    const numValue = value === "" ? 0 : parseInt(value, 10);

    // Build candidate board
    const candidate = board.map((r) => [...r]);
    candidate[row][col] = numValue;

    // 1) Local validity (avoid self-check issue by clearing cell before validating)
    if (numValue !== 0) {
      const localCheck = board.map((r) => [...r]);
      localCheck[row][col] = 0;

      if (!isValid(localCheck, row, col, numValue)) {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 500);
        return;
      }

      // 2) Global solvability
      const solvabilityCheck = board.map((r) => [...r]);
      solvabilityCheck[row][col] = numValue;

      if (!hasAtLeastOneSolution(solvabilityCheck)) {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 500);
        return;
      }
    }

    // Commit (only after all validations pass)
    setBoard(candidate);

    // Valid input: flash green
    const cellKey = `${row}-${col}`;
    setValidFlashes((prev) => new Set(prev).add(cellKey));
    setTimeout(() => {
      setValidFlashes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cellKey);
        return newSet;
      });
    }, 500);

    // Completion check
    let allFilled = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (candidate[r][c] === 0) {
          allFilled = false;
          break;
        }
      }
      if (!allFilled) return;
    }

    if (allFilled && validateBoard(candidate)) {
      setMessage("Congratulations!");
      setMessageType("success");
      setTimeout(() => fetchBoard(), 2000);
    }
  },
  [board, initialBoard, fetchBoard],
);

	// Handle cell selection
	const handleCellClick = useCallback((row: number, col: number) => {
		setSelectedCell({ row, col });
	}, []);

	// Handle hint button will randomly fill an empty cell
	const handleHintToggle = useCallback(() => {
		if (hintsUsed >= 3) {
			return;
		}

		// Find all empty cells
		const emptyCells: [number, number][] = [];
		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				if (board[r][c] === 0) {
					emptyCells.push([r, c]);
				}
			}
		}

		if (emptyCells.length === 0) {
			return;
		}

		// Randomly select an empty cell
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		const [row, col] = emptyCells[randomIndex];

		try {
			const correctNumber = getCorrectNumber(board, row, col);

			if (correctNumber && correctNumber !== 0) {
				// Fill in the correct number
				const newBoard = board.map((r) => [...r]);
				newBoard[row][col] = correctNumber;

				// Also update initialBoard to mark this cell as fixed
				const newInitialBoard = initialBoard.map((r) => [...r]);
				newInitialBoard[row][col] = correctNumber;

				setBoard(newBoard);
				setInitialBoard(newInitialBoard);

				// Update hints used counter
				setHintsUsed((prev) => prev + 1);
			}
		} catch (err) {
			console.error("Error getting hint:", err);
		}
	}, [board, initialBoard, hintsUsed]);

	return {
		board,
		initialBoard,
		selectedCell,
		difficulty,
		hintsUsed,
		isInvalid,
		validFlashes,
		message,
		messageType,
		fetchBoard,
		handleCellChange,
		handleCellClick,
		handleHintToggle,
	};
}
