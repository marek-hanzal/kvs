import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { TransactionCreateSchema } from "~/app/transaction/db/TransactionCreateSchema";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";
import { withTransactionSumQuery } from "~/app/transaction/query/withTransactionSumQuery";

export namespace withTransactionCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			TransactionCreateSchema.Type,
			TransactionSchema.Type
		> {
		mode: "input" | "output";
	}
}

export const withTransactionCreateMutation = ({
	mode,
}: withTransactionCreateMutation.Props) => {
	return withMutation<TransactionCreateSchema.Type, TransactionSchema.Type>({
		keys(data) {
			return [
				"transaction",
				"create",
				data,
			];
		},
		async mutationFn({ amount, accountTo, ...values }) {
			return kysely
				.insertInto("Transaction")
				.values({
					id: genId(),
					stamp: DateTime.utc().toSQL(),
					...TransactionCreateSchema.parse({
						amount: mode === "input" ? amount : -amount,
						accountTo,
						...values,
					}),
					/**
					 * This one must be extra, because schema is formatting it in an
					 * incorrect way.
					 */
					accountTo: String(
						DateTime.fromISO(`${accountTo}-01`).toUTC().toSQL(),
					),
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withTransactionSumQuery(),
			withTransactionListQuery(),
		],
	});
};
