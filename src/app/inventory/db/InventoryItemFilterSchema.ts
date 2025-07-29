import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryItemFilterSchema = z.object({
	...FilterSchema.shape,
});

export type InventoryItemFilterSchema = typeof InventoryItemFilterSchema;

export namespace InventoryItemFilterSchema {
	export type Type = z.infer<InventoryItemFilterSchema>;
}
