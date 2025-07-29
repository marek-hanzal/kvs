import type { z } from "zod";
import { MacSchema } from "~/app/mac/db/MacSchema";

export const MacPatchSchema = MacSchema.omit({
	id: true,
	stamp: true,
});

export type MacPatchSchema = typeof MacPatchSchema;

export namespace MacPatchSchema {
	export type Type = z.infer<MacPatchSchema>;
}
