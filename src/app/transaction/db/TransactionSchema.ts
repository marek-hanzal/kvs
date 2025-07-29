import { DateTime, IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const TransactionSchema = z.object({
	...IdentitySchema.shape,
	stamp: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	amount: z.number(),
});

export type TransactionSchema = typeof TransactionSchema;

export namespace TransactionSchema {
	export type Type = z.infer<TransactionSchema>;
}
