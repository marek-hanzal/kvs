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
		size: 12,
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
			{...props}
		/>
	);
};
