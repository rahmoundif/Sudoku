import type React from "react";
import { useMemo } from "react";
import type { SudokuGridProps } from "../types/global.types";
import Cell from "./Cell";

const SudokuGrid: React.FC<SudokuGridProps> = ({
	board,
	initialBoard,
	selectedCell,
	validFlashes,
	isInvalid,
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
		<div className={`sudoku-container ${isInvalid ? "invalid" : ""}`}>
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
								const isValidFlash = validFlashes.has(`${r}-${c}`);

								// Build classes
								const classes = [];
								if (r % 3 === 2 && r < 8) classes.push("bottom-border");
								if (c % 3 === 2 && c < 8) classes.push("right-border");
								if (isValidFlash) classes.push("valid-flash");

								const cellClass = classes.join(" ");

								return (
									<Cell
										key={idMatrix[r][c]}
										value={cell}
										isFixed={isFixed}
										isSelected={isSelected}
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
