# models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric, Text, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Village(Base):
    __tablename__ = "villages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    district = Column(String(150))
    state = Column(String(150))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    budgets = relationship("Budget", back_populates="village", cascade="all, delete-orphan")


class Budget(Base):
    __tablename__ = "budgets"
    __table_args__ = (
        UniqueConstraint('village_id', 'year', name='unique_village_year'),
    )

    id = Column(Integer, primary_key=True)
    village_id = Column(Integer, ForeignKey("villages.id", ondelete="CASCADE"), nullable=False)
    year = Column(Integer, nullable=False)
    total_allocated = Column(Numeric(12, 2), nullable=False)

    # Relationships
    village = relationship("Village", back_populates="budgets")
    categories = relationship("BudgetCategory", back_populates="budget", cascade="all, delete-orphan")


class BudgetCategory(Base):
    __tablename__ = "budget_categories"

    id = Column(Integer, primary_key=True)
    budget_id = Column(Integer, ForeignKey("budgets.id", ondelete="CASCADE"), nullable=False)
    category_name = Column(String(150), nullable=False)
    allocated_amount = Column(Numeric(12, 2), nullable=False)

    # Relationships
    budget = relationship("Budget", back_populates="categories")
    expenses = relationship("Expense", back_populates="category", cascade="all, delete-orphan")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("budget_categories.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text)
    amount = Column(Numeric(12, 2), nullable=False)
    vendor_name = Column(String(150))
    expense_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    category = relationship("BudgetCategory", back_populates="expenses")
