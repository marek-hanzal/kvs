import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const MacRecordSortSchema = z.object({
	id: OrderSchema.optional(),
	name: OrderSchema.optional(),
	inventoryItemId: OrderSchema.optional(),
	cost: OrderSchema.optional(),
});

export type MacRecordSortSchema = typeof MacRecordSortSchema;

export namespace MacRecordSortSchema {
	export type Type = z.infer<MacRecordSortSchema>;
}
