import type { CellProps } from "../types/global.types";

export default function Cell(props: CellProps) {
	const { value, isFixed, isSelected, borderClass, onClick, onChange } = props;

	const stateClasses = [isSelected ? "selected" : "", isFixed ? "fixed" : ""]
		.filter(Boolean)
		.join(" ");

	return (
		<td
			className={`sudoku-cell ${stateClasses} ${borderClass}`}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClick();
				}
			}}
		>
			<input
				type="text"
				value={value === 0 ? "" : value}
				onChange={(e) => onChange(e.target.value)}
				maxLength={1}
				inputMode="none"
				pattern="[1-9]*"
				readOnly={true}
			/>
		</td>
	);
}
