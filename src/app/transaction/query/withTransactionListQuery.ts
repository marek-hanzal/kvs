import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { TransactionFilterSchema } from "~/app/transaction/db/TransactionFilterSchema";
import { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import type { TransactionSortSchema } from "~/app/transaction/db/TransactionSortSchema";

export const withTransactionListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: TransactionFilterSchema.Type;
			filter?: TransactionFilterSchema.Type;
			sort?: TransactionSortSchema.Type;
		},
		withListCount.Result<TransactionSchema.Type>
	>({
		keys(data) {
			return [
				"transaction",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("Transaction as t").selectAll(),
				output: TransactionSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("t.id", "=", where.id);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("t.id", "like", fulltext),
								eb("t.note", "like", fulltext),
							]);
						});
					}

					if (sort) {
						if (sort.stamp) {
							$select = $select.orderBy("t.stamp", sort.stamp);
						}
						if (sort.amount) {
							$select = $select.orderBy("t.amount", sort.amount);
						}
					}

					return $select;
				},
			});
		},
	});
};
