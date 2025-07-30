import { useQueryClient } from "@tanstack/react-query";
import { Badge, More, PopupMultiSelect } from "@use-pico/client";
import type { FC } from "react";
import type { SubjectFilterSchema } from "~/app/subject/db/SubjectFilterSchema";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { withSubjectListQuery } from "~/app/subject/query/withSubjectListQuery";
import { SubjectTable } from "~/app/subject/ui/SubjectTable";

export namespace SubjectMultiPopupSelect {
	export interface Props
		extends PopupMultiSelect.PropsEx<SubjectSchema.Type> {
		where?: SubjectFilterSchema.Type;
	}
}

export const SubjectMultiPopupSelect: FC<SubjectMultiPopupSelect.Props> = ({
	where,
	...props
}) => {
	const queryClient = useQueryClient();
	const queryHook = withSubjectListQuery();

	return (
		<PopupMultiSelect
			table={(props) => (
				<SubjectTable
					toolbarHidden
					actionRow={undefined}
					{...props}
				/>
			)}
			render={({ entities }) => (
				<More
					items={entities}
					limit={5}
					render={({ entity }) => <Badge>{entity.name}</Badge>}
				/>
			)}
			queryKey={"subject"}
			queryHash={where}
			query={async ({ filter, cursor }) => {
				const result = await queryHook.ensure(queryClient, {
					filter,
					cursor,
					where,
				});

				return result;
			}}
			{...props}
		/>
	);
};
