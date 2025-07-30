import { withListCount, withQuery } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { SubjectFilterSchema } from "~/app/subject/db/SubjectFilterSchema";
import { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import type { SubjectSortSchema } from "~/app/subject/db/SubjectSortSchema";

export const withSubjectListQuery = () => {
	return withQuery<
		{
			cursor?: CursorSchema.Type;
			where?: SubjectFilterSchema.Type;
			filter?: SubjectFilterSchema.Type;
			sort?: SubjectSortSchema.Type;
		},
		withListCount.Result<SubjectSchema.Type>
	>({
		keys(data) {
			return [
				"subject",
				"list",
				data,
			];
		},
		async queryFn({ cursor, where, filter, sort }) {
			return withListCount({
				select: kysely.selectFrom("Subject as s").selectAll(),
				output: SubjectSchema,
				cursor,
				where,
				filter,
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("s.id", "=", where.id);
					}

					if (where?.idIn) {
						$select = $select.where("s.id", "in", where.idIn);
					}

					if (where?.name) {
						$select = $select.where(
							"s.name",
							"like",
							`%${where.name}%`,
						);
					}

					if (where?.vat) {
						$select = $select.where(
							"s.vat",
							"like",
							`%${where.vat}%`,
						);
					}

					if (where?.city) {
						$select = $select.where(
							"s.city",
							"like",
							`%${where.city}%`,
						);
					}

					if (where?.zip) {
						$select = $select.where(
							"s.zip",
							"like",
							`%${where.zip}%`,
						);
					}

					if (where?.fulltext) {
						const fulltext = `%${where.fulltext}%`.toLowerCase();
						$select = $select.where((eb) => {
							return eb.or([
								eb("s.id", "like", fulltext),
								eb("s.name", "like", fulltext),
								eb("s.vat", "like", fulltext),
								eb("s.street", "like", fulltext),
								eb("s.city", "like", fulltext),
								eb("s.zip", "like", fulltext),
							]);
						});
					}

					if (sort) {
						if (sort.name) {
							$select = $select.orderBy("s.name", sort.name);
						}
						if (sort.vat) {
							$select = $select.orderBy("s.vat", sort.vat);
						}
						if (sort.city) {
							$select = $select.orderBy("s.city", sort.city);
						}
					}

					return $select;
				},
			});
		},
	});
};
