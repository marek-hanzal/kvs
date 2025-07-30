import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/transaction/$id/view")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$locale/transaction/$id/view"!</div>;
}
