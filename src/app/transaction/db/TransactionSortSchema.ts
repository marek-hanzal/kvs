import { OrderSchema } from "@use-pico/common";
import { z } from "zod";

export const TransactionSortSchema = z.object({
	stamp: OrderSchema.optional(),
	amount: OrderSchema.optional(),
	accountTo: OrderSchema.optional(),
});

export type TransactionSortSchema = typeof TransactionSortSchema;

export namespace TransactionSortSchema {
	export type Type = z.infer<TransactionSortSchema>;
}
