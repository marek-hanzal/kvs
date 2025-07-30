import type { z } from "zod";
import { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";

export const InventoryTransactionCreateSchema = InventoryTransactionSchema.omit(
	{
		id: true,
		stamp: true,
	},
);

export type InventoryTransactionCreateSchema =
	typeof InventoryTransactionCreateSchema;

export namespace InventoryTransactionCreateSchema {
	export type Type = z.infer<InventoryTransactionCreateSchema>;
}
