import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

function Social() {
	return (
		<span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
			<a
				href="https://github.com/rahmoundif"
				target="_blank"
				rel="noopener noreferrer"
				className="text-gray-500 hover:text-gray-700 ml-3"
				aria-label="GitHub"
			>
				<FaGithub size={20} />
			</a>
			<a
				href="https://www.linkedin.com/in/rahmoun-dif/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-gray-500 hover:text-gray-700 ml-3"
				aria-label="LinkedIn"
			>
				<FaLinkedin size={20} />
			</a>
			<a
				href="https://malt.com/rahmoundif"
				target="_blank"
				rel="noopener noreferrer"
				className="text-gray-500 hover:text-gray-700 ml-3"
				aria-label="Malt"
			>
				<SiBluesky size={20} />
			</a>
		</span>
	);
}

export default Social;
