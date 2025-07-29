import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { InventoryTransactionCreateSchema } from "~/app/inventory/transaction/db/InventoryTransactionCreateSchema";
import type { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";
import { withInventoryTransactionListQuery } from "~/app/inventory/transaction/query/withInventoryTransactionListQuery";

export namespace withInventoryTransactionCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			InventoryTransactionCreateSchema.Type,
			InventoryTransactionSchema.Type
		> {
		mode: "input" | "output";
	}
}

export const withInventoryTransactionCreateMutation = ({
	mode,
}: withInventoryTransactionCreateMutation.Props) => {
	return withMutation<
		InventoryTransactionCreateSchema.Type,
		InventoryTransactionSchema.Type
	>({
		keys(data) {
			return [
				"inventory-transaction",
				"create",
				data,
			];
		},
		async mutationFn({ amount, ...values }) {
			return kysely
				.insertInto("InventoryTransaction")
				.values({
					id: genId(),
					stamp: DateTime.now().toUTC().toSQLTime(),
					amount: mode === "input" ? amount : -amount,
					...values,
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withInventoryTransactionListQuery(),
		],
	});
};
