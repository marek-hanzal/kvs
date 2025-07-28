import type { z } from "zod";
import { MvcRecordSchema } from "./MvcRecordSchema";

export const MvcRecordCreateSchema = MvcRecordSchema.omit({
	id: true,
	stamp: true,
});

export type MvcRecordCreateSchema = typeof MvcRecordCreateSchema;

export namespace MvcRecordCreateSchema {
	export type Type = z.infer<MvcRecordCreateSchema>;
}
