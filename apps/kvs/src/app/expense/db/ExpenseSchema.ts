import { DateTime, IdentitySchema } from "@use-pico/common";
import z from "zod";

export const ExpenseSchema = z.object({
	...IdentitySchema.shape,
	/**
	 * Automatic datetime when this record was created; used only for sorting
	 */
	stamp: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	/**
	 * Name of item contributing to expense record
	 */
	name: z.string().min(1),
	/**
	 * Amount used to calculate sum of costs (e.g. electricity)
	 */
	cost: z.number().positive(),
});

export type ExpenseSchema = typeof ExpenseSchema;

export namespace ExpenseSchema {
	export type Type = z.infer<ExpenseSchema>;
}
