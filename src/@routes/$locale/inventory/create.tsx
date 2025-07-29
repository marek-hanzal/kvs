import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withInventoryItemCreateMutation } from "~/app/inventory/mutation/withInventoryItemCreateMutation";
import { InventoryItemCreateForm } from "~/app/inventory/ui/InventoryItemCreateForm";

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
			<div className={"mx-auto w-1/2"}>
				<InventoryItemCreateForm mutation={mutation} />
			</div>
		);
	},
});
