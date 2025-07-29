import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { IndexMenu } from "~/app/inventory/item/ui/IndexMenu";
import { usePageTva } from "~/app/ui/usePageTva";

export const Route = createFileRoute("/$locale/inventory/$id")({
	async loader({ context: { queryClient }, params }) {
		await withInventoryItemFetchQuery({
			data: params,
		}).prefetch(queryClient);
	},
	component() {
		const { id } = Route.useParams();
		const tva = usePageTva();
		const { slots } = tva({});
		const inventoryItemFetchQuery = withInventoryItemFetchQuery({
			data: {
				id,
			},
		});
		const { data } = inventoryItemFetchQuery.useSuspenseQuery();

		return (
			<div className={slots.base()}>
				<IndexMenu entity={data} />

				<Outlet />
			</div>
		);
	},
});
