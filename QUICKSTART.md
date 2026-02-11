# Smart Village Budget & Expense Tracker - Quick Start Guide

## 🚀 Application Stack

- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Database:** PostgreSQL 
- **Authentication:** Mock implementation (ready for JWT)

## 📋 Prerequisites

- ✅ PostgreSQL installed and running
- ✅ Python 3.12+ with uv package manager
- ✅ Node.js for frontend (or Bun)

## 🏃 Running the Application

### 1. Start Backend Server

```bash
cd backend
# Using virtual environment
.venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using uv
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using fastapi CLI
fastapi dev
```

**Backend URL:** http://localhost:8000
**API Documentation:** http://localhost:8000/docs

### 2. Start Frontend Server

```bash
cd frontend

# Using npm
npm run dev

# Or using bun
bun run dev
```

**Frontend URL:** http://localhost:3000

## 🔐 Default Login Credentials

```
Email: admin@example.com
Password: admin123
```

## 📊 Database Status

```bash
# Check database tables
sudo -u postgres psql -d smart_village_db -c "\dt"

# Check migration status
cd backend
.venv/bin/alembic current

# View sample data counts
sudo -u postgres psql -d smart_village_db -c "
SELECT 
  (SELECT COUNT(*) FROM villages) as villages,
  (SELECT COUNT(*) FROM budgets) as budgets,
  (SELECT COUNT(*) FROM budget_categories) as categories,
  (SELECT COUNT(*) FROM expenses) as expenses;
"
```

## 🧪 Testing API Endpoints

### Test Villages Endpoint
```bash
curl http://localhost:8000/villages/ | python3 -m json.tool
```

### Test Authentication
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  | python3 -m json.tool
```

### Test Budgets
```bash
curl http://localhost:8000/budgets/ | python3 -m json.tool
```

### Test Categories
```bash
curl http://localhost:8000/categories/ | python3 -m json.tool
```

### Test Expenses
```bash
curl http://localhost:8000/expenses/ | python3 -m json.tool
```

## 📁 Project Structure

```
Smart_Village_Budget_And_Expenses_Tracker/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── database.py          # Database configuration
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── crud.py              # CRUD operations
│   │   ├── dependencies.py      # Dependency injection
│   │   └── routers/
│   │       ├── auth.py          # Authentication endpoints
│   │       ├── villages.py      # Village endpoints
│   │       ├── budgets.py       # Budget endpoints
│   │       ├── categories.py    # Category endpoints
│   │       └── expenses.py      # Expense endpoints
│   ├── alembic/                 # Database migrations
│   ├── seed_data.py            # Sample data script
│   ├── .env                     # Environment variables
│   └── DATABASE_SCHEMA.md       # Database documentation
│
└── frontend/
    ├── src/
    │   ├── main.tsx             # App entry point
    │   ├── App.tsx              # Main routing
    │   ├── context/
    │   │   └── AuthContext.tsx  # Auth state management
    │   ├── services/
    │   │   └── api.ts           # Axios configuration
    │   ├── components/
    │   │   ├── layout/          # Layout components
    │   │   └── ui/              # ShadCN UI components
    │   ├── pages/
    │   │   ├── Landing.tsx      # Landing page
    │   │   ├── auth/            # Auth pages
    │   │   └── dashboard/       # Dashboard pages
    │   └── routes/              # Route definitions
    └── package.json
```

## 🔄 Development Workflow

### Make Database Changes

1. Edit models in `backend/app/models.py`
2. Create migration:
   ```bash
   cd backend
   .venv/bin/alembic revision --autogenerate -m "description"
   ```
3. Apply migration:
   ```bash
   .venv/bin/alembic upgrade head
   ```

### Add New API Endpoints

1. Add function in `backend/app/crud.py`
2. Add route in appropriate router file
3. Add Pydantic schema in `schemas.py` if needed
4. Update frontend API calls in `frontend/src/services/api.ts`

### Add New Frontend Pages

1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/routes/`
3. Update navigation in `frontend/src/components/layout/Sidebar.tsx`

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -c "\l" | grep smart_village_db

# Check migrations
cd backend
.venv/bin/alembic current
```

### Frontend won't start
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules
bun install  # or npm install

# Check for port conflicts
lsof -i :3000
```

### Database connection errors
```bash
# Verify .env file
cat backend/.env

# Test database connection
sudo -u postgres psql -d smart_village_db -c "SELECT version();"
```

## 📈 Current Data Summary

**Sample Data Loaded:**
- 3 Villages (Greenfield, Riverside, Mountain View)
- 3 Budgets (2024-2025)
- 12 Budget Categories (Infrastructure, Education, Healthcare, Agriculture)
- 4 Sample Expenses

## ✅ System Status

- ✅ PostgreSQL: Running
- ✅ Database: Connected and migrated
- ✅ Backend API: Running on port 8000
- ✅ Frontend: Running on port 3000
- ✅ Authentication: Functional
- ✅ CORS: Configured for localhost:3000
- ✅ Sample Data: Loaded

## 🎯 Ready to Use!

The application is fully set up and ready for development and testing. Access it at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

Happy coding! 🚀
