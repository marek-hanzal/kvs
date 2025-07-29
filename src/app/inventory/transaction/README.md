# Inventory Transaction Module

This module manages inventory movements and tracks quantity changes for physical inventory items.

## Business Purpose

The inventory transaction system handles the movement of physical inventory items:

- **Stock movements**: Record incoming (input) and outgoing (output) inventory movements
- **Quantity tracking**: Automatically update item quantities based on transaction amounts
- **Movement history**: Maintain a complete audit trail of all inventory movements
- **Item-specific tracking**: Each transaction is linked to a specific inventory item

## Schema Structure

- **id**: Unique identifier (auto-generated)
- **stamp**: Movement timestamp with proper DateTime transform
- **accountTo**: Target period (monthly format: yyyy-MM)
- **amount**: Movement quantity (positive for input, negative for output)
- **inventoryItemId**: Reference to the specific inventory item
- **note**: Optional movement description

## Files Structure

```
src/app/inventory/transaction/
├── db/
│   ├── InventoryTransactionSchema.ts              # Main schema with all fields
│   ├── InventoryTransactionCreateSchema.ts        # Create schema (omits id, stamp)
│   ├── InventoryTransactionFilterSchema.ts        # Filter schema for queries
│   └── InventoryTransactionSortSchema.ts          # Sort schema for ordering
├── mutation/
│   └── withInventoryTransactionCreateMutation.ts  # Create new inventory movements
├── query/
│   └── withInventoryTransactionListQuery.ts       # List movements with filtering
├── ui/
│   ├── InventoryTransactionCreateForm.tsx         # Create form for movements
│   └── InventoryTransactionTable.tsx              # Data table with color coding
└── README.md                                      # This file
```

## Key Features

### Movement Types
- **Input transactions**: Positive amounts that increase item quantities
- **Output transactions**: Negative amounts that decrease item quantities
- **Visual indicators**: Green background for inputs, red for outputs

### Quantity Management
- **Automatic updates**: Item quantities are updated when transactions are created
- **Movement tracking**: Complete history of all quantity changes
- **Item linking**: Each movement is tied to a specific inventory item

### Period Organization
- **Monthly periods**: Movements are organized by monthly periods
- **Date filtering**: Filter movements by time ranges
- **Predefined ranges**: Quick filters for current month, last month, etc.

### Audit Trail
- **Complete history**: Track all inventory movements over time
- **Movement details**: Timestamps, quantities, and notes for each movement
- **Item-specific views**: View movement history for specific items

## Routes

- `/inventory/$id/input` - Create input transaction for an item
- `/inventory/$id/output` - Create output transaction for an item
- `/inventory/$id` - View item details (includes movement history)

## Database

The InventoryTransaction table includes:
- `id` (varchar(36), primary key)
- `stamp` (datetime, not null)
- `accountTo` (datetime, not null) - Monthly period
- `amount` (real, not null) - Movement quantity
- `inventoryItemId` (varchar(36), not null) - Foreign key to InventoryItem
- `note` (text, nullable)

## Integration

This module integrates with:
- **Inventory Item Module**: For item references and quantity updates
- **Transaction Module**: For financial cost analysis
- **Period System**: For time-based organization and filtering
- **Date Range Toolbar**: For period-based filtering

## Usage Patterns

### Creating Input Transactions
- Select an inventory item
- Set the target period (accountTo) in monthly format
- Enter the quantity being added (positive amount)
- Add optional notes describing the input

### Creating Output Transactions
- Select an inventory item
- Set the target period (accountTo) in monthly format
- Enter the quantity being removed (positive amount, automatically converted to negative)
- Add optional notes describing the output

### Movement History
- View all movements for a specific item
- Filter by time periods to see movement patterns
- Use color coding to quickly identify input vs output movements

## Business Logic

### Quantity Calculation
- **Input movements**: Increase item quantity by the transaction amount
- **Output movements**: Decrease item quantity by the transaction amount
- **Automatic updates**: Item quantities are recalculated when transactions are created

### Movement Validation
- **Item existence**: Transactions can only be created for existing inventory items
- **Quantity constraints**: Output transactions cannot exceed available quantity
- **Period validation**: Movements are organized by monthly periods
