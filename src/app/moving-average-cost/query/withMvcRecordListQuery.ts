import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { MvcRecordFilterSchema } from "~/app/moving-average-cost/db/MvcRecordFilterSchema";
import type { MvcRecordSortSchema } from "~/app/moving-average-cost/db/MvcRecordSortSchema";
import { MvcRecordSchema } from "../db/MvcRecordSchema";

export namespace withMvcRecordListQuery {
	export interface Props
		extends withQuery.PropsEx<
			{
				cursor?: CursorSchema.Type;
				where?: MvcRecordFilterSchema.Type;
				filter?: MvcRecordFilterSchema.Type;
				sort?: MvcRecordSortSchema.Type;
			},
			MvcRecordSchema.Type
		> {
		//
	}
}

export const withMvcRecordListQuery = ({
	data,
}: withMvcRecordListQuery.Props) => {
	return withQuery({
		data,
		keys(data) {
			return [
				"mvc-record",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("MvcRecord as mr").selectAll(),
				output: MvcRecordSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("mr.id", "=", where.id);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("mr.id", "like", fulltext),
								eb("mr.name", "like", fulltext),
							]);
						});
					}

					if (sort) {
						if (sort.stamp) {
							$select = $select.orderBy("mr.stamp", sort.stamp);
						}
						if (sort.name) {
							$select = $select.orderBy("mr.name", sort.name);
						}
						if (sort.amount) {
							$select = $select.orderBy("mr.amount", sort.amount);
						}
						if (sort.cost) {
							$select = $select.orderBy("mr.cost", sort.cost);
						}
						if (sort.gross) {
							$select = $select.orderBy("mr.gross", sort.gross);
						}
					}

					return $select;
				},
			});
		},
	});
};
