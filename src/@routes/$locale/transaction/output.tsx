import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { withTransactionCreateMutation } from "~/app/transaction/mutation/withTransactionCreateMutation";
import { TransactionCreateForm } from "~/app/transaction/ui/TransactionCreateForm";

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
			<div className={"mx-auto w-1/2"}>
				<TransactionCreateForm
					mutation={mutation}
					defaultValues={{
						amount: 0,
					}}
				/>
			</div>
		);
	},
});
