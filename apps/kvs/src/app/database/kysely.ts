import { withDatabase } from "@use-pico/client";
import type { Database } from "~/app/database/Database";
import { InitialMigration } from "~/app/database/migrations/2025-07-29-initial";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "kvs",
	async getMigrations() {
		return {
			"2025-07-29-initial": InitialMigration,
		};
	},
	async bootstrap() {
		//
	},
});
