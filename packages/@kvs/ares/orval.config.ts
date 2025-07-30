import { defineConfig } from "orval";

export default defineConfig({
	kvs: {
		output: {
			baseUrl: process.env.VITE_ARES_API,
			mode: "single",
			target: "src/axios.ts",
			client: "axios-functions",
			mock: false,
			// clean: true,
		},
		input: `${process.env.VITE_ARES_API}/v3/api-docs`,
	},
	"kvs-zod": {
		output: {
			mode: "single",
			target: "src/zod.ts",
			client: "zod",
			mock: false,
			// clean: true,
		},
		input: `${process.env.VITE_ARES_API}/v3/api-docs`,
	},
});
