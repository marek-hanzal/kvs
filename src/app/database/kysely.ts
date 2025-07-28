import { withDatabase } from "@use-pico/client";
import type { Database } from "~/app/database/Database";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "kvs",
	async bootstrap() {
		//
	},
});
