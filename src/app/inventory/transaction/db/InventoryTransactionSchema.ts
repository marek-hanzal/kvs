import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryTransactionSchema = z.object({
	...IdentitySchema.shape,
	stamp: z.date(),
	amount: z.number(),
	inventoryItemId: z.string(),
	note: z.string().nullish(),
});

export type InventoryTransactionSchema = typeof InventoryTransactionSchema;

export namespace InventoryTransactionSchema {
	export type Type = z.infer<InventoryTransactionSchema>;
}
