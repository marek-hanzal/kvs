import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/subject/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$locale/subject/"!</div>;
}
