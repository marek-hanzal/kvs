import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import { TransactionFilterSchema } from "~/app/transaction/db/TransactionFilterSchema";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";
import { TransactionTable } from "~/app/transaction/ui/TransactionTable";

const { validateSearch } = withSourceSearchSchema({
	filter: TransactionFilterSchema,
	defaultSort: {
		stamp: "desc",
	},
});

export const Route = createFileRoute("/$locale/transaction/list")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor, sort } }) => ({
		filter,
		cursor,
		sort,
	}),
	async loader({ context: { queryClient }, deps }) {
		await withTransactionListQuery().prefetch(queryClient, deps);
	},
	component() {
		const { filter, cursor, sort } = Route.useSearch();
		const transactionListQuery = withTransactionListQuery();
		const {
			data: { list, count },
		} = transactionListQuery.useSuspenseQuery({
			cursor,
			filter,
			sort,
		});
		const navigate = Route.useNavigate();

		return (
			<TransactionTable
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
					textTotal: <Tx label={"Transaction count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
