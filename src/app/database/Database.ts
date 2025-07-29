import type { ExpensePeriodSchema } from "~/app/expense/db/ExpensePeriodSchema";
import type { ExpenseSchema } from "~/app/expense/db/ExpenseSchema";
import type { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";
import type { InventoryTransactionSchema } from "~/app/inventory/transaction/db/InventoryTransactionSchema";
import type { PeriodSchema } from "~/app/period/db/PeriodSchema";

export interface Database {
	Period: PeriodSchema.Type;
	InventoryItem: InventoryItemSchema.Type;
	InventoryTransaction: InventoryTransactionSchema.Type;
	Expense: ExpenseSchema.Type;
	ExpensePeriod: ExpensePeriodSchema.Type;
}
