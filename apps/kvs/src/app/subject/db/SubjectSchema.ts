import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const SubjectSchema = z.object({
	...IdentitySchema.shape,
	name: z.string().min(1),
	vat: z.string().nullish(),
	street: z.string().nullish(),
	city: z.string().nullish(),
	zip: z.string().nullish(),
});

export type SubjectSchema = typeof SubjectSchema;

export namespace SubjectSchema {
	export type Type = z.infer<SubjectSchema>;
}
