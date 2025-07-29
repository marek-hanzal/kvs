import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withMacPatchMutation } from "~/app/mac/mutation/withMacPatchMutation";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { MacPatchForm } from "~/app/mac/ui/MacPatchForm";

export const Route = createFileRoute("/$locale/mac/$id/edit")({
	async loader({ context: { queryClient }, params }) {
		await withMacFetchQuery().prefetch(queryClient, params);
	},
	component() {
		const { id } = Route.useParams();
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale/mac/$id/edit",
		});

		const macFetchQuery = withMacFetchQuery();
		const { data } = macFetchQuery.useSuspenseQuery({
			id,
		});

		const mutation = withMacPatchMutation({
			id,
		}).useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/mac/$id/view",
					params: {
						locale,
						id,
					},
				});
			},
		});

		return (
			<div className={"mx-auto w-1/2"}>
				<MacPatchForm
					macId={id}
					mutation={mutation}
					defaultValues={data}
				/>
			</div>
		);
	},
});
