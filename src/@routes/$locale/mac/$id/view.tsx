import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/mac/$id/view")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>View MAC</div>;
}
