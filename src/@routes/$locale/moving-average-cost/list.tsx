import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/moving-average-cost/list")({
	component() {
		return <div>List</div>;
	},
});
