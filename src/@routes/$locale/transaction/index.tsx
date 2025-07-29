import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/transaction/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$locale/transaction/"!</div>;
}
