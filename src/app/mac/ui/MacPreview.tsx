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
import type { MacSchema } from "~/app/mac/db/MacSchema";

export namespace MacPreview {
	export interface Props extends Preview.PropsEx<MacSchema.Type> {
		//
	}
}

export const MacPreview: FC<MacPreview.Props> = (props) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<Preview
			title={({ entity }) => (
				<div className={"flex flex-row gap-2 items-center"}>
					<TitlePreview
						title={<Tx label="MAC (preview)" />}
						subtitle={DateTime.fromISO(
							entity.accountTo,
						).toLocaleString({
							year: "numeric",
							month: "long",
						})}
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
								id: "stamp",
								label: <Tx label="Created" />,
								render: ({ entity }) =>
									DateTime.fromISO(
										entity.stamp,
									).toLocaleString(),
							},
							{
								id: "accountTo",
								label: <Tx label="Account To" />,
								render: ({ entity }) =>
									DateTime.fromISO(
										entity.accountTo,
									).toLocaleString({
										year: "numeric",
										month: "long",
									}),
							},
						]}
						entity={entity}
					/>
				</div>
			)}
			links={() => {
				return (
					<LinkTo
						to={"/$locale/mac/list"}
						icon={BackIcon}
						params={{
							locale,
						}}
					>
						<Tx label={"Back (label)"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
