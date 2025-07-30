# Subject Module

This module handles subjects (customers, suppliers, etc.) in the KVS application.

## Structure

```
subject/
├── db/                          # Database schemas
│   ├── SubjectSchema.ts         # Main subject schema
│   ├── SubjectCreateSchema.ts   # Schema for creating subjects
│   ├── SubjectPatchSchema.ts    # Schema for updating subjects
│   ├── SubjectFilterSchema.ts   # Schema for filtering subjects
│   └── SubjectSortSchema.ts     # Schema for sorting subjects
├── query/                       # Query hooks
│   ├── withSubjectListQuery.ts  # List subjects with pagination
│   └── withSubjectFetchQuery.ts # Fetch single subject by ID
├── mutation/                    # Mutation hooks
│   ├── withSubjectCreateMutation.ts # Create new subject
│   └── withSubjectPatchMutation.ts  # Update existing subject
└── ui/                          # UI components
    ├── SubjectTable.tsx         # Table for listing subjects
    ├── SubjectCreateForm.tsx    # Form for creating subjects
    ├── SubjectPatchForm.tsx     # Form for editing subjects
    ├── SubjectPreview.tsx       # Preview component for subjects
    ├── SubjectMultiPopupSelect.tsx # Multi-select popup for subjects
    └── SubjectTable/            # Table sub-components
        ├── Toolbar.tsx          # Table toolbar
        └── ActionRow.tsx        # Table action row
```

## Routes

- `/$locale/subject/list` - List all subjects with filtering and pagination
- `/$locale/subject/create` - Create a new subject
- `/$locale/subject/$id/view` - View subject details
- `/$locale/subject/$id/edit` - Edit subject details

## Features

- Full CRUD operations for subjects
- Filtering by name, VAT, city, zip, and fulltext search
- Sorting by name, VAT, and city
- Pagination support
- Form validation using Zod schemas
- Responsive table with actions
- Multi-select popup for selecting subjects in other forms

## Database Schema

Subjects have the following fields:
- `id` - Unique identifier
- `name` - Subject name (required)
- `vat` - VAT number (optional)
- `street` - Street address (optional)
- `city` - City (optional)
- `zip` - ZIP code (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp 
