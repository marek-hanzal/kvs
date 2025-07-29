import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withMacCreateMutation } from "~/app/mac/mutation/withMacCreateMutation";
import { MacCreateForm } from "~/app/mac/ui/MacCreateForm";

export const Route = createFileRoute("/$locale/mac/create")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale/mac/create",
		});

		const mutation = withMacCreateMutation().useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/mac/list",
					params: {
						locale,
					},
				});
			},
		});

		return (
			<div className={"mx-auto w-1/2"}>
				<MacCreateForm mutation={mutation} />
			</div>
		);
	},
});
