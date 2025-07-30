import type { z } from "zod";
import { SubjectSchema } from "~/app/subject/db/SubjectSchema";

export const SubjectPatchSchema = SubjectSchema.omit({
	id: true,
});

export type SubjectPatchSchema = typeof SubjectPatchSchema;

export namespace SubjectPatchSchema {
	export type Type = z.infer<SubjectPatchSchema>;
}
