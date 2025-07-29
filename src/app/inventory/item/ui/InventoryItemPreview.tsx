import { useParams } from "@tanstack/react-router";
import {
	BackIcon,
	Card,
	LinkTo,
	Preview,
	TitlePreview,
	Tx,
} from "@use-pico/client";
import { translator } from "@use-pico/common";
import type { FC } from "react";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import { RecalculateQuantityButton } from "~/app/inventory/item/ui/RecalculateQuantityButton";
import { InventoryItemIcon } from "~/app/ui/icon/InventoryItemIcon";

export namespace InventoryItemPreview {
	export interface Props extends Preview.PropsEx<InventoryItemSchema.Type> {
		//
	}
}

export const InventoryItemPreview: FC<InventoryItemPreview.Props> = (props) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<Preview
			title={({ entity }) => (
				<div className={"flex flex-row gap-2 items-center"}>
					<TitlePreview
						icon={InventoryItemIcon}
						title={translator.rich("Inventory Item (preview)")}
						subtitle={entity.name}
					/>
					<Card
						inline
						valueOfProps={{
							variant: {
								withBackground: false,
							},
						}}
						items={[
							{
								id: "quantity",
								label: translator.rich("Quantity"),
								cls: {
									value:
										entity.quantity > 0
											? "text-green-700"
											: entity.quantity < 0
												? "text-red-700"
												: undefined,
								},
								render: ({ entity }) =>
									entity.quantity.toFixed(2),
							},
							{
								id: "description",
								label: translator.rich("Description"),
								render: ({ entity }) =>
									entity.description || "-",
							},
						]}
						entity={entity}
					/>
				</div>
			)}
			actions={({ entity }) => {
				return (
					<RecalculateQuantityButton inventoryItemId={entity.id} />
				);
			}}
			links={() => {
				return (
					<LinkTo
						to={"/$locale/inventory/list"}
						icon={BackIcon}
						params={{
							locale,
						}}
					>
						<Tx label={"Back to inventory list"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
