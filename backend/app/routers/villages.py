from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter(
    prefix="/villages",
    tags=["Villages"]
)


@router.post("/", response_model=schemas.VillageOut, status_code=status.HTTP_201_CREATED)
def create_village(
    village: schemas.VillageCreate,
    db: Session = Depends(get_db)
):
    """Create a new village"""
    return crud.create_village(db=db, village=village)


@router.get("/", response_model=List[schemas.VillageOut])
def get_villages(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all villages with pagination"""
    return crud.get_villages(db=db, skip=skip, limit=limit)


@router.get("/{village_id}", response_model=schemas.VillageOut)
def get_village(
    village_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific village by ID"""
    village = crud.get_village_by_id(db=db, village_id=village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Village with id {village_id} not found"
        )
    return village
