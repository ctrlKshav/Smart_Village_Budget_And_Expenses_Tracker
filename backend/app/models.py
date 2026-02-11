# models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric, Text, DateTime
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


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True)
    village_id = Column(Integer, ForeignKey("villages.id", ondelete="CASCADE"))
    year = Column(Integer, nullable=False)
    total_allocated = Column(Numeric(12, 2), nullable=False)

    village = relationship("Village")


class BudgetCategory(Base):
    __tablename__ = "budget_categories"

    id = Column(Integer, primary_key=True)
    budget_id = Column(Integer, ForeignKey("budgets.id", ondelete="CASCADE"))
    category_name = Column(String(150), nullable=False)
    allocated_amount = Column(Numeric(12, 2), nullable=False)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("budget_categories.id", ondelete="CASCADE"))
    description = Column(Text)
    amount = Column(Numeric(12, 2), nullable=False)
    vendor_name = Column(String(150))
    expense_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
