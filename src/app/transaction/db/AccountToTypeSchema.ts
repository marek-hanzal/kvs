import { z } from "zod";

export const AccountToTypeSchema = z.enum([
	"current-month",
	"last-month",
	"last-three-months",
	"last-half-year",
]);

export type AccountToTypeSchema = typeof AccountToTypeSchema;

export namespace AccountToTypeSchema {
	export type Type = z.infer<AccountToTypeSchema>;
}
