import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Message from "./components/Message.tsx";
import SudokuGrid from "./components/SudokuGrid.tsx";
import NumberPad from "./components/NumberPad.tsx";
import Controls from "./components/Controls.tsx";
import { useSudokuGame } from "./hooks/useSudokuGame.ts";
import { ControlsNewHint } from "./components/Controls-new-hint.tsx";

export default function App() {
	const {
		board,
		initialBoard,
		selectedCell,
		difficulty,
		hintsUsed,
		isShaking,
		conflicts,
		message,
		messageType,
		fetchBoard,
		handleCellChange,
		handleCellClick,
		handleHintToggle,
	} = useSudokuGame();

	useEffect(() => {
		fetchBoard();
	}, [fetchBoard]);


	const handleNumberClick = (number: number) => {
		if (!selectedCell) return;

		const { row, col } = selectedCell;

    
		if (initialBoard[row][col] !== 0) {
			return;
		}

		handleCellChange(row, col, number.toString());
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 p-4">
			<div className="max-w-4xl mx-auto flex flex-col items-center">
				<Header />
				<Controls
					onNewGame={(newDifficulty) => fetchBoard(newDifficulty)}
					onHint={handleHintToggle}
					currentDifficulty={difficulty}
					hintsRemaining={3 - hintsUsed}
				/>
				<Message message={message} type={messageType} />

				<section className="bg-white rounded-lg shadow-lg pb-6">
					<div className="px-5 pt-3">
						<ControlsNewHint
							onNewGame={(newDifficulty) => fetchBoard(newDifficulty)}
							onHint={handleHintToggle}
							currentDifficulty={difficulty}
							hintsRemaining={3 - hintsUsed}
						/>
					</div>
					<SudokuGrid
						board={board}
						initialBoard={initialBoard}
						selectedCell={selectedCell}
						conflicts={conflicts}
						isShaking={isShaking}
						onCellClick={handleCellClick}
						onCellChange={handleCellChange}
					/>
					<NumberPad
						onNumberClick={handleNumberClick}
						disabled={!selectedCell}
					/>
				</section>

				<Footer />
			</div>
		</div>
	);
};