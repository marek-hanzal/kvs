import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { InventoryIcon } from "~/app/ui/icon/InventoryIcon";

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
				icon={"icon-[mdi--storefront-plus-outline]"}
				to={"/$locale/inventory/$id/input"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Input (label)"} />
			</MenuLink>

			<MenuLink
				icon={"icon-[mdi--storefront-minus-outline]"}
				to={"/$locale/inventory/$id/output"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Output (label)"} />
			</MenuLink>
		</Menu>
	);
};
