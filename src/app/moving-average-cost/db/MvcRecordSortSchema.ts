import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const MvcRecordSortSchema = z.object({
	stamp: OrderSchema.optional(),
	name: OrderSchema.optional(),
	amount: OrderSchema.optional(),
	cost: OrderSchema.optional(),
	gross: OrderSchema.optional(),
});

export type MvcRecordSortSchema = typeof MvcRecordSortSchema;

export namespace MvcRecordSortSchema {
	export type Type = z.infer<MvcRecordSortSchema>;
}
