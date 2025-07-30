import { useParams } from "@tanstack/react-router";
import {
	ActionLink,
	ActionMenu,
	EditIcon,
	type Table,
	Tx,
} from "@use-pico/client";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";

export namespace ActionRow {
	export interface Props
		extends Table.Action.Row.Props<TransactionSchema.Type> {
		//
	}
}

export const ActionRow: FC<ActionRow.Props> = ({ data }) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<ActionMenu>
			<ActionLink
				icon={EditIcon}
				to="/$locale/transaction/$id/edit"
				params={{
					locale,
					id: data.id,
				}}
				search={{
					mode: data.amount >= 0 ? "input" : "output",
				}}
			>
				<Tx label="Edit (label)" />
			</ActionLink>
		</ActionMenu>
	);
};
