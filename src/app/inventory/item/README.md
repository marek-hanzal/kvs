# Inventory Item Module

This module manages physical inventory items with quantity tracking and cost analysis capabilities.

## Business Purpose

The inventory item system allows users to:
- **Track physical items** with names, descriptions, and current quantities
- **Monitor stock levels** with real-time quantity updates
- **Analyze costs** by linking items to financial transactions
- **Manage inventory movements** through dedicated inventory transactions

## Schema Structure

- **id**: Unique identifier (auto-generated)
- **name**: Item name (required)
- **description**: Optional item description
- **quantity**: Current stock quantity (numeric)

## Files Structure

```
src/app/inventory/item/
├── db/
│   ├── InventoryItemSchema.ts              # Main schema with id, name, description, quantity
│   ├── InventoryItemCreateSchema.ts        # Create schema (omits id)
│   ├── InventoryItemPatchSchema.ts         # Patch schema for updates
│   ├── InventoryItemFilterSchema.ts        # Filter schema for queries
│   └── InventoryItemSortSchema.ts          # Sort schema for ordering
├── mutation/
│   ├── withInventoryItemCreateMutation.ts  # Create new items
│   ├── withInventoryItemPatchMutation.ts   # Update existing items
│   └── withInventoryItemQuantityMutation.ts # Update quantities
├── query/
│   ├── withInventoryItemFetchQuery.ts      # Fetch single item
│   └── withInventoryItemListQuery.ts       # List items with filtering
├── ui/
│   ├── InventoryItemCreateForm.tsx         # Create form
│   ├── InventoryItemPatchForm.tsx          # Edit form
│   ├── InventoryItemPreview.tsx            # Item preview
│   ├── InventoryItemTable.tsx              # Data table
│   ├── RecalculateQuantityButton.tsx       # Quantity recalculation
│   └── Layout.tsx                          # Layout component
└── README.md                               # This file
```

## Key Features

### Quantity Management
- **Automatic tracking**: Quantities are updated through inventory transactions
- **Manual recalculation**: Button to recalculate quantities from transaction history
- **Real-time updates**: Quantity changes reflect immediately in the UI

### Cost Analysis
- **Transaction linking**: Items can be linked to financial transactions for cost tracking
- **Cost views**: Dedicated cost analysis pages show related transactions
- **Period-based analysis**: Filter costs by time periods

### Inventory Transactions
- **Movement tracking**: Dedicated transaction system for inventory movements
- **Item-specific**: Each transaction is linked to a specific inventory item
- **Quantity impact**: Transactions automatically update item quantities

## Routes

- `/inventory/` - List all inventory items
- `/inventory/create` - Create a new inventory item
- `/inventory/$id` - View/edit specific item
- `/inventory/$id/cost` - View cost analysis for an item

## Database

The InventoryItem table includes:
- `id` (varchar(36), primary key)
- `name` (varchar, not null)
- `description` (text, nullable)
- `quantity` (real, not null)

## Integration

This module integrates with:
- **Inventory Transaction Module**: For movement tracking
- **Transaction Module**: For cost analysis and financial tracking
- **Period System**: For time-based filtering and analysis
