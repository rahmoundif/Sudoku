import type React from "react";
import { useMemo } from "react";
import Cell from "./Cell";
import type { SudokuGridProps } from "../types/global.types";

const SudokuGrid: React.FC<SudokuGridProps> = ({
  board,
  initialBoard,
  selectedCell,
  conflicts,
  isShaking,
  onCellClick,
  onCellChange,
}) => {
  const idMatrix = useMemo(() => {
    const ids: string[][] = [];
    for (let i = 0; i < 9; i++) {
      ids[i] = [];
      for (let j = 0; j < 9; j++) {
        ids[i][j] = `cell-${i}-${j}-${Math.random().toString(36).slice(2, 9)}`;
      }
    }
    return ids;
  }, []);

  return (
    <div className={`sudoku-container ${isShaking ? "shake" : ""}`}>
      <table className="sudoku-grid">
        <tbody>
          {board.map((row, r) => (
            <tr key={idMatrix[r][0]}>
              {row.map((cell, c) => {
                const isSelected = !!(
                  selectedCell &&
                  selectedCell.row === r &&
                  selectedCell.col === c
                );
                const isFixed = initialBoard[r][c] !== 0;
                const hasConflict = conflicts.has(`${r}-${c}`);

                // Build border classes for classic 9x9 Sudoku with 3x3 subgrids
                const borderClasses = [];

                // Subgrid borders (every 3 rows and every 3 columns for 3x3 subgrids)
                if (r % 3 === 2 && r < 8) borderClasses.push("bottom-border");
                if (c % 3 === 2 && c < 8) borderClasses.push("right-border");

                const cellClass = borderClasses.join(" ");

                return (
                  <Cell
                    key={idMatrix[r][c]}
                    value={cell}
                    isFixed={isFixed}
                    isSelected={isSelected}
                    hasConflict={hasConflict}
                    hints={[]}
                    borderClass={cellClass}
                    onClick={() => onCellClick(r, c)}
                    onChange={(value) => onCellChange(r, c, value)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
