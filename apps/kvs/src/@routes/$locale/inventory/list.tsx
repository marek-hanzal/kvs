import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { InventoryItemFilterSchema } from "~/app/inventory/item/db/InventoryItemFilterSchema";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";
import { InventoryItemTable } from "~/app/inventory/item/ui/InventoryItemTable";

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
		await withInventoryItemListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const inventoryItemListQuery = withInventoryItemListQuery();
		const {
			data: { list, count },
		} = inventoryItemListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
		});
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
