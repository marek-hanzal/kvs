import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/app/transaction/ui/Layout";

export const Route = createFileRoute("/$locale/transaction")({
	component: Layout,
});
