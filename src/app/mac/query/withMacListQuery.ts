import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { DateTime } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { MacFilterSchema } from "~/app/mac/db/MacFilterSchema";
import { MacSchema } from "~/app/mac/db/MacSchema";
import type { MacSortSchema } from "~/app/mac/db/MacSortSchema";

export const withMacListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: MacFilterSchema.Type;
			filter?: MacFilterSchema.Type;
			sort?: MacSortSchema.Type;
		},
		withListCount.Result<MacSchema.Type>
	>({
		keys(data) {
			return [
				"mac",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("Mac as m").selectAll(),
				output: MacSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("m.id", "=", where.id);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("m.id", "like", fulltext),
							]);
						});
					}

					// Handle accountToType enum values
					if (where?.accountToType) {
						const now = DateTime.utc();
						let accountToFrom: string | undefined;
						let accountToTo: string | undefined;

						switch (where.accountToType) {
							case "current-month": {
								accountToFrom = now.startOf("month").toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							case "last-month": {
								const lastMonth = now.minus({
									months: 1,
								});
								accountToFrom = lastMonth
									.startOf("month")
									.toSQL();
								accountToTo = lastMonth.endOf("month").toSQL();
								break;
							}
							case "last-three-months": {
								accountToFrom = now
									.minus({
										months: 2,
									})
									.startOf("month")
									.toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							case "last-half-year": {
								accountToFrom = now
									.minus({
										months: 5,
									})
									.startOf("month")
									.toSQL();
								accountToTo = now.endOf("month").toSQL();
								break;
							}
							default:
								// Fallback to manual date ranges if provided
								accountToFrom =
									where?.accountToFrom ?? undefined;
								accountToTo = where?.accountToTo ?? undefined;
						}

						if (accountToFrom) {
							$select = $select.where(
								"m.accountTo",
								">=",
								accountToFrom,
							);
						}
						if (accountToTo) {
							$select = $select.where(
								"m.accountTo",
								"<=",
								accountToTo,
							);
						}
					} else {
						// Fallback to manual date ranges if no accountToType is specified
						if (where?.accountToFrom) {
							$select = $select.where(
								"m.accountTo",
								">=",
								where.accountToFrom,
							);
						}

						if (where?.accountToTo) {
							$select = $select.where(
								"m.accountTo",
								"<=",
								where.accountToTo,
							);
						}
					}

					if (sort) {
						if (sort.stamp) {
							$select = $select.orderBy("m.stamp", sort.stamp);
						}
						if (sort.accountTo) {
							$select = $select.orderBy(
								"m.accountTo",
								sort.accountTo,
							);
						}
					}

					return $select;
				},
			});
		},
	});
};
