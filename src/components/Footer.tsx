import Social from "./social-footer";

function Footer() {
	return (
		<footer className="max-w-lg container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
			<a
				href="https://www.rahmoundif.dev"
				className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
			>
				<img
					src="https://www.rahmoundif.dev/logo_portfolio.webp"
					alt="Sudoku Logo"
					className="w-10"
				/>
			</a>
			<p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
				&copy; {new Date().getFullYear()}
			</p>
			<Social />
		</footer>
	);
}

export default Footer;
