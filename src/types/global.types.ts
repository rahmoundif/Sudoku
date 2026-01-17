export interface CellProps {
	value: number;
	isFixed: boolean;
	isSelected: boolean;
	hints: number[];
	borderClass: string;
	onClick: () => void;
	onChange: (value: string) => void;
}

export interface ControlsProps {
	onNewGame: (difficulty: string) => void;
	onHint: () => void;
	currentDifficulty: string;
	hintsRemaining: number;
}

export interface MessageProps {
	message: string;
	type?: string;
}

export interface NumberPadProps {
	onNumberClick: (number: number) => void;
	disabled?: boolean;
}

export interface SelectedCell {
	row: number;
	col: number;
}

export interface SudokuGridProps {
	board: number[][];
	initialBoard: number[][];
	selectedCell: SelectedCell | null;
	validFlashes: Set<string>;
	isInvalid: boolean;
	onCellClick: (row: number, col: number) => void;
	onCellChange: (row: number, col: number, value: string) => void;
}
