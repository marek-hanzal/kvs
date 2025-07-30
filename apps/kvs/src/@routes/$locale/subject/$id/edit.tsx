import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withSubjectPatchMutation } from "~/app/subject/mutation/withSubjectPatchMutation";
import { withSubjectFetchQuery } from "~/app/subject/query/withSubjectFetchQuery";
import { SubjectPatchForm } from "~/app/subject/ui/SubjectPatchForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/subject/$id/edit")({
	component() {
		const navigate = useNavigate();
		const { locale, id } = Route.useParams();
		const subjectQuery = withSubjectFetchQuery();
		const { data: entity } = subjectQuery.useSuspenseQuery({
			id,
		});

		const mutation = withSubjectPatchMutation({
			subjectId: id,
		}).useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/subject/$id/view",
					params: {
						locale,
						id,
					},
				});
			},
		});

		return (
			<FormWrapper
				title={<Tx label="Edit Subject" />}
				hint={<Tx label="Update the subject details" />}
			>
				<SubjectPatchForm
					subjectId={id}
					mutation={mutation}
					defaultValues={entity}
				/>
			</FormWrapper>
		);
	},
});
