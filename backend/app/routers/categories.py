from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/categories",
    tags=["Budget Categories"]
)


@router.get("/", response_model=List[schemas.CategoryOut])
def get_all_categories(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all categories (no village restriction)"""
    if current_user.role == "admin":
        return db.query(models.BudgetCategory).all()
    else:
        # Only categories for budgets in user's village
        budgets = db.query(models.Budget).filter(models.Budget.village_id == current_user.village_id).all()
        budget_ids = [b.id for b in budgets]
        return db.query(models.BudgetCategory).filter(models.BudgetCategory.budget_id.in_(budget_ids)).all()


@router.post("/", response_model=schemas.CategoryOut, status_code=status.HTTP_201_CREATED)
def create_category(
    category: schemas.CategoryCreate,
    current_user: models.User = Depends(get_current_user),
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
    # Only admin may create categories
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can create categories"
        )

    return crud.create_category(db=db, category=category)


@router.get("/budget/{budget_id}", response_model=List[schemas.CategoryOut])
def get_categories_by_budget(
    budget_id: int,
    current_user: models.User = Depends(get_current_user),
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
    
    # Admin can access any budget's categories, villagers only their village's budgets
    if current_user.role != "admin" and budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this budget"
        )
    
    return crud.get_categories_by_budget(db=db, budget_id=budget_id)


@router.get("/{category_id}", response_model=schemas.CategoryOut)
def get_category(
    category_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific category by ID"""
    category = crud.get_category_by_id(db=db, category_id=category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {category_id} not found"
        )
    
    # Admin can access any category, villagers only their village's categories
    if current_user.role != "admin":
        budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
        if budget.village_id != current_user.village_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to this category"
            )
    
    return category


@router.get("/{category_id}/remaining")
def get_remaining_budget(
    category_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get remaining budget for a specific category"""
    category = crud.get_category_by_id(db=db, category_id=category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {category_id} not found"
        )
    
    # Admin can access any category, villagers only their village's categories
    if current_user.role != "admin":
        budget = crud.get_budget_by_id(db=db, budget_id=category.budget_id)
        if budget.village_id != current_user.village_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to this category"
            )
    
    result = crud.get_remaining_budget_by_category(db=db, category_id=category_id)
    return result
