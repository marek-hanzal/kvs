import { withMutation } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryItemCreateSchema } from "~/app/inventory/item/db/InventoryItemCreateSchema";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";

export namespace withInventoryItemCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			InventoryItemCreateSchema.Type,
			InventoryItemSchema.Type
		> {
		//
	}
}

export const withInventoryItemCreateMutation = (
	_: withInventoryItemCreateMutation.Props,
) => {
	return withMutation<
		InventoryItemCreateSchema.Type,
		InventoryItemSchema.Type
	>({
		keys(data) {
			return [
				"inventory-item",
				"create",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.insertInto("InventoryItem")
				.values({
					id: genId(),
					quantity: 0,
					...values,
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withInventoryItemListQuery(),
		],
	});
};
