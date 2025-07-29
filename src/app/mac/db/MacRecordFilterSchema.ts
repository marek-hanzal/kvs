import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const MacRecordFilterSchema = z.object({
	...FilterSchema.shape,
	name: z.string().optional(),
	inventoryItemId: z.string().optional(),
});

export type MacRecordFilterSchema = typeof MacRecordFilterSchema;

export namespace MacRecordFilterSchema {
	export type Type = z.infer<MacRecordFilterSchema>;
}
