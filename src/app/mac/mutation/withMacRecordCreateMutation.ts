import { withMutation } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { MacRecordCreateSchema } from "~/app/mac/db/MacRecordCreateSchema";
import type { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";
import { withMacRecordListQuery } from "~/app/mac/query/withMacRecordListQuery";

export const withMacRecordCreateMutation = () => {
	return withMutation<MacRecordCreateSchema.Type, MacRecordSchema.Type>({
		keys(data) {
			return [
				"macRecord",
				"create",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.insertInto("MacRecord")
				.values({
					id: genId(),
					...MacRecordCreateSchema.parse(values),
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withMacRecordListQuery(),
		],
	});
};
