import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/inventory/item/ui/Layout";

export const Route = createFileRoute("/$locale/inventory")({
	component: Layout,
});
