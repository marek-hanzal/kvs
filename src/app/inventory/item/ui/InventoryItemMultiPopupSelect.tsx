import { useQueryClient } from "@tanstack/react-query";
import { Badge, More, PopupMultiSelect } from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemFilterSchema } from "~/app/inventory/item/db/InventoryItemFilterSchema";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/item/query/withInventoryItemListQuery";
import { InventoryItemTable } from "~/app/inventory/item/ui/InventoryItemTable";
import { InventoryItemIcon } from "~/app/ui/icon/InventoryItemIcon";

export namespace InventoryItemMultiPopupSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<InventoryItemSchema.Type> {
		where?: InventoryItemFilterSchema.Type;
	}
}

export const InventoryItemMultiPopupSelect: FC<
	InventoryItemMultiPopupSelect.Props
> = ({ where, ...props }) => {
	const queryClient = useQueryClient();
	const queryHook = withInventoryItemListQuery();

	return (
		<PopupMultiSelect
			icon={InventoryItemIcon}
			table={(props) => (
				<InventoryItemTable
					toolbarHidden
					{...props}
				/>
			)}
			render={({ entities }) => (
				<More
					items={entities}
					limit={5}
					render={({ entity }) => <Badge>{entity.name}</Badge>}
				/>
			)}
			queryKey={"inventory-item"}
			queryHash={where}
			query={async ({ filter, cursor }) => {
				const result = await queryHook.ensure(queryClient, {
					filter,
					cursor,
					where,
				});

				return result;
			}}
			{...props}
		/>
	);
};
