import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withMacCreateMutation } from "~/app/mac/mutation/withMacCreateMutation";
import { MacCreateForm } from "~/app/mac/ui/MacCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

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
			<FormWrapper
				title={<Tx label="Create MAC" />}
				hint={
					<Tx label="Create a new MAC (Monthly Account Calculation) entry" />
				}
			>
				<MacCreateForm mutation={mutation} />
			</FormWrapper>
		);
	},
});
