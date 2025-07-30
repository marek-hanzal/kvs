import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryTransactionSortSchema = z.object({
	stamp: OrderSchema.optional(),
	amount: OrderSchema.optional(),
});

export type InventoryTransactionSortSchema =
	typeof InventoryTransactionSortSchema;

export namespace InventoryTransactionSortSchema {
	export type Type = z.infer<InventoryTransactionSortSchema>;
}
