import ViteYaml from "@modyfi/vite-plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tla from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import paths from "vite-tsconfig-paths";
import pkg from "../../package.json";

export default defineConfig({
	clearScreen: false,
	define: {
		VITE_VERSION: JSON.stringify(pkg.version),
	},
	plugins: [
		tanstackRouter({
			generatedRouteTree: "./src/_route.ts",
			routesDirectory: "./src/@routes",
		}),
		tla(),
		paths(),
		react({}),
		ViteYaml(),
		dynamicImport(),
		wasm(),
		tailwindcss(),
	],
	worker: {
		format: "es",
		plugins: () => [
			paths(),
			wasm(),
		],
	},
	server: {
		strictPort: true,
		port: 4044,
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
	build: {
		target: "esnext",
	},
	optimizeDeps: {
		exclude: [
			"sqlocal",
		],
	},
});
