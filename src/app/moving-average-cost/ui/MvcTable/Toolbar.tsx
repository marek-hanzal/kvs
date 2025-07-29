import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { MvcRecordSchema } from "~/app/moving-average-cost/db/MvcRecordSchema";

export namespace Toolbar {
	export interface Props extends Table.Toolbar.Props<MvcRecordSchema.Type> {
		//
	}
}

export const Toolbar: FC<Toolbar.Props> = () => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			to="/$locale/moving-average-cost/create"
			params={{
				locale,
			}}
		>
			<Button
				variant={{
					size: "md",
					variant: "primary",
				}}
			>
				<Tx label="Create" />
			</Button>
		</LinkTo>
	);
};
