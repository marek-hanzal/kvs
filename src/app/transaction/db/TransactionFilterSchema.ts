import { DateTime, FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const TransactionFilterSchema = z.object({
	...FilterSchema.shape,
	accountToFrom: z
		.string()
		.transform((val) => {
			return String(DateTime.fromSQL(val).toISO());
		})
		.nullish(),
	accountToTo: z
		.string()
		.transform((val) => {
			return String(DateTime.fromSQL(val).toISO());
		})
		.nullish(),
});

export type TransactionFilterSchema = typeof TransactionFilterSchema;

export namespace TransactionFilterSchema {
	export type Type = z.infer<TransactionFilterSchema>;
}
