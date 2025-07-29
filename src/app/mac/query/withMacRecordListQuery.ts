import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { MacRecordFilterSchema } from "~/app/mac/db/MacRecordFilterSchema";
import { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";
import type { MacRecordSortSchema } from "~/app/mac/db/MacRecordSortSchema";

export const withMacRecordListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: MacRecordFilterSchema.Type;
			filter?: MacRecordFilterSchema.Type;
			sort?: MacRecordSortSchema.Type;
		},
		withListCount.Result<MacRecordSchema.Type>
	>({
		keys(data) {
			return [
				"macRecord",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("MacRecord as mr").selectAll(),
				output: MacRecordSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("mr.id", "=", where.id);
					}

					if (where?.name) {
						$select = $select.where("mr.name", "=", where.name);
					}

					if (where?.inventoryItemId) {
						$select = $select.where(
							"mr.inventoryItemId",
							"=",
							where.inventoryItemId,
						);
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
						if (sort.id) {
							$select = $select.orderBy("mr.id", sort.id);
						}
						if (sort.name) {
							$select = $select.orderBy("mr.name", sort.name);
						}
						if (sort.inventoryItemId) {
							$select = $select.orderBy(
								"mr.inventoryItemId",
								sort.inventoryItemId,
							);
						}
						if (sort.cost) {
							$select = $select.orderBy("mr.cost", sort.cost);
						}
					}

					return $select;
				},
			});
		},
	});
};
