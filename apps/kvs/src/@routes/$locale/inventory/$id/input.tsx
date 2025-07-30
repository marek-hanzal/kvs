import { useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withInventoryItemQuantityMutation } from "~/app/inventory/item/mutation/withInventoryItemQuantityMutation";
import { withInventoryTransactionCreateMutation } from "~/app/inventory/transaction/mutation/withInventoryTransactionCreateMutation";
import { InventoryTransactionCreateForm } from "~/app/inventory/transaction/ui/InventoryTransactionCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

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
			<FormWrapper
				title={<Tx label={"Inventory Input"} />}
				hint={<Tx label={"Inventory Input (hint)"} />}
			>
				<InventoryTransactionCreateForm
					mutation={mutation}
					inventoryItemId={id}
				/>
			</FormWrapper>
		);
	},
});
