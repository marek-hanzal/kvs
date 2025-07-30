import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const SubjectSortSchema = z.object({
	name: OrderSchema.optional(),
	vat: OrderSchema.optional(),
	city: OrderSchema.optional(),
});

export type SubjectSortSchema = typeof SubjectSortSchema;

export namespace SubjectSortSchema {
	export type Type = z.infer<SubjectSortSchema>;
}
