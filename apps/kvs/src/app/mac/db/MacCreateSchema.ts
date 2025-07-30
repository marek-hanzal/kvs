import { z } from "zod";
import { MacSchema } from "~/app/mac/db/MacSchema";

export const MacCreateSchema = z.object({
	...MacSchema.omit({
		id: true,
		stamp: true,
	}).shape,
	inventoryItemIds: z.array(z.string()),
	transactionIds: z.array(z.string()),
});

export type MacCreateSchema = typeof MacCreateSchema;

export namespace MacCreateSchema {
	export type Type = z.infer<MacCreateSchema>;
}
