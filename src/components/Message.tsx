import type { MessageProps } from "../types/global.types";

export default function Message(props: MessageProps) {
	const { message, type } = props;

	if (!message) return null;

	const baseClasses =
		"min-h-12 flex items-center justify-center font-medium text-base transition-all duration-300";

	const typeClasses = {
		success: "text-green-600",
		error: "text-red-600",
		warning: "text-yellow-600 animate-pulse",
	};

	return (
		<div
			className={`${baseClasses} ${type ? typeClasses[type as keyof typeof typeClasses] : ""}`}
		>
			{message}
		</div>
	);
}
