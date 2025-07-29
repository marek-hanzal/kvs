# Transaction Module

This module provides a complete transaction management system with the following features:

## Schema Structure

- **id**: Unique identifier (auto-generated)
- **stamp**: Timestamp with proper DateTime transform
- **amount**: Numeric amount

## Files Structure

```
src/app/transaction/
├── db/
│   ├── TransactionSchema.ts              # Main schema with id, stamp, amount
│   ├── TransactionCreateSchema.ts        # Create schema (omits id, stamp)
│   ├── TransactionFilterSchema.ts        # Filter schema for queries
│   └── TransactionSortSchema.ts          # Sort schema for ordering
├── mutation/
│   └── withTransactionCreateMutation.ts  # Mutation hook for creating transactions
├── query/
│   └── withTransactionListQuery.ts       # Query hook for listing transactions
├── ui/
│   ├── TransactionCreateForm.tsx         # Form component for creating transactions
│   └── TransactionTable.tsx              # Table component for displaying transactions
└── README.md                             # This file
```

## Routes

- `/transaction/` - List all transactions
- `/transaction/create` - Create a new transaction

## Database

The Transaction table is created in the initial migration with:
- `id` (varchar(36), primary key)
- `stamp` (datetime, not null)
- `amount` (real, not null)

## Usage

The transaction system follows the same patterns as the inventory transaction system but is simplified to only include the core fields: id, stamp, and amount.
