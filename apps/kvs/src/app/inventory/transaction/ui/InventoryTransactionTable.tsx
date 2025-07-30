import { Table, Tx, withColumn } from "@use-pico/client";
import { DateTime } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";

export namespace InventoryTransactionTable {
	export interface Props
		extends Table.PropsEx<InventoryTransactionSchema.Type> {
		//
	}
}

const column = withColumn<InventoryTransactionSchema.Type>();

const columns = [
	column({
		name: "stamp",
		header: () => <Tx label="Date" />,
		render: ({ value }) => DateTime.fromISO(value).toLocaleString(),
		size: 8,
	}),
	column({
		name: "accountTo",
		header: () => <Tx label="Account To" />,
		render: ({ value }) =>
			DateTime.fromISO(value).toLocaleString({
				year: "numeric",
				month: "long",
			}),
		size: 8,
	}),
	column({
		name: "amount",
		header: () => <Tx label="Amount" />,
		render: ({ value }) => value.toFixed(2),
		size: 12,
	}),
	column({
		name: "note",
		header: () => <Tx label="Note" />,
		render: ({ data }) => data.note || "-",
		size: 24,
	}),
];

export const InventoryTransactionTable: FC<InventoryTransactionTable.Props> = ({
	...props
}) => {
	return (
		<Table
			columns={columns}
			row={{
				css({ data }) {
					if (data.amount > 0) {
						return [
							"bg-green-50",
							"odd:bg-green-100",
						];
					} else if (data.amount < 0) {
						return [
							"bg-red-50",
							"odd:bg-red-100",
						];
					}

					return [];
				},
			}}
			{...props}
		/>
	);
};
