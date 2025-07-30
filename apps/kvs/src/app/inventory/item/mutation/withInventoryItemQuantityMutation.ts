import { withMutation } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";
import { withInventoryItemFetchQuery } from "~/app/inventory/item/query/withInventoryItemFetchQuery";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";

export const withInventoryItemQuantityMutation = () => {
	return withMutation<
		{
			inventoryItemId: string;
		},
		void
	>({
		keys(data) {
			return [
				"inventory-item",
				"quantity",
				"recalculate",
				data,
			];
		},
		async mutationFn({ inventoryItemId }) {
			await kysely.transaction().execute(async (trx) => {
				const { quantity } = await trx
					.selectFrom("InventoryTransaction")
					.select(kysely.fn.sum<number>("amount").as("quantity"))
					.where("inventoryItemId", "=", inventoryItemId)
					.executeTakeFirstOrThrow();

				await trx
					.updateTable("InventoryItem")
					.set({
						quantity,
					})
					.where("id", "=", inventoryItemId)
					.execute();
			});
		},
		invalidate: [
			withInventoryItemFetchQuery(),
			withInventoryItemListQuery(),
		],
	});
};
