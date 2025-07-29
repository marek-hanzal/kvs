import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { withInventoryItemPatchMutation } from "~/app/inventory/item/mutation/withInventoryItemPatchMutation";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { InventoryItemPatchForm } from "~/app/inventory/item/ui/InventoryItemPatchForm";

export const Route = createFileRoute("/$locale/inventory/$id/edit")({
	component() {
		const navigate = useNavigate();
		const { locale, id } = Route.useParams();
		const inventoryItemQuery = withInventoryItemFetchQuery();
		const { data: entity } = inventoryItemQuery.useSuspenseQuery({
			id,
		});

		const mutation = withInventoryItemPatchMutation({
			id,
		}).useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/inventory/$id/view",
					params: {
						locale,
						id,
					},
				});
			},
		});

		return (
			<div className={"mx-auto w-1/2"}>
				<InventoryItemPatchForm
					inventoryItemId={id}
					mutation={mutation}
					defaultValues={entity}
				/>
			</div>
		);
	},
});
