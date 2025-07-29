import { useQueryClient } from "@tanstack/react-query";
import { Badge, More, PopupMultiSelect } from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";
import { InventoryItemTable } from "~/app/inventory/item/ui/InventoryItemTable";
import { InventoryItemIcon } from "~/app/ui/icon/InventoryItemIcon";

export namespace InventoryItemMultiPopupSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<InventoryItemSchema.Type> {
		//
	}
}

export const InventoryItemMultiPopupSelect: FC<
	InventoryItemMultiPopupSelect.Props
> = (props) => {
	const queryClient = useQueryClient();
	const queryHook = withInventoryItemListQuery();

	return (
		<PopupMultiSelect
			icon={InventoryItemIcon}
			table={(props) => <InventoryItemTable {...props} />}
			render={({ entities }) => (
				<More
					items={entities}
					limit={5}
					render={({ entity }) => <Badge>{entity.name}</Badge>}
				/>
			)}
			queryKey={"inventory-item"}
			query={async ({ filter, cursor }) => {
				const result = await queryHook.ensure(queryClient, {
					filter,
					cursor,
				});

				return result;
			}}
			{...props}
		/>
	);
};
