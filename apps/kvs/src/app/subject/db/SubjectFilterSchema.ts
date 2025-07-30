import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const SubjectFilterSchema = z.object({
	...FilterSchema.shape,
	name: z.string().nullish(),
	vat: z.string().nullish(),
	city: z.string().nullish(),
	zip: z.string().nullish(),
});

export type SubjectFilterSchema = typeof SubjectFilterSchema;

export namespace SubjectFilterSchema {
	export type Type = z.infer<SubjectFilterSchema>;
}
