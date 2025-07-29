# KVS - Business Management Platform

KVS (Just Carlsbad Salt) is a comprehensive business management platform designed to handle inventory tracking, financial management, and business operations in a unified system.

## Business Purpose

KVS serves as a complete business management solution that integrates:

- **Inventory Management**: Track physical items, quantities, and movements
- **Financial Tracking**: Monitor income, expenses, and cost analysis
- **Business Intelligence**: Provide insights through integrated data and reporting
- **Workflow Automation**: Streamline business processes through connected modules

## Available Modules

### 1. Inventory Management
- **Inventory Items**: Track physical items with names, descriptions, and current quantities
- **Inventory Transactions**: Record incoming and outgoing movements with automatic quantity updates
- **Cost Analysis**: Link inventory items to financial transactions for cost tracking
- **Movement History**: Complete audit trail of all inventory movements

### 2. Financial Management
- **Transactions**: Record income and expenses with period-based organization
- **Cost Tracking**: Analyze costs associated with inventory items
- **Period Reporting**: Monthly-based financial organization and reporting
- **Financial Integration**: Connect financial data with inventory operations

### 3. Core Infrastructure
- **Database System**: SQLite-based local database with automatic migrations
- **Multi-language Support**: Czech and English localization
- **Desktop-First UI**: Optimized for desktop business workflows
- **Real-time Updates**: Immediate data synchronization across modules

## Planned Modules

### 1. Smart TODO System
- **Notification-based tasks** with due dates and priority levels
- **Entity relations** linking TODOs to inventory items, transactions, and diary entries
- **Business workflows** for storage management, replenishment, and maintenance
- **Automated actions** that trigger when TODOs are completed

### 2. Digital Diary with Timeline
- **Rich text entries** with automatic timestamps and categorization
- **Infinite scroll timeline** for chronological business history
- **Entity linking** to connect diary entries with business activities
- **Business intelligence** through pattern analysis and search capabilities

### 3. Calendar System
- **Monthly calendar view** displaying all business events and activities
- **Event tracking** for TODOs, transactions, diary entries, and inventory events
- **Quick event creation** with drag-and-drop functionality
- **Business pattern analysis** and historical trend insights

### 4. Enhanced Features
- **Location Management**: Multi-location inventory tracking
- **Transaction Categories**: Comprehensive financial categorization
- **Mobile Support**: Responsive design with offline capabilities
- **AI Integration**: Smart suggestions and predictive analytics
- **External Integrations**: Calendar, email, and cloud storage connections

## Technical Architecture

- **Frontend**: React with TanStack Router and Query
- **Database**: SQLite with Kysely ORM
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query for server state
- **Forms**: TanStack Form with Zod validation
- **Localization**: YAML-based translation system

## Business Workflows

### Inventory Operations
1. Create inventory items with descriptions and initial quantities
2. Record input/output transactions to track movements
3. Monitor stock levels and generate replenishment alerts
4. Analyze costs by linking to financial transactions

### Financial Management
1. Record income and expenses with period organization
2. Link transactions to inventory items for cost analysis
3. Generate period-based reports and financial insights
4. Track business performance over time

### Integrated Workflows
- **Storage Management**: TODOs linked to inventory items automatically create transactions
- **Cost Analysis**: Financial data integrated with inventory movements
- **Business Intelligence**: Cross-module data analysis for strategic decisions
- **Audit Trails**: Complete history of all business activities

## Development Status

- ✅ **Core Infrastructure**: Database, routing, forms, and UI components
- ✅ **Inventory Management**: Items, transactions, and cost analysis
- ✅ **Financial Tracking**: Transactions and period-based organization
- 🔄 **TODO System**: In development with notification capabilities
- 📋 **Diary System**: Planned with timeline and entity linking
- 📋 **Calendar System**: Planned with event tracking and integration
- 📋 **Advanced Features**: Mobile support, AI integration, external services

## Getting Started

The application is designed for desktop use with a focus on business workflows. Each module is self-contained but designed to integrate seamlessly with others, creating a unified business management experience.
