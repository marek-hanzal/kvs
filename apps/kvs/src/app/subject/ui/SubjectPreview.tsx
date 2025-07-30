import { useParams } from "@tanstack/react-router";
import {
	BackIcon,
	Card,
	LinkTo,
	Preview,
	TitlePreview,
	Tx,
} from "@use-pico/client";
import { translator } from "@use-pico/common";
import type { FC } from "react";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";

export namespace SubjectPreview {
	export interface Props extends Preview.PropsEx<SubjectSchema.Type> {
		//
	}
}

export const SubjectPreview: FC<SubjectPreview.Props> = (props) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<Preview
			title={({ entity }) => (
				<div className={"flex flex-row gap-2 items-center"}>
					<TitlePreview
						title={translator.rich("Subject (preview)")}
						subtitle={entity.name}
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
								id: "vat",
								label: translator.rich("VAT"),
								render: ({ entity }) => entity.vat || "-",
							},
							{
								id: "street",
								label: translator.rich("Street"),
								render: ({ entity }) => entity.street || "-",
							},
							{
								id: "city",
								label: translator.rich("City"),
								render: ({ entity }) => entity.city || "-",
							},
							{
								id: "zip",
								label: translator.rich("ZIP"),
								render: ({ entity }) => entity.zip || "-",
							},
						]}
						entity={entity}
					/>
				</div>
			)}
			links={() => {
				return (
					<LinkTo
						to={"/$locale/subject/list"}
						icon={BackIcon}
						params={{
							locale,
						}}
					>
						<Tx label={"Back to subject list"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
