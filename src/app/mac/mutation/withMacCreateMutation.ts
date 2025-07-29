import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { MacCreateSchema } from "~/app/mac/db/MacCreateSchema";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { withMacListQuery } from "~/app/mac/query/withMacListQuery";

export const withMacCreateMutation = () => {
	return withMutation<MacCreateSchema.Type, MacSchema.Type>({
		keys(data) {
			return [
				"mac",
				"create",
				data,
			];
		},
		async mutationFn({ accountTo, ...values }) {
			return kysely
				.insertInto("Mac")
				.values({
					id: genId(),
					stamp: DateTime.utc().toSQL(),
					...MacCreateSchema.parse({
						accountTo,
						...values,
					}),
					/**
					 * This one must be extra, because schema is formatting it in an
					 * incorrect way.
					 */
					accountTo: String(
						DateTime.fromISO(`${accountTo}-01`)
							.endOf("month")
							.toUTC()
							.toSQL(),
					),
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withMacFetchQuery(),
			withMacListQuery(),
		],
	});
};
