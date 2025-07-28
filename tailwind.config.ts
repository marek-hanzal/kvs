import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
	content: [
		"node_modules/@use-pico/**/*.{ts,tsx}",
	],
	important: true,
	plugins: [
		addDynamicIconSelectors(),
	],
};
