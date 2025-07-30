import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { MacFilterSchema } from "~/app/mac/db/MacFilterSchema";
import { withMacListQuery } from "~/app/mac/query/withMacListQuery";
import { MacTable } from "~/app/mac/ui/MacTable";

const { validateSearch } = withSourceSearchSchema({
	filter: MacFilterSchema,
	defaultSort: {
		accountTo: "desc",
	},
});

export const Route = createFileRoute("/$locale/mac/list")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withMacListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const macListQuery = withMacListQuery();
		const {
			data: { list, count },
		} = macListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
		});
		const navigate = Route.useNavigate();
		const setFilter = navigateOnFilter(navigate);

		return (
			<MacTable
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
					textTotal: <Tx label={"MAC count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
