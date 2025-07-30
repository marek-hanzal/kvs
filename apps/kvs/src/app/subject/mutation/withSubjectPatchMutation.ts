import { withMutation } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";
import { SubjectPatchSchema } from "~/app/subject/db/SubjectPatchSchema";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { withSubjectFetchQuery } from "~/app/subject/query/withSubjectFetchQuery";
import { withSubjectListQuery } from "~/app/subject/query/withSubjectListQuery";

export namespace withSubjectPatchMutation {
	export interface Props
		extends withMutation.PropsEx<
			SubjectPatchSchema.Type,
			SubjectSchema.Type
		> {
		subjectId: string;
	}
}

export const withSubjectPatchMutation = ({
	subjectId,
}: withSubjectPatchMutation.Props) => {
	return withMutation<SubjectPatchSchema.Type, SubjectSchema.Type>({
		keys(data) {
			return [
				"subject",
				"patch",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.updateTable("Subject")
				.set(SubjectPatchSchema.parse(values))
				.where("id", "=", subjectId)
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withSubjectFetchQuery(),
			withSubjectListQuery(),
		],
	});
};
