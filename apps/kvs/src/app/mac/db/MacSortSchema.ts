import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const MacSortSchema = z.object({
	stamp: OrderSchema.optional(),
	accountTo: OrderSchema.optional(),
});

export type MacSortSchema = typeof MacSortSchema;

export namespace MacSortSchema {
	export type Type = z.infer<MacSortSchema>;
}
