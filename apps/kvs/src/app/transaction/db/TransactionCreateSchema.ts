import type { z } from "zod";
import { TransactionSchema } from "~/app/transaction/db/TransactionSchema";

export const TransactionCreateSchema = TransactionSchema.omit({
	id: true,
	stamp: true,
});

export type TransactionCreateSchema = typeof TransactionCreateSchema;

export namespace TransactionCreateSchema {
	export type Type = z.infer<TransactionCreateSchema>;
}
