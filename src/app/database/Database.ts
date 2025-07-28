import type { MvcRecordSchema } from "~/app/moving-average-cost/db/MvcRecordSchema";

export interface Database {
	MvaRecord: MvcRecordSchema.Type;
}
