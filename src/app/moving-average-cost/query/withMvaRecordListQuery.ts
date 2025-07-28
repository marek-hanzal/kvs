import { withListCount, withQuery } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";
import { MvaRecordSchema } from "../db/MvaRecordSchema";

export namespace withMvaRecordListQuery {
	export interface Props
		extends withQuery.PropsEx<any, MvaRecordSchema.Type> {
		//
	}
}

export const withMvaRecordListQuery = ({
	data,
}: withMvaRecordListQuery.Props) => {
	return withQuery({
		data,
		keys(data) {
			return [
				"mva-record",
				"list",
				data,
			];
		},
		async queryFn(data) {
			return withListCount({
				select: kysely.selectFrom("MvaRecord").selectAll(),
				output: MvaRecordSchema,
			});
		},
	});
};
