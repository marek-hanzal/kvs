import { IdentitySchema } from "@use-pico/common";
import z from "zod";

export const MvaItemSchema = z.object({
	...IdentitySchema.shape,
	/**
	 * Reference to the parent MvaRecord
	 */
	mvaRecordId: z.string(),
	/**
	 * Automatic datetime when this record was created; used only for sorting
	 */
	stamp: z.iso.datetime(),
	/**
	 * Name of item contributing to mva record
	 */
	name: z.string().min(1),
	/**
	 * Amount used to calculate sum of costs (e.g. electricity)
	 */
	cost: z.number().positive(),
});

export type MvaItemSchema = typeof MvaItemSchema;

export namespace MvaItemSchema {
	export type Type = z.infer<MvaItemSchema>;
}
