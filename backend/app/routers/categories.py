from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user_with_village

router = APIRouter(
    prefix="/categories",
    tags=["Budget Categories"]
)


@router.get("/", response_model=List[schemas.CategoryOut])
def get_my_categories(
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Get all categories for the current user's village budgets"""
    # Get all budgets for user's village
    budgets = crud.get_budgets_by_village(db=db, village_id=current_user.village_id)
    
    # Get categories for all these budgets
    categories = []
    for budget in budgets:
        budget_categories = crud.get_categories_by_budget(db=db, budget_id=budget.id)
        categories.extend(budget_categories)
    
    return categories


@router.post("/", response_model=schemas.CategoryOut, status_code=status.HTTP_201_CREATED)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new budget category"""
    # Verify budget exists
    budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
    if budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {category.budget_id} not found"
        )
    
    return crud.create_category(db=db, category=category)


@router.get("/budget/{budget_id}", response_model=List[schemas.CategoryOut])
def get_categories_by_budget(
    budget_id: int,
    db: Session = Depends(get_db)
):
    """Get all categories for a specific budget"""
    # Verify budget exists
    budget = crud.get_budget_by_id(db=db, budget_id=budget_id)
    if budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {budget_id} not found"
        )
    
    return crud.get_categories_by_budget(db=db, budget_id=budget_id)


@router.get("/{category_id}", response_model=schemas.CategoryOut)
def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific category by ID"""
    category = crud.get_category_by_id(db=db, category_id=category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {category_id} not found"
        )
    return category


@router.get("/{category_id}/remaining")
def get_remaining_budget(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Get remaining budget for a specific category"""
    result = crud.get_remaining_budget_by_category(db=db, category_id=category_id)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {category_id} not found"
        )
    return result
