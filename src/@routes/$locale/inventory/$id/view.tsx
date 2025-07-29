import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { InventoryTransactionFilterSchema } from "~/app/inventory/transaction/db/InventoryTransactionFilterSchema";
import { withInventoryTransactionListQuery } from "~/app/inventory/transaction/query/withInventoryTransactionListQuery";
import { InventoryTransactionTable } from "~/app/inventory/transaction/ui/InventoryTransactionTable";

const { validateSearch } = withSourceSearchSchema({
	filter: InventoryTransactionFilterSchema,
	defaultSort: {
		stamp: "desc",
	},
});

export const Route = createFileRoute("/$locale/inventory/$id/view")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withInventoryTransactionListQuery({
			data: deps,
		}).prefetch(queryClient);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const { id } = Route.useParams();
		const inventoryTransactionListQuery = withInventoryTransactionListQuery(
			{
				data: {
					cursor,
					filter,
					sort,
					where: {
						inventoryItemId: id,
					},
				},
			},
		);
		const {
			data: { list, count },
		} = inventoryTransactionListQuery.useSuspenseQuery();
		const navigate = Route.useNavigate();

		return (
			<InventoryTransactionTable
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
					textTotal: <Tx label={"Inventory Transaction count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
