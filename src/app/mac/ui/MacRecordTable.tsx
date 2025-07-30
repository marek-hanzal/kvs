import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";

export namespace MacRecordTable {
	export interface Props extends Table.PropsEx<MacRecordSchema.Type> {
		//
	}
}

const column = withColumn<MacRecordSchema.Type>();

const columns = [
	column({
		name: "inventoryItemId",
		header: () => <Tx label="Inventory Item" />,
		render({ value, data }) {
			const { locale } = useParams({
				from: "/$locale",
			});

			return (
				<LinkTo
					to="/$locale/inventory/$id/view"
					params={{
						locale,
						id: value,
					}}
				>
					{data.name}
				</LinkTo>
			);
		},
		size: 32,
	}),
	column({
		name: "cost",
		header: () => <Tx label="Cost" />,
		render: ({ value }) => value.toFixed(2),
		size: "auto",
	}),
];

export const MacRecordTable: FC<MacRecordTable.Props> = ({ ...props }) => {
	return (
		<Table
			columns={columns}
			{...props}
		/>
	);
};
