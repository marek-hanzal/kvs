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
			.addColumn("mac", "integer", (col) => col.notNull().defaultTo(0))
			.addColumn("note", "text")
			.execute();

		await db.schema
			.createTable("Mac")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("stamp", "datetime", (col) => col.notNull())
			.addColumn("accountTo", "datetime", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("MacRecord")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("macId", "varchar(36)", (col) =>
				col.references("Mac.id").onDelete("cascade").notNull(),
			)
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("inventoryItemId", "varchar(36)", (col) =>
				col
					.references("InventoryItem.id")
					.onDelete("cascade")
					.notNull(),
			)
			.addColumn("cost", "real", (col) => col.notNull())
			.execute();

		await db.schema
			.createTable("Subject")
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("vat", "text")
			.addColumn("street", "text")
			.addColumn("city", "text")
			.addColumn("zip", "text")
			.execute();
	},
};
