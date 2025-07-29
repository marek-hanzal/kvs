import { withMutation } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { TransactionPatchSchema } from "~/app/transaction/db/TransactionPatchSchema";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { withTransactionFetchQuery } from "~/app/transaction/query/withTransactionFetchQuery";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";
import { withTransactionSumQuery } from "~/app/transaction/query/withTransactionSumQuery";

export const withTransactionPatchMutation = ({ id }: IdentitySchema.Type) => {
	return withMutation<TransactionPatchSchema.Type, TransactionSchema.Type>({
		keys(data) {
			return [
				"transaction",
				"patch",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.updateTable("Transaction")
				.set(TransactionPatchSchema.parse(values))
				.where("id", "=", id)
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
            withTransactionSumQuery(),
			withTransactionFetchQuery(),
			withTransactionListQuery(),
		],
	});
};
