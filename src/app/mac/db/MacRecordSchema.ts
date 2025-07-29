import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const MacRecordSchema = z.object({
	...IdentitySchema.shape,
	name: z.string(),
	inventoryItemId: z.string(),
	cost: z.number(),
});

export type MacRecordSchema = typeof MacRecordSchema;

export namespace MacRecordSchema {
	export type Type = z.infer<MacRecordSchema>;
}
