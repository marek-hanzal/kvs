import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { MacRecordFilterSchema } from "~/app/mac/db/MacRecordFilterSchema";
import { withMacRecordListQuery } from "~/app/mac/query/withMacRecordListQuery";
import { MacRecordTable } from "~/app/mac/ui/MacRecordTable";

const { validateSearch } = withSourceSearchSchema({
	filter: MacRecordFilterSchema,
	defaultSort: {
		cost: "desc",
	},
});

export const Route = createFileRoute("/$locale/mac/$id/view")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withMacRecordListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const { id } = Route.useParams();
		const macRecordListQuery = withMacRecordListQuery();
		const {
			data: { list, count },
		} = macRecordListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
			where: {
				macId: id,
			},
		});
		const navigate = Route.useNavigate();
		const setFilter = navigateOnFilter(navigate);

		return (
			<MacRecordTable
				data={list}
				filter={{
					state: {
						value: filter,
						set: setFilter,
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
					textTotal: <Tx label={"MAC Record count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
