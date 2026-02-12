from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)


@router.get("/", response_model=List[schemas.BudgetOut])
def get_my_budgets(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all budgets for the current user's village"""
    if current_user.role == "admin":
        return db.query(models.Budget).all()
    else:
        return crud.get_budgets_by_village(db=db, village_id=current_user.village_id)


@router.post("/", response_model=schemas.BudgetOut, status_code=status.HTTP_201_CREATED)
def create_budget(
    budget: schemas.BudgetCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new budget for the current user's village"""
    # Only admin may create budgets
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admin can create budgets")

    # Admin must provide village_id when creating a budget
    if budget.village_id is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin must provide village_id when creating a budget")
    target_village_id = budget.village_id

    try:
        return crud.create_budget(db=db, budget=budget, village_id=target_village_id)
    except Exception as e:
        if "unique_village_year" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Budget for year {budget.year} already exists for the target village"
            )
        raise


@router.get("/{budget_id}", response_model=schemas.BudgetOut)
def get_budget(
    budget_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific budget by ID"""
    budget = crud.get_budget_by_id(db=db, budget_id=budget_id)
    if budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {budget_id} not found"
        )
    
    # Admin can access any budget
    if current_user.role != "admin" and budget.village_id != current_user.village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this budget"
        )
    return budget


@router.put("/{budget_id}", response_model=schemas.BudgetOut)
def update_budget(
    budget_id: int,
    budget_update: schemas.BudgetUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a budget"""
    # Get existing budget
    existing_budget = crud.get_budget_by_id(db=db, budget_id=budget_id)
    if existing_budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {budget_id} not found"
        )
    
    # Admin can update any budget
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can update budgets"
        )
    try:
        updated_budget = crud.update_budget(db=db, budget_id=budget_id, budget_update=budget_update)
        return updated_budget
    except Exception as e:
        if "unique_village_year" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Budget for year {budget_update.year} already exists for your village"
            )
        raise


@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget(
    budget_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a budget"""
    # Get existing budget
    existing_budget = crud.get_budget_by_id(db=db, budget_id=budget_id)
    if existing_budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {budget_id} not found"
        )
    
    # Admin can delete any budget
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can delete budgets"
        )
    crud.delete_budget(db=db, budget_id=budget_id)
    return None
