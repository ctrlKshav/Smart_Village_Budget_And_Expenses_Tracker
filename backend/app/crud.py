from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from decimal import Decimal
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

from . import models, schemas

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your-secret-key-change-in-production"  # TODO: Move to environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# ============ User CRUD ============

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    """Get a user by email"""
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[models.User]:
    """Get a user by ID"""
    return db.query(models.User).filter(models.User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Create a new user"""
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        village_id=user.village_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str) -> Optional[dict]:
    """Verify and decode a JWT access token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


# ============ Village CRUD ============

def create_village(db: Session, village: schemas.VillageCreate) -> models.Village:
    """Create a new village"""
    db_village = models.Village(
        name=village.name,
        district=village.district,
        state=village.state
    )
    db.add(db_village)
    db.commit()
    db.refresh(db_village)
    return db_village


def get_villages(db: Session, skip: int = 0, limit: int = 100) -> List[models.Village]:
    """Get all villages with pagination"""
    return db.query(models.Village).offset(skip).limit(limit).all()


def get_village_by_id(db: Session, village_id: int) -> Optional[models.Village]:
    """Get a village by ID"""
    return db.query(models.Village).filter(models.Village.id == village_id).first()


# ============ Budget CRUD ============

def create_budget(db: Session, budget: schemas.BudgetCreate, village_id: int) -> models.Budget:
    """Create a new budget for a village"""
    db_budget = models.Budget(
        village_id=village_id,
        year=budget.year,
        total_allocated=budget.total_allocated
    )
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget


def get_budgets_by_village(db: Session, village_id: int) -> List[models.Budget]:
    """Get all budgets for a specific village"""
    return db.query(models.Budget).filter(models.Budget.village_id == village_id).all()


def get_budget_by_id(db: Session, budget_id: int) -> Optional[models.Budget]:
    """Get a budget by ID"""
    return db.query(models.Budget).filter(models.Budget.id == budget_id).first()


def update_budget(db: Session, budget_id: int, budget_update: schemas.BudgetUpdate) -> Optional[models.Budget]:
    """Update a budget"""
    db_budget = get_budget_by_id(db, budget_id)
    if not db_budget:
        return None
    
    update_data = budget_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_budget, field, value)
    
    db.commit()
    db.refresh(db_budget)
    return db_budget


def delete_budget(db: Session, budget_id: int) -> bool:
    """Delete a budget"""
    db_budget = get_budget_by_id(db, budget_id)
    if not db_budget:
        return False
    
    db.delete(db_budget)
    db.commit()
    return True


def get_all_budgets(db: Session, skip: int = 0, limit: int = 100) -> List[models.Budget]:
    """Get all budgets with pagination"""
    return db.query(models.Budget).offset(skip).limit(limit).all()


# ============ Budget Category CRUD ============

def create_category(db: Session, category: schemas.CategoryCreate) -> models.BudgetCategory:
    """Create a new budget category"""
    db_category = models.BudgetCategory(
        budget_id=category.budget_id,
        category_name=category.category_name,
        allocated_amount=category.allocated_amount
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_categories_by_budget(db: Session, budget_id: int) -> List[models.BudgetCategory]:
    """Get all categories for a specific budget"""
    return db.query(models.BudgetCategory).filter(
        models.BudgetCategory.budget_id == budget_id
    ).all()


def get_category_by_id(db: Session, category_id: int) -> Optional[models.BudgetCategory]:
    """Get a category by ID"""
    return db.query(models.BudgetCategory).filter(
        models.BudgetCategory.id == category_id
    ).first()


def get_all_categories(db: Session, skip: int = 0, limit: int = 100) -> List[models.BudgetCategory]:
    """Get all categories with pagination"""
    return db.query(models.BudgetCategory).offset(skip).limit(limit).all()


# ============ Expense CRUD ============

def create_expense(db: Session, expense: schemas.ExpenseCreate) -> models.Expense:
    """Create a new expense"""
    db_expense = models.Expense(
        category_id=expense.category_id,
        description=expense.description,
        amount=expense.amount,
        vendor_name=expense.vendor_name,
        expense_date=expense.expense_date
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def get_expenses_by_category(
    db: Session,
    category_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[models.Expense]:
    """Get all expenses for a specific category with pagination"""
    return db.query(models.Expense).filter(
        models.Expense.category_id == category_id
    ).offset(skip).limit(limit).all()


def get_all_expenses(db: Session, skip: int = 0, limit: int = 100) -> List[models.Expense]:
    """Get all expenses with pagination"""
    return db.query(models.Expense).offset(skip).limit(limit).all()


def get_expenses_by_village(db: Session, village_id: int, skip: int = 0, limit: int = 100) -> List[models.Expense]:
    """Get all expenses for a specific village"""
    return db.query(models.Expense).\
        join(models.BudgetCategory, models.Expense.category_id == models.BudgetCategory.id).\
        join(models.Budget, models.BudgetCategory.budget_id == models.Budget.id).\
        filter(models.Budget.village_id == village_id).\
        offset(skip).limit(limit).all()


def get_expense_by_id(db: Session, expense_id: int) -> Optional[models.Expense]:
    """Get an expense by ID"""
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()


def update_expense(db: Session, expense_id: int, expense_update: schemas.ExpenseUpdate) -> Optional[models.Expense]:
    """Update an expense"""
    db_expense = get_expense_by_id(db, expense_id)
    if not db_expense:
        return None
    
    update_data = expense_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_expense, field, value)
    
    db.commit()
    db.refresh(db_expense)
    return db_expense


def delete_expense(db: Session, expense_id: int) -> bool:
    """Delete an expense"""
    db_expense = get_expense_by_id(db, expense_id)
    if not db_expense:
        return False
    
    db.delete(db_expense)
    db.commit()
    return True


def get_remaining_budget_by_category(db: Session, category_id: int) -> dict:
    """
    Calculate remaining budget for a category using SQL aggregation.
    Returns a dict with allocated_amount, spent_amount, and remaining_amount.
    """
    # Get the category with allocated amount
    category = db.query(models.BudgetCategory).filter(
        models.BudgetCategory.id == category_id
    ).first()
    
    if not category:
        return None
    
    # Calculate total spent using SQL aggregation
    total_spent = db.query(
        func.coalesce(func.sum(models.Expense.amount), 0)
    ).filter(
        models.Expense.category_id == category_id
    ).scalar()
    
    # Convert to Decimal for consistent currency handling
    allocated = Decimal(str(category.allocated_amount))
    spent = Decimal(str(total_spent))
    remaining = allocated - spent
    
    return {
        "category_id": category_id,
        "category_name": category.category_name,
        "allocated_amount": allocated,
        "spent_amount": spent,
        "remaining_amount": remaining
    }
