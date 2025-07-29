import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const PeriodSchema = z.object({
	...IdentitySchema.shape,
	stamp: z.string(),
});

export type PeriodSchema = typeof PeriodSchema;

export namespace PeriodSchema {
	export type Type = z.infer<PeriodSchema>;
}
