import type { Migration } from "kysely";

export const InitialMigration: Migration = {
	async up(db) {
		await db.schema
			.createTable("MvaRecord")
			.addColumn("id", "integer", (col) => col.primaryKey())
			.addColumn("stamp", "text", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("amount", "real", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.addColumn("gross", "real", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("MvaItem")
			.addColumn("id", "integer", (col) => col.primaryKey())
			.addColumn("mvaRecordId", "integer", (col) =>
				col.references("MvaRecord.id").onDelete("cascade").notNull(),
			)
			.addColumn("stamp", "text", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.execute();
	},
};
