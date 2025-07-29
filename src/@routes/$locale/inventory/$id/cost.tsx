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
import { DateRangeToolbar } from "~/app/ui/DateRangeToolbar";

const { validateSearch } = withSourceSearchSchema({
	filter: TransactionFilterSchema,
	defaultSort: {
		accountTo: "desc",
	},
});

export const Route = createFileRoute("/$locale/inventory/$id/cost")({
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
		const setFilter = navigateOnFilter(navigate);

		const handleRangeClick = (accountToType: string) => {
			setFilter({
				...filter,
				accountToType,
			});
		};

		return (
			<TransactionTable
				toolbar={() => (
					<DateRangeToolbar
						accountToType={filter?.accountToType}
						onRangeClick={handleRangeClick}
					/>
				)}
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
					textTotal: <Tx label={"Transaction count"} />,
					...navigateOnCursor(navigate),
				}}
			/>
		);
	},
});
