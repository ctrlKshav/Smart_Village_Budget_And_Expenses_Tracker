from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal


# ============ User Schemas ============

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    village_id: int


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    village_id: Optional[int] = None
    is_active: bool
    created_at: datetime
    village: Optional['VillageOut'] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ============ Village Schemas ============

class VillageCreate(BaseModel):
    name: str
    district: Optional[str] = None
    state: Optional[str] = None


class VillageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    district: Optional[str] = None
    state: Optional[str] = None
    created_at: datetime


# ============ Budget Schemas ============

class BudgetCreate(BaseModel):
    year: int
    total_allocated: Decimal


class BudgetUpdate(BaseModel):
    year: Optional[int] = None
    total_allocated: Optional[Decimal] = None


class BudgetOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    village_id: int
    year: int
    total_allocated: Decimal


# ============ Category Schemas ============

class CategoryCreate(BaseModel):
    budget_id: int
    category_name: str
    allocated_amount: Decimal


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    budget_id: int
    category_name: str
    allocated_amount: Decimal


# ============ Expense Schemas ============

class ExpenseCreate(BaseModel):
    category_id: int
    description: Optional[str] = None
    amount: Decimal
    vendor_name: Optional[str] = None
    expense_date: date


class ExpenseUpdate(BaseModel):
    category_id: Optional[int] = None
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    vendor_name: Optional[str] = None
    expense_date: Optional[date] = None


class ExpenseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: int
    description: Optional[str] = None
    amount: Decimal
    vendor_name: Optional[str] = None
    expense_date: date
    created_at: datetime
