import type { NumberPadProps } from "../types/global.types";

export default function NumberPad(props: NumberPadProps) {
	const { onNumberClick, disabled = false } = props;
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<div className="flex justify-around mt-6 bg-green-600 rounded-md p-2 mx-4">
			<div className="grid grid-cols-9 gap-2 max-w-lg">
				{numbers.map((number) => (
					<button
						type="button"
						key={number}
						onClick={() => onNumberClick(number)}
						disabled={disabled}
						className={`
              w-8 h-8
              transition-all duration-150
              ${
								disabled
									? " text-gray-500 cursor-not-allowed"
									: " text-black active:bg-blue-800 hover:shadow-md"
							}
            `}
					>
						{number}
					</button>
				))}
			</div>
		</div>
	);
}
