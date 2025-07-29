import { withFetch, withQuery } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { MacSchema } from "~/app/mac/db/MacSchema";

export const withMacFetchQuery = () => {
	return withQuery<IdentitySchema.Type, MacSchema.Type>({
		keys(data) {
			return [
				"mac",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			return withFetch({
				select: kysely.selectFrom("Mac as m").selectAll(),
				output: MacSchema,
				where: {
					id,
				},
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("m.id", "=", where.id);
					}

					return $select;
				},
			});
		},
	});
};
