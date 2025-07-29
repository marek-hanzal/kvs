import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { DateRangeSchema } from "~/app/schema/DateRangeSchema";

export const MacFilterSchema = z.object({
	...FilterSchema.shape,
	accountToFrom: z.string().nullish(),
	accountToTo: z.string().nullish(),
	accountToType: DateRangeSchema.optional(),
});

export type MacFilterSchema = typeof MacFilterSchema;

export namespace MacFilterSchema {
	export type Type = z.infer<MacFilterSchema>;
}
