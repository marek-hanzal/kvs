import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withTransactionCreateMutation } from "~/app/transaction/mutation/withTransactionCreateMutation";
import { TransactionCreateForm } from "~/app/transaction/ui/TransactionCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/transaction/output")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale/transaction/output",
		});

		const mutation = withTransactionCreateMutation({
			mode: "output",
		}).useMutation({
			async onSuccess() {
				return navigate({
					to: "/$locale/transaction/list",
					params: {
						locale,
					},
				});
			},
		});

		return (
			<FormWrapper
				title={<Tx label="Create Output Transaction" />}
				hint={<Tx label="Record money going out of your account" />}
			>
				<TransactionCreateForm
					mutation={mutation}
					defaultValues={{
						amount: 0,
					}}
				/>
			</FormWrapper>
		);
	},
});
