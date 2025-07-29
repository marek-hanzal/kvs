import { createFileRoute } from "@tanstack/react-router";
import {
	Button,
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSort,
	Tx,
	withSourceSearchSchema,
} from "@use-pico/client";
import type { FC } from "react";
import type { AccountToTypeSchema } from "~/app/transaction/db/AccountToTypeSchema";
import { TransactionFilterSchema } from "~/app/transaction/db/TransactionFilterSchema";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";
import { TransactionTable } from "~/app/transaction/ui/TransactionTable";

const { validateSearch } = withSourceSearchSchema({
	filter: TransactionFilterSchema,
	defaultSort: {
		accountTo: "desc",
	},
});

// Custom toolbar component for range buttons
const RangeToolbar: FC<{
	filter: TransactionFilterSchema.Type | undefined;
	setFilter: (filter: TransactionFilterSchema.Type) => void;
}> = ({ filter, setFilter }) => {
	const handleRangeClick = (accountToType: AccountToTypeSchema.Type) => {
		setFilter({
			...filter,
			accountToType,
		});
	};

	return (
		<>
			<Button
				variant={{
					size: "sm",
					variant:
						filter?.accountToType === "current-month"
							? "primary"
							: "light",
				}}
				onClick={() => handleRangeClick("current-month")}
			>
				<Tx label="Current month" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						filter?.accountToType === "last-month"
							? "primary"
							: "light",
				}}
				onClick={() => handleRangeClick("last-month")}
			>
				<Tx label="Last month" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						filter?.accountToType === "last-three-months"
							? "primary"
							: "light",
				}}
				onClick={() => handleRangeClick("last-three-months")}
			>
				<Tx label="Last three months" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						filter?.accountToType === "last-half-year"
							? "primary"
							: "light",
				}}
				onClick={() => handleRangeClick("last-half-year")}
			>
				<Tx label="Last half a year" />
			</Button>
		</>
	);
};

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

		return (
			<TransactionTable
				toolbar={() => (
					<RangeToolbar
						filter={filter}
						setFilter={setFilter}
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
