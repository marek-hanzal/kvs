import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/moving-average-cost/Layout";

export const Route = createFileRoute("/$locale/moving-average-cost")({
	component: Layout,
});
