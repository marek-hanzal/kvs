import type { z } from "zod";
import { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";

export const MacRecordCreateSchema = MacRecordSchema.omit({
	id: true,
});

export type MacRecordCreateSchema = typeof MacRecordCreateSchema;

export namespace MacRecordCreateSchema {
	export type Type = z.infer<MacRecordCreateSchema>;
}
