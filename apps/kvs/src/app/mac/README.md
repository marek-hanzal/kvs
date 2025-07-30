# MAC Module

This module handles Moving Average Cost (MAC) records.

## Structure

- `db/` - Database schemas and types
- `ui/` - User interface components
- `mutation/` - Data mutation operations
- `query/` - Data query operations

## Schemas

- `MacSchema` - Main schema with `stamp` and `accountTo` fields
- `MacCreateSchema` - Schema for creating new MAC records
- `MacPatchSchema` - Schema for updating existing MAC records
- `MacFilterSchema` - Schema for filtering MAC records
- `MacSortSchema` - Schema for sorting MAC records

## Routes

- `/mac` - Main layout
- `/mac/` - Overview page
- `/mac/list` - List of MAC records
- `/mac/create` - Create new MAC record
- `/mac/$id` - Individual MAC record
- `/mac/$id/view` - View MAC record
- `/mac/$id/edit` - Edit MAC record

## Components

- `Layout` - Main layout component
- `Menu` - Navigation menu
- `MacTable` - Table for displaying MAC records
- `Toolbar` - Table toolbar with actions
- `ActionRow` - Row actions for table
- `MacCreateForm` - Form for creating new MAC records
- `MacPatchForm` - Form for editing existing MAC records
- `MacPreview` - Preview component for individual MAC records
- `IndexMenu` - Menu for MAC record actions (view, edit)

## Mutations

- `withMacCreateMutation` - Mutation for creating new MAC records
- `withMacPatchMutation` - Mutation for updating existing MAC records

## Queries

- `withMacListQuery` - Query for fetching MAC records with filtering, sorting, and pagination
- `withMacFetchQuery` - Query for fetching individual MAC records
