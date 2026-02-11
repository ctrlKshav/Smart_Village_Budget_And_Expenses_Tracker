from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Budget Categories"]
)


@router.get("/", response_model=List[schemas.CategoryOut])
def get_all_categories(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all categories with pagination"""
    return crud.get_all_categories(db=db, skip=skip, limit=limit)


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
