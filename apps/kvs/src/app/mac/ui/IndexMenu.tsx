import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import { MacIcon } from "~/app/ui/icon/MacIcon";

export namespace IndexMenu {
	export interface Props extends Menu.Props, Entity.Type<MacSchema.Type> {
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
				icon={MacIcon}
				to={"/$locale/mac/$id/view"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Detail (label)"} />
			</MenuLink>
		</Menu>
	);
};
