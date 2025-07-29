import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { z } from "zod";
import { withTransactionPatchMutation } from "~/app/transaction/mutation/withTransactionPatchMutation";
import { withTransactionFetchQuery } from "~/app/transaction/query/withTransactionFetchQuery";
import { TransactionPatchForm } from "~/app/transaction/ui/TransactionPatchForm";

const searchSchema = z.object({
	mode: z.enum([
		"input",
		"output",
	]),
});

export const Route = createFileRoute("/$locale/transaction/$id/edit")({
	validateSearch: searchSchema,
	component() {
		const navigate = useNavigate();
		const { locale, id } = useParams({
			from: "/$locale/transaction/$id/edit",
		});

		const query = withTransactionFetchQuery();
		const { data: transaction } = query.useSuspenseQuery({
			id,
		});

		const mutation = withTransactionPatchMutation({
			id,
		}).useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/transaction/$id/view",
					params: {
						locale,
						id,
					},
				});
			},
		});

		return (
			<div className={"mx-auto w-1/2"}>
				<TransactionPatchForm
					transactionId={id}
					mutation={mutation}
					defaultValues={transaction}
				/>
			</div>
		);
	},
});
