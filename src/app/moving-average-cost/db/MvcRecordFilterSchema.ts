import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const MvcRecordFilterSchema = z.object({
	...FilterSchema.shape,
	name: z.string().optional(),
	idIn: z.array(z.string()).nullable().optional(),
	fulltext: z.string().nullable().optional(),
});

export type MvcRecordFilterSchema = typeof MvcRecordFilterSchema;

export namespace MvcRecordFilterSchema {
	export type Type = z.infer<MvcRecordFilterSchema>;
}
