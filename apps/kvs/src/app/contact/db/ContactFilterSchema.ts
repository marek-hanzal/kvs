import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const ContactFilterSchema = z.object({
	...FilterSchema.shape,
	name: z.string().nullish(),
	subjectId: z.string().nullish(),
	email: z.string().nullish(),
	phone: z.string().nullish(),
});

export type ContactFilterSchema = typeof ContactFilterSchema;

export namespace ContactFilterSchema {
	export type Type = z.infer<ContactFilterSchema>;
}
