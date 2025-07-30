import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/subject/ui/Layout";

export const Route = createFileRoute("/$locale/subject")({
	component: Layout,
});
