from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user_with_village

router = APIRouter(
    prefix="/villages",
    tags=["Villages"]
)


@router.get("/", response_model=list[schemas.VillageOut])
def list_villages(
    db: Session = Depends(get_db)
):
    """List all villages (public endpoint for registration)"""
    villages = crud.get_villages(db=db, skip=0, limit=100)
    return villages


@router.get("/me", response_model=schemas.VillageOut)
def get_my_village(
    current_user: models.User = Depends(get_current_user_with_village),
    db: Session = Depends(get_db)
):
    """Get the current user's village details"""
    village = crud.get_village_by_id(db=db, village_id=current_user.village_id)
    if village is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Village not found"
        )
    return village
