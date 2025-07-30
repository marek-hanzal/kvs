import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { IndexMenu } from "~/app/inventory/item/ui/IndexMenu";
import { InventoryItemPreview } from "~/app/inventory/item/ui/InventoryItemPreview";
import { usePageTva } from "~/app/ui/usePageTva";

export const Route = createFileRoute("/$locale/inventory/$id")({
	async loader({ context: { queryClient }, params }) {
		await withInventoryItemFetchQuery().prefetch(queryClient, params);
	},
	component() {
		const { id } = Route.useParams();
		const tva = usePageTva();
		const { slots } = tva({});
		const inventoryItemFetchQuery = withInventoryItemFetchQuery();
		const { data } = inventoryItemFetchQuery.useSuspenseQuery({
			id,
		});

		return (
			<div className={slots.base()}>
				<InventoryItemPreview entity={data} />

				<IndexMenu entity={data} />

				<Outlet />
			</div>
		);
	},
});
