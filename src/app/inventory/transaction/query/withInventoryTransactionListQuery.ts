import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryTransactionFilterSchema } from "~/app/inventory/transaction/db/InventoryTransactionFilterSchema";
import { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";
import type { InventoryTransactionSortSchema } from "~/app/inventory/transaction/db/InventoryTransactionSortSchema";

export namespace withInventoryTransactionListQuery {
	export interface Props
		extends withQuery.PropsEx<
			{
				cursor?: CursorSchema.Type;
				where?: InventoryTransactionFilterSchema.Type;
				filter?: InventoryTransactionFilterSchema.Type;
				sort?: InventoryTransactionSortSchema.Type;
			},
			InventoryTransactionSchema.Type
		> {
		//
	}
}

export const withInventoryTransactionListQuery = ({
	data,
}: withInventoryTransactionListQuery.Props) => {
	return withQuery({
		data,
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
