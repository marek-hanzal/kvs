import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withTransactionFetchQuery } from "~/app/transaction/query/withTransactionFetchQuery";
import { IndexMenu } from "~/app/transaction/ui/IndexMenu";
import { TransactionPreview } from "~/app/transaction/ui/TransactionPreview";
import { usePageTva } from "~/app/ui/usePageTva";

export const Route = createFileRoute("/$locale/transaction/$id")({
	async loader({ context: { queryClient }, params }) {
		await withTransactionFetchQuery().prefetch(queryClient, params);
	},
	component() {
		const { id } = Route.useParams();
		const tva = usePageTva();
		const { slots } = tva({});
		const transactionFetchQuery = withTransactionFetchQuery();
		const { data } = transactionFetchQuery.useSuspenseQuery({
			id,
		});

		return (
			<div className={slots.base()}>
				<TransactionPreview entity={data} />

				<IndexMenu entity={data} />

				<Outlet />
			</div>
		);
	},
});
