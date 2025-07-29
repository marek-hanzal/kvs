import { withMutation } from "@use-pico/client";
import { DateTime, type IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { MacPatchSchema } from "~/app/mac/db/MacPatchSchema";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { withMacListQuery } from "~/app/mac/query/withMacListQuery";

export const withMacPatchMutation = ({ id }: IdentitySchema.Type) => {
	return withMutation<MacPatchSchema.Type, MacSchema.Type>({
		keys(data) {
			return [
				"mac",
				"patch",
				data,
			];
		},
		async mutationFn({ accountTo, ...values }) {
			return kysely
				.updateTable("Mac")
				.set({
					...MacPatchSchema.parse({
						...values,
						accountTo,
					}),
					accountTo: String(
						DateTime.fromISO(`${accountTo}-01`)
							.endOf("month")
							.toUTC()
							.toSQL(),
					),
				})
				.where("id", "=", id)
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withMacFetchQuery(),
			withMacListQuery(),
		],
	});
};
