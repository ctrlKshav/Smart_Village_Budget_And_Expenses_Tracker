from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user_with_village

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.get("/", response_model=List[schemas.ExpenseOut])
def get_my_expenses(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Get all expenses for the current user's village"""
    return crud.get_expenses_by_village(db=db, village_id=current_user.village_id, skip=skip, limit=limit)


@router.post("/", response_model=schemas.ExpenseOut, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense: schemas.ExpenseCreate,
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Create a new expense (log an expense)"""
    # Verify category exists
    category = crud.get_category_by_id(db=db, category_id=expense.category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {expense.category_id} not found"
        )
    
    # Verify category belongs to user's village
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this category"
        )
    
    return crud.create_expense(db=db, expense=expense)


@router.get("/category/{category_id}", response_model=List[schemas.ExpenseOut])
def get_expenses_by_category(
    category_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_user_with_village),
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
    
    # Verify category belongs to user's village
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this category"
        )
    
    return crud.get_expenses_by_category(
        db=db,
        category_id=category_id,
        skip=skip,
        limit=limit
    )


@router.get("/{expense_id}", response_model=schemas.ExpenseOut)
def get_expense(
    expense_id: int,
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Get a specific expense by ID"""
    expense = crud.get_expense_by_id(db=db, expense_id=expense_id)
    if expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with id {expense_id} not found"
        )
    
    # Verify expense belongs to user's village
    category = crud.get_category_by_id(db=db, category_id=expense.category_id)
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this expense"
        )
    
    return expense


@router.put("/{expense_id}", response_model=schemas.ExpenseOut)
def update_expense(
    expense_id: int,
    expense_update: schemas.ExpenseUpdate,
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Update an expense"""
    # Get existing expense
    existing_expense = crud.get_expense_by_id(db=db, expense_id=expense_id)
    if existing_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with id {expense_id} not found"
        )
    
    # Verify expense belongs to user's village
    category = crud.get_category_by_id(db=db, category_id=existing_expense.category_id)
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this expense"
        )
    
    # If category_id is being changed, verify the new category also belongs to user's village
    if expense_update.category_id is not None:
        new_category = crud.get_category_by_id(db=db, category_id=expense_update.category_id)
        if new_category is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with id {expense_update.category_id} not found"
            )
        new_budget = crud.get_budget_by_id(db=db, budget_id=new_category.budget_id)
        if new_budget.village_id != current_user.village_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to the target category"
            )
    
    # Update expense
    updated_expense = crud.update_expense(db=db, expense_id=expense_id, expense_update=expense_update)
    return updated_expense


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(
    expense_id: int,
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Delete an expense"""
    # Get existing expense
    existing_expense = crud.get_expense_by_id(db=db, expense_id=expense_id)
    if existing_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with id {expense_id} not found"
        )
    
    # Verify expense belongs to user's village
    category = crud.get_category_by_id(db=db, category_id=existing_expense.category_id)
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this expense"
        )
    
    # Delete expense
    crud.delete_expense(db=db, expense_id=expense_id)
    return None
