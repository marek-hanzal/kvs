import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { MvaRecordFilterSchema } from "~/app/moving-average-cost/db/MvaRecordFilterSchema";
import { withMvaRecordListQuery } from "~/app/moving-average-cost/query/withMvaRecordListQuery";
import { MvaTable } from "~/app/moving-average-cost/ui/MvaTable";

const { validateSearch } = withSourceSearchSchema({
	filter: MvaRecordFilterSchema,
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
		await withMvaRecordListQuery({
			data: deps,
		}).prefetch(queryClient);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const mvaRecordListQuery = withMvaRecordListQuery({
			data: {
				cursor,
				filter,
				sort,
			},
		});
		const {
			data: { list, count },
		} = mvaRecordListQuery.useSuspenseQuery();
		const navigate = Route.useNavigate();

		return (
			<MvaTable
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
					textTotal: <Tx label={"MVA Record count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
