import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { withTransactionCreateMutation } from "~/app/transaction/mutation/withTransactionCreateMutation";
import { TransactionCreateForm } from "~/app/transaction/ui/TransactionCreateForm";
import { FormWrapper } from "~/app/ui/FormWrapper";

export const Route = createFileRoute("/$locale/transaction/input")({
	component() {
		const navigate = useNavigate();
		const { locale } = useParams({
			from: "/$locale/transaction/input",
		});

		const mutation = withTransactionCreateMutation({
			mode: "input",
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
				title={<Tx label="Create Input Transaction" />}
				hint={<Tx label="Record money coming into your account" />}
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
