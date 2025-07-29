import { useParams } from "@tanstack/react-router";
import { Menu as CoolMenu, ListIcon, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { DashboardIcon } from "~/app/ui/icon/DashboardIcon";

export namespace Menu {
	export interface Props extends CoolMenu.Props {
		//
	}
}

export const Menu: FC<Menu.Props> = ({ ...props }) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<CoolMenu {...props}>
			<MenuLink
				icon={DashboardIcon}
				to={"/$locale/inventory"}
				params={{
					locale,
				}}
			>
				<Tx label={"Overview"} />
			</MenuLink>

			<MenuLink
				icon={ListIcon}
				to={"/$locale/inventory/list"}
				params={{
					locale,
				}}
			>
				<Tx label={"List Moving Average Cost"} />
			</MenuLink>
		</CoolMenu>
	);
};
