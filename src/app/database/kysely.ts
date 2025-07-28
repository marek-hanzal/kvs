import { withDatabase } from "@use-pico/client";
import { Migrator } from "kysely";
import type { Database } from "~/app/database/Database";
import { InitialMigration } from "~/app/database/migrations/2025-07-29-initial";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "kvs",
	async bootstrap({ kysely }) {
		const migrator = new Migrator({
			db: kysely,
			provider: {
				async getMigrations() {
					return {
						"2025-07-29-initial": InitialMigration,
					};
				},
			},
		});

		const { error, results } = await migrator.migrateToLatest();

		if (error) {
			console.error("Migration failed:", error);
			throw error;
		}

		if (results) {
			results.forEach((migrationResult) => {
				if (migrationResult.status === "Success") {
					console.log(
						`Migration "${migrationResult.migrationName}" executed successfully`,
					);
				} else if (migrationResult.status === "Error") {
					console.error(
						`Migration "${migrationResult.migrationName}" failed`,
					);
				}
			});
		}
	},
});
