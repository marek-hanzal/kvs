import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const ContactSortSchema = z.object({
	name: OrderSchema.optional(),
	email: OrderSchema.optional(),
	phone: OrderSchema.optional(),
});

export type ContactSortSchema = typeof ContactSortSchema;

export namespace ContactSortSchema {
	export type Type = z.infer<ContactSortSchema>;
}
