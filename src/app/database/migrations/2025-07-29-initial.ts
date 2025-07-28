import type { Migration } from "kysely";

export const InitialMigration: Migration = {
	async up(db) {
		await db.schema
			.createTable("MvaRecord")
			.addColumn("id", "integer", (col) => col.primaryKey())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("description", "text")
			.addColumn("createdAt", "text", (col) => col.notNull())
			.addColumn("updatedAt", "text", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("MvaItem")
			.addColumn("id", "integer", (col) => col.primaryKey())
			.addColumn("recordId", "integer", (col) =>
				col.references("MvaRecord.id").onDelete("cascade").notNull(),
			)
			.addColumn("quantity", "real", (col) => col.notNull())
			.addColumn("price", "real", (col) => col.notNull())
			.addColumn("date", "text", (col) => col.notNull())
			.addColumn("createdAt", "text", (col) => col.notNull())
			.execute();
	},
};
