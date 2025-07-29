import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { DateTime } from "@use-pico/common";
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

					// Handle accountToType enum values
					if (where?.accountToType) {
						const now = DateTime.utc();
						let accountToFrom: string | undefined;
						let accountToTo: string | undefined;

						switch (where.accountToType) {
							case "current-month": {
								accountToFrom = now.startOf("month").toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							case "last-month": {
								const lastMonth = now.minus({
									months: 1,
								});
								accountToFrom = lastMonth
									.startOf("month")
									.toSQL();
								accountToTo = lastMonth.endOf("month").toSQL();
								break;
							}
							case "last-three-months": {
								accountToFrom = now
									.minus({
										months: 2,
									})
									.startOf("month")
									.toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							case "last-half-year": {
								accountToFrom = now
									.minus({
										months: 5,
									})
									.startOf("month")
									.toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							default:
								// Fallback to manual date ranges if provided
								accountToFrom =
									where?.accountToFrom ?? undefined;
								accountToTo = where?.accountToTo ?? undefined;
						}

						if (accountToFrom) {
							$select = $select.where(
								"t.accountTo",
								">=",
								accountToFrom,
							);
						}
						if (accountToTo) {
							$select = $select.where(
								"t.accountTo",
								"<=",
								accountToTo,
							);
						}
					} else {
						// Fallback to manual date ranges if no accountToType is specified
						if (where?.accountToFrom) {
							$select = $select.where(
								"t.accountTo",
								">=",
								where.accountToFrom,
							);
						}

						if (where?.accountToTo) {
							$select = $select.where(
								"t.accountTo",
								"<=",
								where.accountToTo,
							);
						}
					}

					if (sort) {
						if (sort.stamp) {
							$select = $select.orderBy("t.stamp", sort.stamp);
						}
						if (sort.amount) {
							$select = $select.orderBy("t.amount", sort.amount);
						}
						if (sort.accountTo) {
							$select = $select.orderBy(
								"t.accountTo",
								sort.accountTo,
							);
						}
					}

					return $select;
				},
			});
		},
	});
};
