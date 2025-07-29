import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/inventory/$id/view")({
	component() {
		return <div>Hello "/$locale/inventory/$id/view"!</div>;
	},
});
