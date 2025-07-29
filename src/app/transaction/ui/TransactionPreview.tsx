import { useParams } from "@tanstack/react-router";
import {
	BackIcon,
	Card,
	LinkTo,
	Preview,
	TitlePreview,
	Tx,
} from "@use-pico/client";
import { DateTime } from "@use-pico/common";
import type { FC } from "react";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace TransactionPreview {
	export interface Props extends Preview.PropsEx<TransactionSchema.Type> {
		//
	}
}

export const TransactionPreview: FC<TransactionPreview.Props> = (props) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<Preview
			title={({ entity }) => (
				<div className={"flex flex-row gap-2 items-center"}>
					<TitlePreview
						icon={TransactionIcon}
						title={<Tx label="Transaction (preview)" />}
						subtitle={DateTime.fromISO(
							entity.stamp,
						).toLocaleString()}
					/>
					<Card
						inline
						valueOfProps={{
							variant: {
								withBackground: false,
							},
						}}
						items={[
							{
								id: "amount",
								label: <Tx label="Amount" />,
								cls: {
									value:
										entity.amount > 0
											? "text-green-700"
											: entity.amount < 0
												? "text-red-700"
												: undefined,
								},
								render: ({ entity }) =>
									entity.amount.toFixed(2),
							},
							{
								id: "note",
								label: <Tx label="Note" />,
								render: ({ entity }) => entity.note || "-",
							},
						]}
						entity={entity}
					/>
				</div>
			)}
			links={() => {
				return (
					<LinkTo
						to={"/$locale/transaction/list"}
						icon={BackIcon}
						params={{
							locale,
						}}
					>
						<Tx label={"Back to transaction list"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
