import type { z } from "zod";
import { ContactSchema } from "~/app/contact/db/ContactSchema";

export const ContactCreateSchema = ContactSchema.omit({
	id: true,
});

export type ContactCreateSchema = typeof ContactCreateSchema;

export namespace ContactCreateSchema {
	export type Type = z.infer<ContactCreateSchema>;
}
