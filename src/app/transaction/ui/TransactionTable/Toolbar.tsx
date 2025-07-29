import { useParams } from "@tanstack/react-router";
import { Button, Icon, LinkTo, type Table, Tx } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { withTransactionSumQuery } from "~/app/transaction/query/withTransactionSumQuery";
import { InputTransactionIcon } from "~/app/ui/icon/InputTransactionIcon";
import { OutputTransactionIcon } from "~/app/ui/icon/OutputTransactionIcon";
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

	const sumQuery = withTransactionSumQuery();
	const { data: sum } = sumQuery.useSuspenseQuery();

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

			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"gap-2",
				])}
			>
				<Icon
					icon={TransactionIcon}
					cls={{
						base: [
							"bg-slate-400",
						],
					}}
				/>
				<div
					className={tvc([
						"text-lg",
						"font-bold",
						sum > 0 ? "text-green-600" : "text-red-600",
					])}
				>
					{toHumanNumber({
						number: sum,
						fraction: 2,
					})}
				</div>
			</div>
		</>
	);
};
