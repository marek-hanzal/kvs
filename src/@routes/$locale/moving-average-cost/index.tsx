import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/moving-average-cost/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$locale/moving-average-cost/"!</div>;
}
