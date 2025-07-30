import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { InputIcon } from "~/app/ui/icon/InputIcon";
import { InventoryIcon } from "~/app/ui/icon/InventoryIcon";
import { OutputIcon } from "~/app/ui/icon/OutputIcon";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace IndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Type<IdentitySchema.Type> {
		//
	}
}

export const IndexMenu: FC<IndexMenu.Props> = ({ entity, ...props }) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<Menu {...props}>
			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/inventory/$id/view"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Detail (label)"} />
			</MenuLink>

			<MenuLink
				icon={InputIcon}
				to={"/$locale/inventory/$id/input"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Input (label)"} />
			</MenuLink>

			<MenuLink
				icon={OutputIcon}
				to={"/$locale/inventory/$id/output"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Output (label)"} />
			</MenuLink>

			<MenuLink
				icon={TransactionIcon}
				to={"/$locale/inventory/$id/cost"}
				params={{
					locale,
					id: entity.id,
				}}
				search={{
					filter: {
						accountToType: "current-month",
					},
				}}
			>
				<Tx label={"Cost (label)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/inventory/$id/edit"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Edit (label)"} />
			</MenuLink>
		</Menu>
	);
};
