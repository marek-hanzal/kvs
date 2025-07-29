import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { MacCreateSchema } from "~/app/mac/db/MacCreateSchema";
import { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { withMacListQuery } from "~/app/mac/query/withMacListQuery";

export const withMacCreateMutation = () => {
	return withMutation<MacCreateSchema.Type, MacSchema.Type>({
		keys(data) {
			return [
				"mac",
				"create",
				data,
			];
		},
		async mutationFn({
			accountTo,
			inventoryItemIds,
			transactionIds,
			...values
		}) {
			return kysely.transaction().execute(async (trx) => {
				const { amount } = await trx
					.selectFrom("Transaction")
					.select((eb) => eb.fn.sum<number>("amount").as("amount"))
					.where("id", "in", transactionIds)
					.executeTakeFirstOrThrow();

				const inventoryTransactions = await trx
					.selectFrom("InventoryTransaction")
					.innerJoin(
						"InventoryItem",
						"InventoryItem.id",
						"InventoryTransaction.inventoryItemId",
					)
					.select([
						"inventoryItemId",
						"InventoryItem.name",
						(eb) => eb.fn.sum<number>("amount").as("amount"),
					])
					.where("inventoryItemId", "in", inventoryItemIds)
					/**
					 * We've to pick produced goods for MAC computation
					 */
					.where("amount", ">", 0)
					.where(
						"accountTo",
						">=",
						String(
							DateTime.fromISO(`${accountTo}-01`)
								.startOf("month")
								.toUTC()
								.toSQL(),
						),
					)
					.where(
						"accountTo",
						"<=",
						String(
							DateTime.fromISO(`${accountTo}-01`)
								.endOf("month")
								.toUTC()
								.toSQL(),
						),
					)
					.groupBy([
						"inventoryItemId",
						"InventoryItem.name",
					])
					.execute();

				const quantity = inventoryTransactions.reduce(
					(sum, item) => sum + item.amount,
					0,
				);

				const costs = inventoryTransactions.map((item) => ({
					...item,
					cost:
						quantity > 0
							? (amount * -1 * (item.amount / quantity)) /
								item.amount
							: 0,
				}));

				const mac = await trx
					.insertInto("Mac")
					.values({
						id: genId(),
						stamp: DateTime.utc().toSQL(),
						...MacCreateSchema.omit({
							accountTo: true,
							inventoryItemIds: true,
							transactionIds: true,
						}).parse({
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

				await trx
					.insertInto("MacRecord")
					.values(
						MacRecordSchema.array().parse(
							costs.map((cost) => ({
								id: genId(),
								macId: mac.id,
								...cost,
							})),
						),
					)
					.execute();

				return mac;
			});
		},
		invalidate: [
			withMacFetchQuery(),
			withMacListQuery(),
		],
	});
};
