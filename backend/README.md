# Smart Village Budget and Expense Tracker - Backend

A FastAPI-based backend system for managing village budgets, categories, and expenses.

## Tech Stack

- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Database
- **Alembic** - Database migrations
- **Pydantic** - Data validation using Python type annotations
- **python-dotenv** - Environment variable management

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # CRUD operations
│   ├── dependencies.py      # FastAPI dependencies
│   └── routers/
│       ├── __init__.py
│       ├── villages.py      # Village endpoints
│       ├── budgets.py       # Budget endpoints
│       ├── categories.py    # Category endpoints
│       └── expenses.py      # Expense endpoints
├── alembic/                 # Database migrations
├── alembic.ini              # Alembic configuration
├── pyproject.toml           # Project dependencies
└── .env                     # Environment variables
```

## Setup Instructions

### 1. Prerequisites

- Python 3.12+
- PostgreSQL installed and running locally
- uv (recommended) or pip for package management

### 2. Database Setup

Create a PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE smart_village_db;
\q
```

### 3. Environment Configuration

Ensure your `.env` file contains:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/smart_village_db
```

### 4. Install Dependencies

Using uv (recommended):
```bash
uv sync
```

Or using pip:
```bash
pip install -e .
```

### 5. Run Database Migrations

Create initial migration (if not already done):
```bash
alembic revision --autogenerate -m "Initial schema"
```

Apply migrations:
```bash
alembic upgrade head
```

### 6. Run the Application

Using uvicorn directly:
```bash
uvicorn app.main:app --reload
```

Or using uv:
```bash
uv run uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the server is running, access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Villages
- `POST /villages/` - Create a new village
- `GET /villages/` - Get all villages
- `GET /villages/{id}` - Get village by ID

### Budgets
- `POST /budgets/` - Create a new budget
- `GET /budgets/village/{village_id}` - Get budgets for a village
- `GET /budgets/{id}` - Get budget by ID

### Categories
- `POST /categories/` - Create a new category
- `GET /categories/budget/{budget_id}` - Get categories for a budget
- `GET /categories/{id}` - Get category by ID
- `GET /categories/{id}/remaining` - Get remaining budget for category

### Expenses
- `POST /expenses/` - Create a new expense
- `GET /expenses/category/{category_id}` - Get expenses for a category

## Database Models

### Village
- id (PK)
- name (required)
- district (optional)
- state (optional)
- created_at (auto)

### Budget
- id (PK)
- village_id (FK → villages.id)
- year (required)
- total_allocated (required)
- Unique constraint: (village_id, year)

### BudgetCategory
- id (PK)
- budget_id (FK → budgets.id)
- category_name (required)
- allocated_amount (required)

### Expense
- id (PK)
- category_id (FK → budget_categories.id)
- description (optional)
- amount (required)
- vendor_name (optional)
- expense_date (required)
- created_at (auto)

## Development

### Create New Migration

After modifying models:
```bash
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

### Rollback Migration

```bash
alembic downgrade -1
```

### Check Current Migration Version

```bash
alembic current
```

## CORS Configuration

The API allows requests from `http://localhost:3000` for frontend integration. Modify in `app/main.py` if needed.

## Notes

- Database tables are created via Alembic migrations only (not using `Base.metadata.create_all()`)
- All foreign keys use CASCADE delete to maintain referential integrity
- CRUD functions use SQL aggregation for performance (e.g., budget calculations)
- Business logic is separated from routers into the CRUD layer
