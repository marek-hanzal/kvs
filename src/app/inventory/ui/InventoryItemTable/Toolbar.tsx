import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { InventoryIcon } from "~/app/ui/icon/InventoryIcon";

export namespace Toolbar {
	export interface Props
		extends Table.Toolbar.Props<InventoryItemSchema.Type> {
		//
	}
}

export const Toolbar: FC<Toolbar.Props> = () => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			to="/$locale/inventory/create"
			params={{
				locale,
			}}
		>
			<Button
				iconEnabled={InventoryIcon}
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
