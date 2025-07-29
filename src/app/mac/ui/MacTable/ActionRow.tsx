import { useParams } from "@tanstack/react-router";
import { LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { MacIcon } from "~/app/ui/icon/MacIcon";

export namespace ActionRow {
	export interface Props extends Table.Action.Row.Props<MacSchema.Type> {
		//
	}
}

export const ActionRow: FC<ActionRow.Props> = ({ data }) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			icon={MacIcon}
			to="/$locale/mac/$id/view"
			params={{
				locale,
				id: data.id,
			}}
		>
			<Tx label="Detail" />
		</LinkTo>
	);
};
