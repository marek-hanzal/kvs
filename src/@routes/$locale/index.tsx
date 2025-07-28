import { createFileRoute, useParams } from "@tanstack/react-router";
import { Icon, LinkTo, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/")({
	component() {
		const { locale } = useParams({
			from: "/$locale",
		});

		return (
			<div>
				<LinkTo
					icon={<Icon icon={"icon-[lets-icons--root-light-light]"} />}
					to={"/$locale/moving-average-cost"}
					params={{
						locale,
					}}
				>
					<Tx label={"Moving Average Cost"} />
				</LinkTo>
			</div>
		);
	},
});
