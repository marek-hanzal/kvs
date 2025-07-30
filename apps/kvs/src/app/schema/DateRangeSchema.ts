import { z } from "zod";

export const DateRangeSchema = z.enum([
	"current-month",
	"last-month",
	"last-three-months",
	"last-half-year",
]);

export type DateRangeSchema = typeof DateRangeSchema;

export namespace DateRangeSchema {
	export type Type = z.infer<DateRangeSchema>;
}
