import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const MvaRecordFilterSchema = z.object({
	...FilterSchema.shape,
	name: z.string().optional(),
});

export type MvaRecordFilterSchema = typeof MvaRecordFilterSchema;

export namespace MvaRecordFilterSchema {
	export type Type = z.infer<MvaRecordFilterSchema>;
}
