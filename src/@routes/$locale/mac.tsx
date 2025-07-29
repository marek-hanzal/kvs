import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/mac/ui/Layout";

export const Route = createFileRoute("/$locale/mac")({
	component: Layout,
});
