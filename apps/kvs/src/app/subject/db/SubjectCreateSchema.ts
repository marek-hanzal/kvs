import type { z } from "zod";
import { SubjectSchema } from "~/app/subject/db/SubjectSchema";

export const SubjectCreateSchema = SubjectSchema.omit({
	id: true,
});

export type SubjectCreateSchema = typeof SubjectCreateSchema;

export namespace SubjectCreateSchema {
	export type Type = z.infer<SubjectCreateSchema>;
}
