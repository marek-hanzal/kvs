import { useQueryClient } from "@tanstack/react-query";
import { Badge, More, PopupMultiSelect } from "@use-pico/client";
import { DateTime } from "@use-pico/common";
import type { FC } from "react";
import type { TransactionFilterSchema } from "~/app/transaction/db/TransactionFilterSchema";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";
import { withTransactionListQuery } from "~/app/transaction/query/withTransactionListQuery";
import { TransactionTable } from "~/app/transaction/ui/TransactionTable";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace TransactionMultiPopupSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<TransactionSchema.Type> {
		where?: TransactionFilterSchema.Type;
	}
}

export const TransactionMultiPopupSelect: FC<
	TransactionMultiPopupSelect.Props
> = ({ where, ...props }) => {
	const queryClient = useQueryClient();
	const queryHook = withTransactionListQuery();

	return (
		<PopupMultiSelect
			icon={TransactionIcon}
			table={(props) => (
				<TransactionTable
					toolbarHidden
					{...props}
				/>
			)}
			queryHash={where}
			render={({ entities }) => (
				<More
					items={entities}
					limit={5}
					render={({ entity }) => (
						<Badge>
							{DateTime.fromISO(entity.accountTo).toLocaleString({
								year: "numeric",
								month: "long",
							})}
							{entity.note}
						</Badge>
					)}
				/>
			)}
			queryKey={"transaction"}
			query={async ({ filter, cursor }) => {
				const result = await queryHook.ensure(queryClient, {
					filter,
					where,
					cursor,
				});

				return result;
			}}
			{...props}
		/>
	);
};
