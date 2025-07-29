import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { AccountToTypeSchema } from "./AccountToTypeSchema";

export const TransactionFilterSchema = z.object({
	...FilterSchema.shape,
	accountToFrom: z.string().nullish(),
	accountToTo: z.string().nullish(),
	accountToType: AccountToTypeSchema.optional(),
});

export type TransactionFilterSchema = typeof TransactionFilterSchema;

export namespace TransactionFilterSchema {
	export type Type = z.infer<TransactionFilterSchema>;
}
