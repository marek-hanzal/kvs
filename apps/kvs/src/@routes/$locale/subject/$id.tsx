import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withSubjectFetchQuery } from "~/app/subject/query/withSubjectFetchQuery";
import { IndexMenu } from "~/app/subject/ui/IndexMenu";
import { SubjectPreview } from "~/app/subject/ui/SubjectPreview";
import { usePageTva } from "~/app/ui/usePageTva";

export const Route = createFileRoute("/$locale/subject/$id")({
	async loader({ context: { queryClient }, params }) {
		await withSubjectFetchQuery().prefetch(queryClient, params);
	},
	component() {
		const { id } = Route.useParams();
		const tva = usePageTva();
		const { slots } = tva({});
		const subjectFetchQuery = withSubjectFetchQuery();
		const { data } = subjectFetchQuery.useSuspenseQuery({
			id,
		});

		return (
			<div className={slots.base()}>
				<SubjectPreview entity={data} />

				<IndexMenu entity={data} />

				<Outlet />
			</div>
		);
	},
});
