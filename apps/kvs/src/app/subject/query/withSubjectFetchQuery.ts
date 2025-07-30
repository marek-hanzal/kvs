import { withQuery } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";

export const withSubjectFetchQuery = () => {
	return withQuery<IdentitySchema.Type, SubjectSchema.Type>({
		keys(data) {
			return [
				"subject",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			return kysely
				.selectFrom("Subject")
				.selectAll()
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		},
	});
};
