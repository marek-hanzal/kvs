import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryItemFilterSchema } from "~/app/inventory/item/db/InventoryItemFilterSchema";
import { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import type { InventoryItemSortSchema } from "~/app/inventory/item/db/InventoryItemSortSchema";

export const withInventoryItemListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: InventoryItemFilterSchema.Type;
			filter?: InventoryItemFilterSchema.Type;
			sort?: InventoryItemSortSchema.Type;
		},
		withListCount.Result<InventoryItemSchema.Type>
	>({
		keys(data) {
			return [
				"inventory-item",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("InventoryItem as ii").selectAll(),
				output: InventoryItemSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("ii.id", "=", where.id);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("ii.id", "like", fulltext),
								eb("ii.name", "like", fulltext),
								eb("ii.description", "like", fulltext),
							]);
						});
					}

					if (where?.withQuantity) {
						$select = $select.where("ii.quantity", ">", 0);
					}

					if (sort) {
						if (sort.name) {
							$select = $select.orderBy("ii.name", sort.name);
						}
						if (sort.description) {
							$select = $select.orderBy(
								"ii.description",
								sort.description,
							);
						}
						if (sort.quantity) {
							$select = $select.orderBy(
								"ii.quantity",
								sort.quantity,
							);
						}
					}

					return $select;
				},
			});
		},
	});
};
