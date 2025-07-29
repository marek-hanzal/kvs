import type { Migration } from "kysely";

export const InitialMigration: Migration = {
	async up(db) {
		await db.schema
			.createTable("MvaRecord")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("amount", "real", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.addColumn("gross", "real", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("MvaItem")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("mvaRecordId", "varchar(36)", (col) =>
				col.references("MvaRecord.id").onDelete("cascade").notNull(),
			)
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.execute();
	},
};
