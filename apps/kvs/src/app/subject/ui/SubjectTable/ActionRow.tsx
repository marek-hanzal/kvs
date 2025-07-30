import { useParams } from "@tanstack/react-router";
import {
	ActionLink,
	ActionMenu,
	EditIcon,
	type Table,
	Tx,
} from "@use-pico/client";
import type { FC } from "react";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";

export namespace ActionRow {
	export interface Props extends Table.Action.Row.Props<SubjectSchema.Type> {
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
				to="/$locale/subject/$id/edit"
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
