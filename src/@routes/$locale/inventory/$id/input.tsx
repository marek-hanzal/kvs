import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withInventoryTransactionCreateMutation } from "~/app/inventory/transaction/mutation/withInventoryTransactionCreateMutation";
import { InventoryTransactionCreateForm } from "~/app/inventory/transaction/ui/InventoryTransactionCreateForm";

export const Route = createFileRoute("/$locale/inventory/$id/input")({
	component() {
		const navigate = useNavigate();
		const { locale, id } = useParams({
			from: "/$locale/inventory/$id/input",
		});

		const mutation = withInventoryTransactionCreateMutation({
			mode: "input",
		}).useMutation({
			onSuccess: () => {
				navigate({
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
