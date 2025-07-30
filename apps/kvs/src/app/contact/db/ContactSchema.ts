import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const ContactSchema = z.object({
	...IdentitySchema.shape,
	name: z.string().min(1),
	subjectId: z.string().uuid(),
	email: z.string().nullish(),
	phone: z.string().nullish(),
});

export type ContactSchema = typeof ContactSchema;

export namespace ContactSchema {
	export type Type = z.infer<ContactSchema>;
}
