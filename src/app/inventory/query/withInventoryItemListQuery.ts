import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryItemFilterSchema } from "~/app/inventory/db/InventoryItemFilterSchema";
import type { InventoryItemSortSchema } from "~/app/inventory/db/InventoryItemSortSchema";
import { InventoryItemSchema } from "../db/InventoryItemSchema";

export namespace withInventoryItemListQuery {
	export interface Props
		extends withQuery.PropsEx<
			{
				cursor?: CursorSchema.Type;
				where?: InventoryItemFilterSchema.Type;
				filter?: InventoryItemFilterSchema.Type;
				sort?: InventoryItemSortSchema.Type;
			},
			InventoryItemSchema.Type
		> {
		//
	}
}

export const withInventoryItemListQuery = ({
	data,
}: withInventoryItemListQuery.Props) => {
	return withQuery({
		data,
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
