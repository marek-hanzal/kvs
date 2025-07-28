import { IdentitySchema } from "@use-pico/common";
import z from "zod";

export const MvaItemSchema = z.object({
	...IdentitySchema.shape,
	mvaRecordId: z.string(),
});

export type MvaItemSchema = typeof MvaItemSchema;

export namespace MvaItemSchema {
	export type Type = z.infer<MvaItemSchema>;
}
