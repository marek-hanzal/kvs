import { useParams } from "@tanstack/react-router";
import { Menu as CoolMenu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";

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
				to={"/$locale/moving-average-cost/list"}
				params={{
					locale,
				}}
			>
				<Tx label={"List Moving Average Cost"} />
			</MenuLink>
		</CoolMenu>
	);
};
