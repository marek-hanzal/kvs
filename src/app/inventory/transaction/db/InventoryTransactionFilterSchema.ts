import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryTransactionFilterSchema = z.object({
	...FilterSchema.shape,
	inventoryItemId: z.string().nullish(),
});

export type InventoryTransactionFilterSchema =
	typeof InventoryTransactionFilterSchema;

export namespace InventoryTransactionFilterSchema {
	export type Type = z.infer<InventoryTransactionFilterSchema>;
}
