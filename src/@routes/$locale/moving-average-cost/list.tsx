import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { MvcRecordFilterSchema } from "~/app/moving-average-cost/db/MvcRecordFilterSchema";
import { withMvcRecordListQuery } from "~/app/moving-average-cost/query/withMvcRecordListQuery";
import { MvcTable } from "~/app/moving-average-cost/ui/MvcTable";

const { validateSearch } = withSourceSearchSchema({
	filter: MvcRecordFilterSchema,
	defaultSort: {
		stamp: "asc",
	},
});

export const Route = createFileRoute("/$locale/moving-average-cost/list")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withMvcRecordListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const mvcRecordListQuery = withMvcRecordListQuery();
		const {
			data: { list, count },
		} = mvcRecordListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
		});
		const navigate = Route.useNavigate();

		return (
			<MvcTable
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
					textTotal: <Tx label={"MVC Record count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
