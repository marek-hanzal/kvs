# Transaction Module

This module provides a financial transaction management system for tracking income, expenses, and costs associated with inventory items.

## Business Purpose

The transaction system serves as the financial backbone of the inventory management application:

- **Financial tracking**: Record income and expenses with timestamps and amounts
- **Cost analysis**: Link transactions to inventory items for cost tracking
- **Period-based reporting**: Organize transactions by time periods (monthly)
- **Inventory cost calculation**: Provide financial data for inventory item cost analysis

## Schema Structure

- **id**: Unique identifier (auto-generated)
- **stamp**: Transaction timestamp with proper DateTime transform
- **accountTo**: Target account/period (monthly format: yyyy-MM)
- **amount**: Numeric amount (positive for income, negative for expenses)
- **note**: Optional transaction description

## Files Structure

```
src/app/transaction/
├── db/
│   ├── TransactionSchema.ts              # Main schema with id, stamp, accountTo, amount, note
│   ├── TransactionCreateSchema.ts        # Create schema (omits id, stamp)
│   ├── TransactionPatchSchema.ts         # Patch schema for updates
│   ├── TransactionFilterSchema.ts        # Filter schema for queries
│   └── TransactionSortSchema.ts          # Sort schema for ordering
├── mutation/
│   ├── withTransactionCreateMutation.ts  # Create new transactions
│   └── withTransactionPatchMutation.ts   # Update existing transactions
├── query/
│   ├── withTransactionFetchQuery.ts      # Fetch single transaction
│   ├── withTransactionListQuery.ts       # List transactions with filtering
│   └── withTransactionSumQuery.ts        # Sum transactions for reporting
├── ui/
│   ├── TransactionCreateForm.tsx         # Create form
│   ├── TransactionPatchForm.tsx          # Edit form
│   ├── TransactionPreview.tsx            # Transaction preview
│   ├── TransactionTable.tsx              # Data table
│   └── Layout.tsx                        # Layout component
└── README.md                             # This file
```

## Key Features

### Financial Management
- **Income/Expense tracking**: Record financial transactions with amounts
- **Period organization**: Group transactions by monthly periods
- **Flexible amounts**: Support for both positive (income) and negative (expense) amounts

### Cost Analysis Integration
- **Inventory linking**: Transactions can be linked to specific inventory items
- **Cost calculation**: Provide financial data for inventory cost analysis
- **Filtered views**: Show transactions related to specific inventory items

### Reporting
- **Transaction summaries**: Sum transactions by periods or filters
- **Date range filtering**: Filter transactions by time periods
- **Full-text search**: Search transactions by notes or other text fields

## Routes

- `/transaction/` - List all transactions
- `/transaction/create` - Create a new transaction
- `/transaction/$id` - View/edit specific transaction
- `/inventory/$id/cost` - View cost analysis (shows related transactions)

## Database

The Transaction table includes:
- `id` (varchar(36), primary key)
- `stamp` (datetime, not null)
- `accountTo` (varchar, not null) - Monthly period format
- `amount` (real, not null)
- `note` (text, nullable)

## Integration

This module integrates with:
- **Inventory Item Module**: For cost analysis and financial tracking
- **Inventory Transaction Module**: For movement-based cost tracking
- **Period System**: For time-based organization and filtering
- **Date Range Toolbar**: For period-based filtering and navigation

## Usage Patterns

### Creating Transactions
- Set the target period (accountTo) in monthly format
- Enter the transaction amount (positive for income, negative for expenses)
- Add optional notes for transaction description

### Cost Analysis
- Transactions are automatically linked to inventory items through the cost analysis views
- Filter transactions by inventory item to see related costs
- Use period filtering to analyze costs over specific time ranges
