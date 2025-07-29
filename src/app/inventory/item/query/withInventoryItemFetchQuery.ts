import { withFetch, withQuery } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";

export const withInventoryItemFetchQuery = () => {
	return withQuery<IdentitySchema.Type, InventoryItemSchema.Type>({
		keys(data) {
			return [
				"inventory-item",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			console.log("refetching!");

			return withFetch({
				select: kysely.selectFrom("InventoryItem as ii").selectAll(),
				output: InventoryItemSchema,
				where: {
					id,
				},
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("ii.id", "=", where.id);
					}

					return $select;
				},
			});
		},
	});
};
