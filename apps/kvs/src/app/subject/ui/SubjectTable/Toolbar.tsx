import { useParams } from "@tanstack/react-router";
import { Button, LinkTo, type Table, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { SubjectIcon } from "~/app/ui/icon/SubjectIcon";

export namespace Toolbar {
	export interface Props extends Table.Toolbar.Props<SubjectSchema.Type> {
		//
	}
}

export const Toolbar: FC<Toolbar.Props> = () => {
	const { locale } = useParams({
		from: "/$locale",
	});

	return (
		<LinkTo
			to="/$locale/subject/create"
			params={{
				locale,
			}}
		>
			<Button
				iconEnabled={SubjectIcon}
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
