import type { z } from "zod";
import { TransactionSchema } from "~/app/transaction/db/TransactionSchema";

export const TransactionPatchSchema = TransactionSchema.omit({
	id: true,
	stamp: true,
});

export type TransactionPatchSchema = typeof TransactionPatchSchema;

export namespace TransactionPatchSchema {
	export type Type = z.infer<TransactionPatchSchema>;
}
