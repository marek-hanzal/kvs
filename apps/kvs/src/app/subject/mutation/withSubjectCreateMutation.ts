import { withMutation } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { SubjectCreateSchema } from "~/app/subject/db/SubjectCreateSchema";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { withSubjectListQuery } from "~/app/subject/query/withSubjectListQuery";

export namespace withSubjectCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			SubjectCreateSchema.Type,
			SubjectSchema.Type
		> {
		//
	}
}

export const withSubjectCreateMutation = (
	_: withSubjectCreateMutation.Props,
) => {
	return withMutation<SubjectCreateSchema.Type, SubjectSchema.Type>({
		keys(data) {
			return [
				"subject",
				"create",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.insertInto("Subject")
				.values({
					id: genId(),
					...SubjectCreateSchema.parse(values),
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withSubjectListQuery(),
		],
	});
};
