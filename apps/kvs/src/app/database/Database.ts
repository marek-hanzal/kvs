import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import type { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";
import type { MacRecordSchema } from "~/app/mac/db/MacRecordSchema";
import type { MacSchema } from "~/app/mac/db/MacSchema";
import type { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import type { TransactionSchema } from "~/app/transaction/db/TransactionSchema";

export interface Database {
	InventoryItem: InventoryItemSchema.Type;
	InventoryTransaction: InventoryTransactionSchema.Type;
	Subject: SubjectSchema.Type;
	Transaction: TransactionSchema.Type;
	Mac: MacSchema.Type;
	MacRecord: MacRecordSchema.Type;
}
