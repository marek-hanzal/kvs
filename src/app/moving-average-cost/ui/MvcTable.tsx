import { Table, Tx, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { MvcRecordSchema } from "~/app/moving-average-cost/db/MvcRecordSchema";
import { Toolbar } from "~/app/moving-average-cost/ui/MvcTable/Toolbar";

export namespace MvcTable {
	export interface Props extends Table.PropsEx<MvcRecordSchema.Type> {
		//
	}
}

const column = withColumn<MvcRecordSchema.Type>();

const columns = [
	column({
		name: "stamp",
		header: () => <Tx label="Date" />,
		render: ({ data }) => new Date(data.stamp).toLocaleDateString(),
		size: 12,
	}),
	column({
		name: "name",
		header: () => <Tx label="Resource Name" />,
		render: ({ data }) => data.name,
		size: 18,
	}),
	column({
		name: "amount",
		header: () => <Tx label="Amount Produced" />,
		render: ({ data }) => data.amount.toFixed(2),
		size: 12,
	}),
	column({
		name: "cost",
		header: () => <Tx label="Total Cost" />,
		render: ({ data }) => data.cost.toFixed(2),
		size: 12,
	}),
	column({
		name: "gross",
		header: () => <Tx label="Cost per Unit" />,
		render: ({ data }) => data.gross.toFixed(2),
		size: "auto",
	}),
];

export const MvcTable: FC<MvcTable.Props> = ({ ...props }) => {
	return (
		<Table
			columns={columns}
			toolbar={Toolbar}
			{...props}
		/>
	);
};
