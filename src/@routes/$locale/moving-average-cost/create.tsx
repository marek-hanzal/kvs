import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/moving-average-cost/create")({
	component() {
		return <div>Create</div>;
	},
});
