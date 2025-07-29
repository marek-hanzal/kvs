import { DateTime, IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const MacSchema = z.object({
	...IdentitySchema.shape,
	stamp: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
	accountTo: z.string().transform((val) => {
		return String(DateTime.fromSQL(val).toISO());
	}),
});

export type MacSchema = typeof MacSchema;

export namespace MacSchema {
	export type Type = z.infer<MacSchema>;
}
