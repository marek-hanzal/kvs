import type { Migration } from "kysely";

export const InitialMigration: Migration = {
	async up(db) {
		await db.schema
			.createTable("InventoryItem")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("description", "text")
			.addColumn("quantity", "real", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("InventoryTransaction")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("accountTo", "datetime", (col) => col.notNull())
			.addColumn("amount", "real", (col) => col.notNull())
			.addColumn("inventoryItemId", "varchar(36)", (col) =>
				col
					.references("InventoryItem.id")
					.onDelete("cascade")
					.notNull(),
			)
			.addColumn("note", "text")
			.execute();

		await db.schema
			.createTable("Transaction")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("accountTo", "datetime", (col) => col.notNull())
			.addColumn("amount", "real", (col) => col.notNull())
			.addColumn("note", "text")
			.execute();

		await db.schema
			.createTable("MvcRecord")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("amount", "real", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.addColumn("gross", "real", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("MvcItem")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("mvcRecordId", "varchar(36)", (col) =>
				col.references("MvcRecord.id").onDelete("cascade").notNull(),
			)
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("cost", "real", (col) => col.notNull())
			.execute();
	},
};
