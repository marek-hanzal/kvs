import type { MvaItemSchema } from "~/app/moving-average-cost/db/MvaItemSchema";
import type { MvaRecordSchema } from "~/app/moving-average-cost/db/MvaRecordSchema";

export interface Database {
	MvaRecord: MvaRecordSchema.Type;
	MvaItem: MvaItemSchema.Type;
}
