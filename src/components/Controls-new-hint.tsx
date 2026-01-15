import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import type { ControlsProps } from "../types/global.types";


export function ControlsNewHint({
	onNewGame,
	onHint,
	currentDifficulty,
	hintsRemaining,
}: ControlsProps) {
	return (
		<div className="flex gap-4 flex-wrap justify-between items-center">
			<button
				onClick={() => onNewGame(currentDifficulty)}
				className=""
				aria-label="New Game"
			>
				<FiRefreshCw size={18} fill="green" />
			</button>
			<button
				onClick={onHint}
				className="flex"
				aria-label={`Hint (${hintsRemaining} remaining)`}
			>
				{hintsRemaining > 0 ? (
					<FaRegLightbulb size={18} fill="green" />
				) : (
					<FaLightbulb size={18} />
				)}
				<span className="text-sm font-medium">{hintsRemaining}</span>
			</button>
		</div>
	);
}
