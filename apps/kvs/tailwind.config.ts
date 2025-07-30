import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./index.html",
		"node_modules/@use-pico/**/*.{ts,tsx}",
	],
	important: true,
	plugins: [
		addDynamicIconSelectors(),
	],
} as const;
