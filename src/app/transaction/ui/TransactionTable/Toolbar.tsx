import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { InputTransactionIcon } from "~/app/ui/icon/InputTransactionIcon";
import { OutputTransactionIcon } from "~/app/ui/icon/OutputTransactionIcon";

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
		<>
			<LinkTo
				to="/$locale/transaction/input"
				params={{
					locale,
				}}
			>
				<Button
					iconEnabled={InputTransactionIcon}
					variant={{
						size: "md",
						variant: "secondary",
					}}
				>
					<Tx label="Input transaction" />
				</Button>
			</LinkTo>

			<LinkTo
				to="/$locale/transaction/output"
				params={{
					locale,
				}}
			>
				<Button
					iconEnabled={OutputTransactionIcon}
					variant={{
						size: "md",
						variant: "danger-light",
					}}
				>
					<Tx label="Output transaction" />
				</Button>
			</LinkTo>
		</>
	);
};
