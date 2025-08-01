import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { InventoryTransactionCreateSchema } from "~/app/inventory/transaction/db/InventoryTransactionCreateSchema";
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
		async mutationFn({ amount, accountTo, ...values }) {
			return kysely
				.insertInto("InventoryTransaction")
				.values({
					id: genId(),
					stamp: DateTime.utc().toSQL(),
					...InventoryTransactionCreateSchema.parse({
						amount: mode === "input" ? amount : -amount,
						accountTo,
						...values,
					}),
					/**
					 * This one must be extra, because schema is formatting it in an
					 * incorrect way.
					 */
					accountTo: String(
						DateTime.fromISO(`${accountTo}-01`)
							.endOf("month")
							.toUTC()
							.toSQL(),
					),
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withInventoryTransactionListQuery(),
		],
	});
};
