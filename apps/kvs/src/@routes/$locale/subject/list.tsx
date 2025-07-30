import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { SubjectFilterSchema } from "~/app/subject/db/SubjectFilterSchema";
import type { SubjectSortSchema } from "~/app/subject/db/SubjectSortSchema";
import { withSubjectListQuery } from "~/app/subject/query/withSubjectListQuery";
import { SubjectTable } from "~/app/subject/ui/SubjectTable";

const { validateSearch } = withSourceSearchSchema<
	SubjectFilterSchema,
	SubjectSortSchema.Type
>({
	filter: SubjectFilterSchema,
	defaultSort: {
		name: "asc",
	},
});

export const Route = createFileRoute("/$locale/subject/list")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withSubjectListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const subjectListQuery = withSubjectListQuery();
		const {
			data: { list, count },
		} = subjectListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
		});
		const navigate = Route.useNavigate();

		return (
			<SubjectTable
				data={list}
				filter={{
					state: {
						value: filter,
						set: navigateOnFilter(navigate),
					},
				}}
				fulltext={{
					value: filter?.fulltext,
					set: navigateOnFulltext(filter?.fulltext, navigate),
				}}
				sort={{
					state: {
						value: sort,
						set: navigateOnSort(navigate),
					},
				}}
				cursor={{
					cursor,
					count,
					textTotal: <Tx label={"Subject count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
