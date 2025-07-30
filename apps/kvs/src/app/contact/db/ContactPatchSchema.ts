import type { z } from "zod";
import { ContactSchema } from "~/app/contact/db/ContactSchema";

export const ContactPatchSchema = ContactSchema.omit({
	id: true,
});

export type ContactPatchSchema = typeof ContactPatchSchema;

export namespace ContactPatchSchema {
	export type Type = z.infer<ContactPatchSchema>;
}
