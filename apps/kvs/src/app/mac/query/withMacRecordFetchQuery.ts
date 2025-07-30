import { withQuery } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";
import type { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";

export const withMacRecordFetchQuery = () => {
	return withQuery<
		{
			id: string;
		},
		MacRecordSchema.Type
	>({
		keys(data) {
			return [
				"macRecord",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			return kysely
				.selectFrom("MacRecord")
				.selectAll()
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		},
	});
};
