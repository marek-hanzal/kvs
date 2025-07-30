import { useParams } from "@tanstack/react-router";
import {
	ActionLink,
	ActionMenu,
	EditIcon,
	type Table,
	Tx,
} from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { InputIcon } from "~/app/ui/icon/InputIcon";
import { OutputIcon } from "~/app/ui/icon/OutputIcon";

export namespace ActionRow {
	export interface Props
		extends Table.Action.Row.Props<InventoryItemSchema.Type> {
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
				icon={InputIcon}
				to="/$locale/inventory/$id/input"
				params={{
					locale,
					id: data.id,
				}}
			>
				<Tx label="Input (label)" />
			</ActionLink>

			<ActionLink
				icon={OutputIcon}
				to="/$locale/inventory/$id/output"
				params={{
					locale,
					id: data.id,
				}}
			>
				<Tx label="Output (label)" />
			</ActionLink>

			<ActionLink
				icon={EditIcon}
				to="/$locale/inventory/$id/edit"
				params={{
					locale,
					id: data.id,
				}}
			>
				<Tx label="Edit (label)" />
			</ActionLink>
		</ActionMenu>
	);
};
