import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/subject/$id/view")({
	component() {
		return null;
	},
});
