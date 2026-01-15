import type { ControlsProps } from "../types/global.types";

export default function Controls(props: ControlsProps) {
	const {
		onNewGame,
		currentDifficulty,
	} = props;

	return (
		<>
			<div className="flex items-center justify-center gap-2 mb-4">
				<span className="text-xs text-gray-500 mr-2">Level:</span>
				<div className="flex gap-1">
					<button
						onClick={() => onNewGame("easy")}
						className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
							currentDifficulty === "easy"
								? "bg-green-600 text-black border-green-600"
								: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
						}`}
					>
						Noobie
					</button>
					<button
						onClick={() => onNewGame("medium")}
						className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
							currentDifficulty === "medium"
								? "bg-green-600 text-black border-green-600"
								: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
						}`}
					>
						Med
					</button>
					<button
						onClick={() => onNewGame("difficult")}
						className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
							currentDifficulty === "difficult"
								? "bg-green-600 text-black border-green-600"
								: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
						}`}
					>
						Hard
					</button>
					<button
						onClick={() => onNewGame("veteran")}
						className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
							currentDifficulty === "veteran"
								? "bg-green-600 text-black border-green-600"
								: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
						}`}
					>
						HoE
					</button>
				</div>
			</div>
		</>
	);
};

