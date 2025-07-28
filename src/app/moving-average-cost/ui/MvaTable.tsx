import { Table, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { MvaRecordSchema } from "~/app/moving-average-cost/db/MvaRecordSchema";

export namespace MvaTable {
	export interface Props extends Table.PropsEx<MvaRecordSchema.Type> {
		//
	}
}

const column = withColumn<MvaRecordSchema.Type>();

const columns = [
	column({
		name: "id",
		header: () => "ID",
		render: ({ data }) => data.id,
		size: 80,
	}),
	column({
		name: "stamp",
		header: () => "Date",
		render: ({ data }) => new Date(data.stamp).toLocaleDateString(),
		size: 120,
	}),
	column({
		name: "name",
		header: () => "Resource Name",
		render: ({ data }) => data.name,
		size: 200,
	}),
	column({
		name: "amount",
		header: () => "Amount Produced",
		render: ({ data }) => data.amount.toFixed(2),
		size: 150,
	}),
	column({
		name: "cost",
		header: () => "Total Cost",
		render: ({ data }) => data.cost.toFixed(2),
		size: 150,
	}),
	column({
		name: "gross",
		header: () => "Cost per Unit",
		render: ({ data }) => data.gross.toFixed(2),
		size: 150,
	}),
];

export const MvaTable: FC<MvaTable.Props> = ({ ...props }) => {
	return (
		<Table
			columns={columns}
			{...props}
		/>
	);
};
