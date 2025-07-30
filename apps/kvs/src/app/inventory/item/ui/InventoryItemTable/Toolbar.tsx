import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { InventoryItemIcon } from "~/app/ui/icon/InventoryItemIcon";

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
				iconEnabled={InventoryItemIcon}
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
