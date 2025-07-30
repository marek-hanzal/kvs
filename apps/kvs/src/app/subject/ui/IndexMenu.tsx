import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

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
				to={"/$locale/subject/$id/view"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Detail (label)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/subject/$id/edit"}
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
