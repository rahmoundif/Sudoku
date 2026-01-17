import { useCallback, useState } from "react";
import {
  createEmptyBoard,
  generateSudokuBoard,
  getCorrectNumber,
  isValid,
  type SudokuBoard,
  validateBoard,
} from "../utils/sudokuUtils.ts";

export interface SelectedCell {
  row: number;
  col: number;
}

export function useSudokuGame() {
  // Game state
  const [board, setBoard] = useState<SudokuBoard>(createEmptyBoard);
  const [initialBoard, setInitialBoard] =
    useState<SudokuBoard>(createEmptyBoard);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());

  // UI state
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
        setIsShaking(false);
        setConflicts(new Set());
      } catch (err) {
        setMessage(`${err}`);
        setMessageType("error");
      }
    },
    [difficulty],
  );

  // Check for conflicts in the board
  const checkConflicts = useCallback((boardToCheck: SudokuBoard) => {
    const newConflicts = new Set<string>();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          boardToCheck[row][col] !== 0 &&
          !isValid(boardToCheck, row, col, boardToCheck[row][col])
        ) {
          newConflicts.add(`${row}-${col}`);
        }
      }
    }
    setConflicts(newConflicts);
  }, []);

  // Handle cell input
  const handleCellChange = useCallback(
    (row: number, col: number, value: string) => {
      if (value === "" || (value >= "1" && value <= "9")) {
        const numValue = value === "" ? 0 : parseInt(value, 10);
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = numValue;

        // Check if this input creates a conflict
        if (numValue !== 0 && !isValid(board, row, col, numValue)) {
          // Trigger shake animation
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          return; // Don't update the board if invalid
        }

        setBoard(newBoard);
        checkConflicts(newBoard);

        // Check if board is now complete and valid
        let allFilled = true;
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (newBoard[r][c] === 0) {
              allFilled = false;
              break;
            }
          }
          if (!allFilled) break;
        }

        if (allFilled && validateBoard(newBoard)) {
          // Board is complete and valid!
          setMessage("Congratulations!");
          setMessageType("success");

          // Generate new board after a short delay
          setTimeout(() => {
            fetchBoard();
          }, 2000);
        }
      }
    },
    [board, fetchBoard, checkConflicts],
  );

  // Handle cell selection
  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  // Handle hint button - randomly fills an empty cell
  const handleHintToggle = useCallback(() => {
    if (hintsUsed >= 3) {
      return; // No hints remaining, but no message as requested
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
      return; // No empty cells available
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
    // State
    board,
    initialBoard,
    selectedCell,
    difficulty,
    hintsUsed,
    isShaking,
    conflicts,
    message,
    messageType,

    // Actions
    fetchBoard,
    handleCellChange,
    handleCellClick,
    handleHintToggle,
  };
}
