import { Table, Tx, withColumn } from "@use-pico/client";
import { DateTime } from "@use-pico/common";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { Toolbar } from "./TransactionTable/Toolbar";

export namespace TransactionTable {
	export interface Props extends Table.PropsEx<TransactionSchema.Type> {
		//
	}
}

const column = withColumn<TransactionSchema.Type>();

const columns = [
	column({
		name: "stamp",
		header: () => <Tx label="Date" />,
		render: ({ value }) => DateTime.fromISO(value).toLocaleString(),
		size: 8,
	}),
	column({
		name: "amount",
		header: () => <Tx label="Amount" />,
		render: ({ value }) => value.toFixed(2),
		size: 12,
	}),
];

export const TransactionTable: FC<TransactionTable.Props> = ({ ...props }) => {
	return (
		<Table
			columns={columns}
			toolbar={Toolbar}
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
