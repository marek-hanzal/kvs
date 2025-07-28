import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withMvcRecordCreateMutation } from "~/app/moving-average-cost/mutation/withMvcRecordCreateMutation";
import { MvcRecordCreateForm } from "~/app/moving-average-cost/ui/MvcRecordCreateForm";

export const Route = createFileRoute("/$locale/moving-average-cost/create")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale",
		});

		const mutation = withMvcRecordCreateMutation({}).useMutation({
			onSuccess: () => {
				navigate({
					to: "/$locale/moving-average-cost/list",
					params: {
						locale,
					},
				});
			},
		});

		return (
			<div className={"mx-auto w-1/2"}>
				<MvcRecordCreateForm mutation={mutation} />
			</div>
		);
	},
});
