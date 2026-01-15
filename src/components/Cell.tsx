import type { CellProps } from "../types/global.types";


export default function Cell(props: CellProps) {
	const {
		value,
		isFixed,
		isSelected,
		hasConflict,
	borderClass,
	onClick,
	onChange,
	} = props;


	const stateClasses = [
		isSelected ? "selected" : "",
		isFixed ? "fixed" : "",
		hasConflict ? "conflict" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<td
			className={`sudoku-cell ${stateClasses} ${borderClass}`}
			onClick={onClick}
		>
			<input
				type="text"
				value={value === 0 ? "" : value}
				onChange={(e) => onChange(e.target.value)}
				maxLength={1}
				inputMode="numeric"
				pattern="[1-9]*"
				readOnly={isFixed}
			/>
		</td>
	);
};

