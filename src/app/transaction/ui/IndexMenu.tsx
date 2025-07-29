import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace IndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Type<TransactionSchema.Type> {
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
				icon={TransactionIcon}
				to={"/$locale/transaction/$id/view"}
				params={{
					locale,
					id: entity.id,
				}}
			>
				<Tx label={"Detail (label)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/transaction/$id/edit"}
				params={{
					locale,
					id: entity.id,
				}}
				search={{
					mode: entity.amount >= 0 ? "input" : "output",
				}}
			>
				<Tx label={"Edit (label)"} />
			</MenuLink>
		</Menu>
	);
};
