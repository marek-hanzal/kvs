import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { DateTime } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryTransactionFilterSchema } from "~/app/inventory/transaction/db/InventoryTransactionFilterSchema";
import { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";
import type { InventoryTransactionSortSchema } from "~/app/inventory/transaction/db/InventoryTransactionSortSchema";

export const withInventoryTransactionListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: InventoryTransactionFilterSchema.Type;
			filter?: InventoryTransactionFilterSchema.Type;
			sort?: InventoryTransactionSortSchema.Type;
		},
		withListCount.Result<InventoryTransactionSchema.Type>
	>({
		keys(data) {
			return [
				"inventory-transaction",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely
					.selectFrom("InventoryTransaction as it")
					.selectAll(),
				output: InventoryTransactionSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("it.id", "=", where.id);
					}

					if (where?.inventoryItemId) {
						$select = $select.where(
							"it.inventoryItemId",
							"=",
							where.inventoryItemId,
						);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("it.id", "like", fulltext),
								eb("it.inventoryItemId", "like", fulltext),
								eb("it.note", "like", fulltext),
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
								"it.accountTo",
								">=",
								accountToFrom,
							);
						}
						if (accountToTo) {
							$select = $select.where(
								"it.accountTo",
								"<=",
								accountToTo,
							);
						}
					} else {
						// Fallback to manual date ranges if no accountToType is specified
						if (where?.accountToFrom) {
							$select = $select.where(
								"it.accountTo",
								">=",
								where.accountToFrom,
							);
						}

						if (where?.accountToTo) {
							$select = $select.where(
								"it.accountTo",
								"<=",
								where.accountToTo,
							);
						}
					}

					if (sort) {
						if (sort.stamp) {
							$select = $select.orderBy("it.stamp", sort.stamp);
						}
						if (sort.amount) {
							$select = $select.orderBy("it.amount", sort.amount);
						}
					}

					return $select;
				},
			});
		},
	});
};
