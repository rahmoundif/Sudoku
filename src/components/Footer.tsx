import Social from "./social-footer";

function Footer() {
	return (
		<footer className="max-w-lg container px-5 max-sm:py-3 mx-auto flex items-center sm:flex-row flex-col">
			<p className="text-sm text-gray-500 sm:ml-1 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
				&copy; {new Date().getFullYear()}
			</p>
			<Social />
		</footer>
	);
}

export default Footer;
