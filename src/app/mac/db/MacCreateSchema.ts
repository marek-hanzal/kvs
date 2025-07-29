import type { z } from "zod";
import { MacSchema } from "~/app/mac/db/MacSchema";

export const MacCreateSchema = MacSchema.omit({
	id: true,
	stamp: true,
});

export type MacCreateSchema = typeof MacCreateSchema;

export namespace MacCreateSchema {
	export type Type = z.infer<MacCreateSchema>;
}
