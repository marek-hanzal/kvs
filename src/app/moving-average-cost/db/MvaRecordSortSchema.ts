import { z } from "zod";

export const MvaRecordSortSchema = z.object({
	stamp: z
		.enum([
			"asc",
			"desc",
		])
		.optional(),
	name: z
		.enum([
			"asc",
			"desc",
		])
		.optional(),
	amount: z
		.enum([
			"asc",
			"desc",
		])
		.optional(),
	cost: z
		.enum([
			"asc",
			"desc",
		])
		.optional(),
	gross: z
		.enum([
			"asc",
			"desc",
		])
		.optional(),
});

export type MvaRecordSortSchema = typeof MvaRecordSortSchema;

export namespace MvaRecordSortSchema {
	export type Type = z.infer<MvaRecordSortSchema>;
}
