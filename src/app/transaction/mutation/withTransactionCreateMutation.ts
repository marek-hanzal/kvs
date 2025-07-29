import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { TransactionCreateSchema } from "~/app/transaction/db/TransactionCreateSchema";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";

export namespace withTransactionCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			TransactionCreateSchema.Type,
			TransactionSchema.Type
		> {
		//
	}
}

export const withTransactionCreateMutation = () => {
	return withMutation<TransactionCreateSchema.Type, TransactionSchema.Type>({
		keys(data) {
			return [
				"transaction",
				"create",
				data,
			];
		},
		async mutationFn(values) {
			return kysely
				.insertInto("Transaction")
				.values({
					id: genId(),
					stamp: DateTime.now().toUTC().toSQLTime(),
					...values,
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withTransactionListQuery(),
		],
	});
};
