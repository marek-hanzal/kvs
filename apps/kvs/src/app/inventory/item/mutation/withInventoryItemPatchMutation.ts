import { withMutation } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { InventoryItemPatchSchema } from "~/app/inventory/item/db/InventoryItemPatchSchema";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";

export const withInventoryItemPatchMutation = ({ id }: IdentitySchema.Type) => {
	return withMutation<InventoryItemPatchSchema.Type, void>({
		keys(data) {
			return [
				"inventory-item",
				"patch",
				{
					id,
					...data,
				},
			];
		},
		async mutationFn(values) {
			await kysely
				.updateTable("InventoryItem")
				.set(InventoryItemPatchSchema.parse(values))
				.where("id", "=", id)
				.execute();
		},
		invalidate: [
			withInventoryItemFetchQuery(),
			withInventoryItemListQuery(),
		],
	});
};
