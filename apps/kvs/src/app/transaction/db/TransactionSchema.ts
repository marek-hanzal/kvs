import { DateTime, IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const TransactionSchema = z.object({
	...IdentitySchema.shape,
	stamp: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	accountTo: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	amount: z.number(),
	/**
	 * Account in Moving Average Cost
	 */
	mac: z
		.number()
		.int()
		.refine((val) => val === 0 || val === 1),
	note: z.string().nullish(),
});

export type TransactionSchema = typeof TransactionSchema;

export namespace TransactionSchema {
	export type Type = z.infer<TransactionSchema>;
}
