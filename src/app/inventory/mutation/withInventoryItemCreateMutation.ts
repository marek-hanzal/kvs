import { withMutation } from "@use-pico/client";
import { genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { withInventoryItemListQuery } from "~/app/inventory/query/withInventoryItemListQuery";
import type { InventoryItemCreateSchema } from "../db/InventoryItemCreateSchema";
import type { InventoryItemSchema } from "../db/InventoryItemSchema";

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
			withInventoryItemListQuery({
				data: {},
			}),
		],
	});
};
