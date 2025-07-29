import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { InventoryItemFilterSchema } from "~/app/inventory/db/InventoryItemFilterSchema";
import { withInventoryItemListQuery } from "~/app/inventory/query/withInventoryItemListQuery";
import { InventoryItemTable } from "~/app/inventory/ui/InventoryItemTable";

const { validateSearch } = withSourceSearchSchema({
	filter: InventoryItemFilterSchema,
	defaultSort: {
		name: "asc",
	},
});

export const Route = createFileRoute("/$locale/inventory/list")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withInventoryItemListQuery({
			data: deps,
		}).prefetch(queryClient);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const inventoryItemListQuery = withInventoryItemListQuery({
			data: {
				cursor,
				filter,
				sort,
			},
		});
		const {
			data: { list, count },
		} = inventoryItemListQuery.useSuspenseQuery();
		const navigate = Route.useNavigate();

		return (
			<InventoryItemTable
				data={list}
				filter={{
					state: {
						value: filter,
						set: navigateOnFilter(navigate),
					},
				}}
				fulltext={{
					value: filter?.fulltext,
					set: navigateOnFulltext(filter?.fulltext, navigate),
				}}
				sort={{
					state: {
						value: sort,
						set: navigateOnSort(navigate),
					},
				}}
				cursor={{
					cursor,
					count,
					textTotal: <Tx label={"Inventory Item count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
