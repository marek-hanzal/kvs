import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withMacPatchMutation } from "~/app/mac/mutation/withMacPatchMutation";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { MacPatchForm } from "~/app/mac/ui/MacPatchForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

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
			<FormWrapper
				title={<Tx label="Edit MAC" />}
				hint={
					<Tx label="Update the MAC (Monthly Account Calculation) entry" />
				}
			>
				<MacPatchForm
					macId={id}
					mutation={mutation}
					defaultValues={data}
				/>
			</FormWrapper>
		);
	},
});
