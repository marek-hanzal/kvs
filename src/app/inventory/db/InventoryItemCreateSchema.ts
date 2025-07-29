import type { z } from "zod";
import { InventoryItemSchema } from "./InventoryItemSchema";

export const InventoryItemCreateSchema = InventoryItemSchema.omit({
	id: true,
	quantity: true,
});

export type InventoryItemCreateSchema = typeof InventoryItemCreateSchema;

export namespace InventoryItemCreateSchema {
	export type Type = z.infer<InventoryItemCreateSchema>;
}
