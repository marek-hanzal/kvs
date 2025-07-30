import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryItemSortSchema = z.object({
	name: OrderSchema.optional(),
	description: OrderSchema.optional(),
	quantity: OrderSchema.optional(),
});

export type InventoryItemSortSchema = typeof InventoryItemSortSchema;

export namespace InventoryItemSortSchema {
	export type Type = z.infer<InventoryItemSortSchema>;
}
