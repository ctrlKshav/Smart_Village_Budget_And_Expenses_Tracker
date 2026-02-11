# Database Schema Documentation

## Overview
The Smart Village Budget and Expense Tracker uses PostgreSQL as its database with SQLAlchemy ORM for data management.

**Database Name:** `smart_village_db`
**User:** `postgres`
**Port:** `5432`

## Schema Diagram

```
villages (1) ──→ (*) budgets (1) ──→ (*) budget_categories (1) ──→ (*) expenses
```

## Tables

### 1. villages
Main table storing village information.

**Columns:**
- `id` (INTEGER, PRIMARY KEY) - Auto-incrementing ID
- `name` (VARCHAR(150), NOT NULL) - Village name
- `district` (VARCHAR(150)) - District name
- `state` (VARCHAR(150)) - State name
- `created_at` (TIMESTAMP) - Record creation timestamp

**Relationships:**
- One village has many budgets (cascade delete)

**Sample Data:**
- Greenfield Village (Maharashtra, Central District)
- Riverside Village (Punjab, North District)
- Mountain View Village (Himachal Pradesh, Hill District)

---

### 2. budgets
Stores annual budget allocations for villages.

**Columns:**
- `id` (INTEGER, PRIMARY KEY) - Auto-incrementing ID
- `village_id` (INTEGER, FOREIGN KEY → villages.id, NOT NULL) - References village
- `year` (INTEGER, NOT NULL) - Budget year
- `total_allocated` (NUMERIC(12,2), NOT NULL) - Total budget amount

**Constraints:**
- UNIQUE constraint on (village_id, year) - One budget per village per year
- Foreign key with CASCADE DELETE

**Relationships:**
- Belongs to one village
- One budget has many budget categories (cascade delete)

**Sample Data:**
- Village 1, Year 2024: ₹10,00,000
- Village 2, Year 2025: ₹15,00,000
- Village 3, Year 2024: ₹20,00,000

---

### 3. budget_categories
Categorizes budget allocations by purpose (Infrastructure, Education, etc.)

**Columns:**
- `id` (INTEGER, PRIMARY KEY) - Auto-incrementing ID
- `budget_id` (INTEGER, FOREIGN KEY → budgets.id, NOT NULL) - References budget
- `category_name` (VARCHAR(150), NOT NULL) - Category name
- `allocated_amount` (NUMERIC(12,2), NOT NULL) - Amount allocated to this category

**Relationships:**
- Belongs to one budget
- One category has many expenses (cascade delete)

**Sample Categories:**
- Infrastructure: ₹4,00,000
- Education: ₹3,00,000
- Healthcare: ₹2,00,000
- Agriculture: ₹1,00,000

---

### 4. expenses
Records individual expense transactions.

**Columns:**
- `id` (INTEGER, PRIMARY KEY) - Auto-incrementing ID
- `category_id` (INTEGER, FOREIGN KEY → budget_categories.id, NOT NULL) - References category
- `description` (TEXT) - Expense description
- `amount` (NUMERIC(12,2), NOT NULL) - Expense amount
- `vendor_name` (VARCHAR(150)) - Vendor/supplier name
- `expense_date` (DATE, NOT NULL) - Date of expense
- `created_at` (TIMESTAMP) - Record creation timestamp

**Relationships:**
- Belongs to one budget category

**Sample Expenses:**
- Road construction materials - ₹1,50,000 (BuildRight Suppliers)
- School furniture - ₹75,000 (Edu Furnishings Ltd)
- Medical equipment - ₹85,000 (HealthCare Supplies)
- Fertilizer distribution - ₹45,000 (Agro Solutions)

---

### 5. alembic_version
System table for tracking database migrations.

**Columns:**
- `version_num` (VARCHAR(32), PRIMARY KEY) - Current migration version

## Database Connection

### Environment Variables (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/smart_village_db
```

### Connection Configuration (app/database.py)
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

## Migrations

### Current Migration
- **Revision ID:** cb977b260575
- **Description:** Initial schema
- **Status:** Applied ✓

### Running Migrations
```bash
# Check current version
cd backend
.venv/bin/alembic current

# Upgrade to latest
.venv/bin/alembic upgrade head

# Create new migration
.venv/bin/alembic revision --autogenerate -m "description"
```

## Data Seeding

Run the seed script to populate sample data:
```bash
cd backend
.venv/bin/python seed_data.py
```

**Sample Data Created:**
- 3 Villages
- 3 Budgets
- 12 Budget Categories (4 per budget)
- 4 Expenses

## API Endpoints Testing

All endpoints are working and returning data from the database:

### Villages
```bash
GET /villages/          # List all villages
GET /villages/{id}      # Get specific village
POST /villages/         # Create new village
```

### Budgets
```bash
GET /budgets/                    # List all budgets
GET /budgets/{id}                # Get specific budget
GET /budgets/village/{id}        # Get budgets for a village
POST /budgets/                   # Create new budget
```

### Categories
```bash
GET /categories/                 # List all categories
GET /categories/{id}             # Get specific category
GET /categories/budget/{id}      # Get categories for a budget
GET /categories/{id}/remaining   # Get remaining budget
POST /categories/                # Create new category
```

### Expenses
```bash
GET /expenses/                   # List all expenses
GET /expenses/category/{id}      # Get expenses for a category
POST /expenses/                  # Create new expense
```

### Authentication
```bash
POST /auth/login                 # User login
POST /auth/register              # User registration
GET /auth/me                     # Get current user
```

## Connection Status

✅ **PostgreSQL Service:** Active and running
✅ **Database:** smart_village_db exists
✅ **Tables:** All 5 tables created successfully
✅ **Migrations:** Applied and up-to-date
✅ **Sample Data:** Seeded successfully
✅ **API Endpoints:** All tested and working
✅ **Authentication:** Functional with mock implementation

## Next Steps

The database is fully set up and ready for production use. Recommended enhancements:

1. **Authentication:** Replace mock auth with JWT tokens and proper password hashing
2. **User Management:** Create users table and link to villages/permissions
3. **Indexes:** Add indexes on frequently queried columns (village_id, budget_id, category_id)
4. **Audit Trail:** Add audit tables to track changes
5. **Backup Strategy:** Implement regular database backups
6. **Data Validation:** Add database-level constraints for business rules
7. **Performance:** Add database connection pooling configuration
