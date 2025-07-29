import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const TransactionFilterSchema = z.object({
	...FilterSchema.shape,
});

export type TransactionFilterSchema = typeof TransactionFilterSchema;

export namespace TransactionFilterSchema {
	export type Type = z.infer<TransactionFilterSchema>;
}
