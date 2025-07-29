import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace Toolbar {
	export interface Props extends Table.Toolbar.Props<TransactionSchema.Type> {
		//
	}
}

export const Toolbar: FC<Toolbar.Props> = () => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			to="/$locale/transaction/create"
			params={{
				locale,
			}}
		>
			<Button
				iconEnabled={TransactionIcon}
				variant={{
					size: "md",
					variant: "primary",
				}}
			>
				<Tx label="Create" />
			</Button>
		</LinkTo>
	);
};
