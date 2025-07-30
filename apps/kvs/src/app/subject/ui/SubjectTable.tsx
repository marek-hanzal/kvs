import { useParams } from "@tanstack/react-router";
import { LinkTo, Table, Tx, withColumn } from "@use-pico/client";
import type { FC } from "react";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { ActionRow } from "~/app/subject/ui/SubjectTable/ActionRow";
import { Toolbar } from "./SubjectTable/Toolbar";

export namespace SubjectTable {
	export interface Props extends Table.PropsEx<SubjectSchema.Type> {
		//
	}
}

const column = withColumn<SubjectSchema.Type>();

const columns = [
	column({
		name: "name",
		header: () => <Tx label="Subject Name" />,
		render({ value, data }) {
			const { locale } = useParams({
				from: "/$locale",
			});

			return (
				<LinkTo
					to="/$locale/subject/$id/view"
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
		name: "vat",
		header: () => <Tx label="VAT" />,
		render: ({ data }) => data.vat || "-",
		size: 16,
	}),
	column({
		name: "city",
		header: () => <Tx label="City" />,
		render: ({ data }) => data.city || "-",
		size: 16,
	}),
	column({
		name: "street",
		header: () => <Tx label="Street" />,
		render: ({ data }) => data.street || "-",
		size: "auto",
	}),
];

export const SubjectTable: FC<SubjectTable.Props> = ({ ...props }) => {
	return (
		<Table
			actionWidth={"2rem"}
			columns={columns}
			toolbar={Toolbar}
			actionRow={ActionRow}
			{...props}
		/>
	);
};
