import { useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withInventoryItemQuantityMutation } from "~/app/inventory/item/mutation/withInventoryItemQuantityMutation";
import { withInventoryTransactionCreateMutation } from "~/app/inventory/transaction/mutation/withInventoryTransactionCreateMutation";
import { InventoryTransactionCreateForm } from "~/app/inventory/transaction/ui/InventoryTransactionCreateForm";

export const Route = createFileRoute("/$locale/inventory/$id/input")({
	component() {
		const navigate = useNavigate();
		const queryClient = useQueryClient();
		const { locale, id } = useParams({
			from: "/$locale/inventory/$id/input",
		});
		const { mutate: refreshQuantity } = withInventoryItemQuantityMutation();
		const mutation = withInventoryTransactionCreateMutation({
			mode: "input",
		}).useMutation({
			async onSuccess() {
				await refreshQuantity(queryClient, {
					inventoryItemId: id,
				});

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
				<InventoryTransactionCreateForm
					mutation={mutation}
					inventoryItemId={id}
				/>
			</div>
		);
	},
});
