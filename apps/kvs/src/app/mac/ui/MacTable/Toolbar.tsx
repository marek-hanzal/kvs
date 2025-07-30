import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { MacIcon } from "~/app/ui/icon/MacIcon";

export namespace Toolbar {
	export interface Props extends Table.Toolbar.Props<MacSchema.Type> {
		//
	}
}

export const Toolbar: FC<Toolbar.Props> = () => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			to="/$locale/mac/create"
			params={{
				locale,
			}}
		>
			<Button
				iconEnabled={MacIcon}
				variant={{
					size: "md",
					variant: "primary",
				}}
			>
				<Tx label="Create MAC" />
			</Button>
		</LinkTo>
	);
};
