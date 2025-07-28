import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const MvaRecordSchema = z.object({
	...IdentitySchema.shape,
	//
});

export type MvaRecordSchema = typeof MvaRecordSchema;

export namespace MvaRecordSchema {
	export type Type = z.infer<MvaRecordSchema>;
}
