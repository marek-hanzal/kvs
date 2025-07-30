import { vyhledejEkonomickeSubjekty } from "@kvs/ares";
import { createFileRoute } from "@tanstack/react-router";
import { translator } from "@use-pico/common";
import { bootstrap } from "~/app/database/kysely";

export const Route = createFileRoute("/$locale")({
	async beforeLoad() {
		await bootstrap();
	},
	async loader({ params: { locale } }) {
		const foo = await vyhledejEkonomickeSubjekty({
			ico: [
				"87911418",
			],
		});

		console.log(foo);

		try {
			translator.push(
				(await import(`../translation/${locale}.yaml`)).default,
			);
		} catch (e) {
			console.error(e);
		}
	},
});
