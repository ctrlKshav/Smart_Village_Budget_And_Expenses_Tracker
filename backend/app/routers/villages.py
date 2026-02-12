from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/villages",
    tags=["Villages"]
)


@router.get("/public", response_model=List[schemas.VillageOut])
def list_villages_public(
    db: Session = Depends(get_db)
):
    """List all villages (public endpoint for registration)"""
    villages = crud.get_villages(db=db, skip=0, limit=100)
    return villages


@router.get("/", response_model=List[schemas.VillageOut])
def list_villages(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List villages - admin sees all, villagers see only their village"""
    if current_user.role == "admin":
        villages = crud.get_villages(db=db, skip=0, limit=100)
        return villages
    else:
        # Villagers only see their own village
        if current_user.village_id is None:
            villages = crud.get_villages(db=db, skip=0, limit=100)
            return villages
        village = crud.get_village_by_id(db=db, village_id=current_user.village_id)
        return [village] if village else []


@router.get("/me", response_model=schemas.VillageOut)
def get_my_village(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get the current user's village details"""
    if current_user.village_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User is not assigned to any village"
        )
    village = crud.get_village_by_id(db=db, village_id=current_user.village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Village not found"
        )
    return village


@router.post("/", response_model=schemas.VillageOut, status_code=status.HTTP_201_CREATED)
def create_village(
    village: schemas.VillageCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new village (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create villages"
        )
    return crud.create_village(db=db, village=village)


@router.get("/{village_id}", response_model=schemas.VillageOut)
def get_village(
    village_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific village by ID"""
    village = crud.get_village_by_id(db=db, village_id=village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Village with id {village_id} not found"
        )
    
    # Admin can access any village, villagers only their own
    if current_user.role != "admin" and current_user.village_id != village_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied to this village"
        )
    
    return village


@router.delete("/{village_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_village(
    village_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a village (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete villages"
        )
    
    village = crud.get_village_by_id(db=db, village_id=village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Village with id {village_id} not found"
        )
    
    db.delete(village)
    db.commit()
    return None
