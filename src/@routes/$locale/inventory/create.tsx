import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withInventoryItemCreateMutation } from "~/app/inventory/item/mutation/withInventoryItemCreateMutation";
import { InventoryItemCreateForm } from "~/app/inventory/item/ui/InventoryItemCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/inventory/create")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale",
		});

		const mutation = withInventoryItemCreateMutation({}).useMutation({
			onSuccess: () => {
				navigate({
					to: "/$locale/inventory/list",
					params: {
						locale,
					},
				});
			},
		});

		return (
			<FormWrapper
				title={<Tx label="Create Inventory Item" />}
				hint={<Tx label="Add a new item to your inventory" />}
			>
				<InventoryItemCreateForm mutation={mutation} />
			</FormWrapper>
		);
	},
});
