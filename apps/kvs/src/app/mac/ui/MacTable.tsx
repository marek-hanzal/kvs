import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, withColumn } from "@use-pico/client";
import { DateTime } from "@use-pico/common";
import type { FC } from "react";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { Toolbar } from "./MacTable/Toolbar";

export namespace MacTable {
	export interface Props extends Table.PropsEx<MacSchema.Type> {
		//
	}
}

const column = withColumn<MacSchema.Type>();

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
		render({ value, data }) {
			const { locale } = useParams({
				from: "/$locale",
			});

			return (
				<LinkTo
					to="/$locale/mac/$id/view"
					params={{
						locale,
						id: data.id,
					}}
				>
					{DateTime.fromISO(value).toLocaleString({
						year: "numeric",
						month: "long",
					})}
				</LinkTo>
			);
		},
		size: "auto",
	}),
];

export const MacTable: FC<MacTable.Props> = ({ ...props }) => {
	return (
		<Table
			columns={columns}
			toolbar={Toolbar}
			{...props}
		/>
	);
};
