import { IdentitySchema } from "@use-pico/common";
import z from "zod";

export const ExpensePeriodSchema = z.object({
	...IdentitySchema.shape,
	/**
	 * Reference to the expense record
	 */
	expenseId: z.string().uuid(),
	/**
	 * Reference to the period record
	 */
	periodId: z.string().uuid(),
});

export type ExpensePeriodSchema = typeof ExpensePeriodSchema;

export namespace ExpensePeriodSchema {
	export type Type = z.infer<ExpensePeriodSchema>;
}
