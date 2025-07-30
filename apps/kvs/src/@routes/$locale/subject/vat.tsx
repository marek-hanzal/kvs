import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withSubjectVatMutation } from "~/app/subject/mutation/withSubjectVatMutation";
import { SubjectVatForm } from "~/app/subject/ui/SubjectVatForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/subject/vat")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale",
		});

		const mutation = withSubjectVatMutation({}).useMutation({
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
				title={<Tx label="Create Subject from VAT" />}
				hint={<Tx label="Add a new subject by VAT number lookup" />}
			>
				<SubjectVatForm mutation={mutation} />
			</FormWrapper>
		);
	},
});
