import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "DR Sudoku",
				short_name: "DR Sudoku",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#42b883",
				lang: "en",
				scope: "/",
			},
		}),
	],
});
