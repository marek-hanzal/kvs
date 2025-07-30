import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withSubjectCreateMutation } from "~/app/subject/mutation/withSubjectCreateMutation";
import { SubjectCreateForm } from "~/app/subject/ui/SubjectCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/subject/create")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale",
		});

		const mutation = withSubjectCreateMutation({}).useMutation({
			onSuccess: () => {
				navigate({
					to: "/$locale/subject/list",
					params: {
						locale,
					},
				});
			},
		});

		return (
			<FormWrapper
				title={<Tx label="Create Subject" />}
				hint={<Tx label="Add a new subject" />}
			>
				<SubjectCreateForm mutation={mutation} />
			</FormWrapper>
		);
	},
});
