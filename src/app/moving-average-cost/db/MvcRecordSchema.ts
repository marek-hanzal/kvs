import { DateTime, IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const MvcRecordSchema = z.object({
	...IdentitySchema.shape,
	/**
	 * When this record was created, usually one per month per type
	 */
	stamp: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	/**
	 * Name of the resource produced, e.g. pure salt
	 */
	name: z.string().min(1),
	/**
	 * Amount produced; decimal with two decimal points
	 */
	amount: z.number().positive(),
	/**
	 * The company runtime cost, decimal with two decimal points
	 */
	cost: z.number().positive(),
	/**
	 * The cost per unit of produced resource, decimal with two decimal points
	 */
	gross: z.number().positive(),
});

export type MvcRecordSchema = typeof MvcRecordSchema;

export namespace MvcRecordSchema {
	export type Type = z.infer<MvcRecordSchema>;
}
