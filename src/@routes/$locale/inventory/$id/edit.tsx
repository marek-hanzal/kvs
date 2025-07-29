import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withInventoryItemPatchMutation } from "~/app/inventory/item/mutation/withInventoryItemPatchMutation";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { InventoryItemPatchForm } from "~/app/inventory/item/ui/InventoryItemPatchForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

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
			<FormWrapper
				title={<Tx label="Edit Inventory Item" />}
				hint={<Tx label="Update the inventory item details" />}
			>
				<InventoryItemPatchForm
					inventoryItemId={id}
					mutation={mutation}
					defaultValues={entity}
				/>
			</FormWrapper>
		);
	},
});
