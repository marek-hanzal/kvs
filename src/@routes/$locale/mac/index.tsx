import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/mac/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$locale/mac/"!</div>;
}
