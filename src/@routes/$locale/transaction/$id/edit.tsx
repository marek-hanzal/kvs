import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { z } from "zod";
import { withTransactionPatchMutation } from "~/app/transaction/mutation/withTransactionPatchMutation";
import { withTransactionFetchQuery } from "~/app/transaction/query/withTransactionFetchQuery";
import { TransactionPatchForm } from "~/app/transaction/ui/TransactionPatchForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

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
			<FormWrapper
				title={<Tx label="Edit Transaction" />}
				hint={<Tx label="Update the transaction details" />}
			>
				<TransactionPatchForm
					transactionId={id}
					mutation={mutation}
					defaultValues={transaction}
				/>
			</FormWrapper>
		);
	},
});
