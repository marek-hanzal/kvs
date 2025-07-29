import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/inventory/ui/Layout";

export const Route = createFileRoute("/$locale/inventory")({
	component: Layout,
});
