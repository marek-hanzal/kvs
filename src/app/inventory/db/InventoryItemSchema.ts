import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryItemSchema = z.object({
	...IdentitySchema.shape,
	name: z.string(),
	description: z.string().nullish(),
	quantity: z.number(),
});

export type InventoryItemSchema = typeof InventoryItemSchema;

export namespace InventoryItemSchema {
	export type Type = z.infer<InventoryItemSchema>;
}
