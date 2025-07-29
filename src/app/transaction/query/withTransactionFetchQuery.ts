import { withFetch, withQuery } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { TransactionSchema } from "~/app/transaction/db/TransactionSchema";

export const withTransactionFetchQuery = () => {
	return withQuery<IdentitySchema.Type, TransactionSchema.Type>({
		keys(data) {
			return [
				"transaction",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			return withFetch({
				select: kysely.selectFrom("Transaction as t").selectAll(),
				output: TransactionSchema,
				where: {
					id,
				},
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("t.id", "=", where.id);
					}

					return $select;
				},
			});
		},
	});
};
