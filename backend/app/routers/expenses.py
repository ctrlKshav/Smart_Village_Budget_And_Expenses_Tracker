from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.get("/", response_model=List[schemas.ExpenseOut])
def get_all_expenses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all expenses with pagination"""
    return crud.get_all_expenses(db=db, skip=skip, limit=limit)


@router.post("/", response_model=schemas.ExpenseOut, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db)
):
    """Create a new expense"""
    # Verify category exists
    category = crud.get_category_by_id(db=db, category_id=expense.category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {expense.category_id} not found"
        )
    
    return crud.create_expense(db=db, expense=expense)


@router.get("/category/{category_id}", response_model=List[schemas.ExpenseOut])
def get_expenses_by_category(
    category_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all expenses for a specific category with pagination"""
    # Verify category exists
    category = crud.get_category_by_id(db=db, category_id=category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {category_id} not found"
        )
    
    return crud.get_expenses_by_category(
        db=db,
        category_id=category_id,
        skip=skip,
        limit=limit
    )
