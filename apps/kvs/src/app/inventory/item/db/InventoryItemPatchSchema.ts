import type { z } from "zod";
import { InventoryItemSchema } from "./InventoryItemSchema";

export const InventoryItemPatchSchema = InventoryItemSchema.omit({
	id: true,
	quantity: true,
}).partial();

export type InventoryItemPatchSchema = typeof InventoryItemPatchSchema;

export namespace InventoryItemPatchSchema {
	export type Type = z.infer<InventoryItemPatchSchema>;
}
