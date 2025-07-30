import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, withColumn } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { ActionRow } from "~/app/inventory/item/ui/InventoryItemTable/ActionRow";
import { Toolbar } from "./InventoryItemTable/Toolbar";

export namespace InventoryItemTable {
	export interface Props extends Table.PropsEx<InventoryItemSchema.Type> {
		//
	}
}

const column = withColumn<InventoryItemSchema.Type>();

const columns = [
	column({
		name: "name",
		header: () => <Tx label="Item Name" />,
		render({ value, data }) {
			const { locale } = useParams({
				from: "/$locale",
			});

			return (
				<LinkTo
					to="/$locale/inventory/$id/view"
					params={{
						locale,
						id: data.id,
					}}
				>
					{value}
				</LinkTo>
			);
		},
		size: 32,
	}),
	column({
		name: "quantity",
		header: () => <Tx label="Quantity" />,
		render: ({ data }) =>
			toHumanNumber({
				number: data.quantity,
				fraction: 2,
			}),
		size: 12,
	}),
	column({
		name: "description",
		header: () => <Tx label="Description" />,
		render: ({ data }) => data.description || "-",
		size: "auto",
	}),
];

export const InventoryItemTable: FC<InventoryItemTable.Props> = ({
	...props
}) => {
	return (
		<Table
			columns={columns}
			toolbar={Toolbar}
			actionRow={ActionRow}
			{...props}
		/>
	);
};
