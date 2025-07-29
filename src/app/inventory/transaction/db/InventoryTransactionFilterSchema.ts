import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { DateRangeSchema } from "~/app/schema/DateRangeSchema";

export const InventoryTransactionFilterSchema = z.object({
	...FilterSchema.shape,
	inventoryItemId: z.string().nullish(),
	accountToFrom: z.string().nullish(),
	accountToTo: z.string().nullish(),
	accountToType: DateRangeSchema.optional(),
});

export type InventoryTransactionFilterSchema =
	typeof InventoryTransactionFilterSchema;

export namespace InventoryTransactionFilterSchema {
	export type Type = z.infer<InventoryTransactionFilterSchema>;
}
