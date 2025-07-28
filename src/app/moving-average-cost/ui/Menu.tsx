import { Menu as CoolMenu } from "@use-pico/client";
import type { FC } from "react";

export namespace Menu {
	export interface Props extends CoolMenu.Props {
		//
	}
}

export const Menu: FC<Menu.Props> = ({ ...props }) => {
	return <CoolMenu {...props} />;
};
