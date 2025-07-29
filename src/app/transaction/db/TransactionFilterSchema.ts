import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { DateRangeSchema } from "~/app/schema/DateRangeSchema";

export const TransactionFilterSchema = z.object({
	...FilterSchema.shape,
	accountToFrom: z.string().nullish(),
	accountToTo: z.string().nullish(),
	accountToType: DateRangeSchema.optional(),
});

export type TransactionFilterSchema = typeof TransactionFilterSchema;

export namespace TransactionFilterSchema {
	export type Type = z.infer<TransactionFilterSchema>;
}
