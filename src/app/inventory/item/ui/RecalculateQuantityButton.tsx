import { Button, Tx } from "@use-pico/client";
import type { FC } from "react";
import { withInventoryItemQuantityMutation } from "~/app/inventory/item/mutation/withInventoryItemQuantityMutation";

export namespace RecalculateQuantityButton {
	export interface Props {
		inventoryItemId: string;
	}
}

export const RecalculateQuantityButton: FC<RecalculateQuantityButton.Props> = ({
	inventoryItemId,
}) => {
	const mutation = withInventoryItemQuantityMutation().useMutation();

	const handleClick = () => {
		mutation.mutate({
			inventoryItemId,
		});
	};

	return (
		<Button
			onClick={handleClick}
			disabled={mutation.isPending}
			variant={{
				size: "sm",
				variant: "light",
			}}
			iconEnabled="icon-[material-symbols-light--refresh-rounded]"
		>
			<Tx label="Recalculate Quantity" />
		</Button>
	);
};
