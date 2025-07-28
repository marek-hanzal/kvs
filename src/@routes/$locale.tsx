import { createFileRoute } from "@tanstack/react-router";
import { translator } from "@use-pico/common";
import { bootstrap } from "~/app/database/kysely";

export const Route = createFileRoute("/$locale")({
	async loader({ params: { locale } }) {
		await bootstrap();
		try {
			translator.push(
				(await import(`../translation/${locale}.yaml`)).default,
			);
		} catch (e) {
			console.error(e);
		}
	},
});
