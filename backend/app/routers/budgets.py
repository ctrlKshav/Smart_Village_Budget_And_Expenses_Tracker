from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)


@router.get("/", response_model=List[schemas.BudgetOut])
def get_all_budgets(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all budgets with pagination"""
    return crud.get_all_budgets(db=db, skip=skip, limit=limit)


@router.post("/", response_model=schemas.BudgetOut, status_code=status.HTTP_201_CREATED)
def create_budget(
    budget: schemas.BudgetCreate,
    db: Session = Depends(get_db)
):
    """Create a new budget for a village"""
    # Verify village exists
    village = crud.get_village_by_id(db=db, village_id=budget.village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Village with id {budget.village_id} not found"
        )
    
    try:
        return crud.create_budget(db=db, budget=budget)
    except Exception as e:
        # Handle unique constraint violation
        if "unique_village_year" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Budget for village {budget.village_id} and year {budget.year} already exists"
            )
        raise


@router.get("/village/{village_id}", response_model=List[schemas.BudgetOut])
def get_budgets_by_village(
    village_id: int,
    db: Session = Depends(get_db)
):
    """Get all budgets for a specific village"""
    # Verify village exists
    village = crud.get_village_by_id(db=db, village_id=village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Village with id {village_id} not found"
        )
    
    return crud.get_budgets_by_village(db=db, village_id=village_id)


@router.get("/{budget_id}", response_model=schemas.BudgetOut)
def get_budget(
    budget_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific budget by ID"""
    budget = crud.get_budget_by_id(db=db, budget_id=budget_id)
    if budget is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Budget with id {budget_id} not found"
        )
    return budget
