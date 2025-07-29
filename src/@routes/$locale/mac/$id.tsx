import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withMacFetchQuery } from "~/app/mac/query/withMacFetchQuery";
import { IndexMenu } from "~/app/mac/ui/IndexMenu";
import { MacPreview } from "~/app/mac/ui/MacPreview";
import { usePageTva } from "~/app/ui/usePageTva";

export const Route = createFileRoute("/$locale/mac/$id")({
	async loader({ context: { queryClient }, params }) {
		await withMacFetchQuery().prefetch(queryClient, params);
	},
	component() {
		const { id } = Route.useParams();
		const tva = usePageTva();
		const { slots } = tva({});
		const macFetchQuery = withMacFetchQuery();
		const { data } = macFetchQuery.useSuspenseQuery({
			id,
		});

		return (
			<div className={slots.base()}>
				<MacPreview entity={data} />

				<IndexMenu entity={data} />

				<Outlet />
			</div>
		);
	},
});
