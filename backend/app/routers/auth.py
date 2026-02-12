from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from datetime import timedelta

from .. import crud, schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = crud.get_user_by_email(db=db, email=user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Enforce admin registration for only one user
    if user.role == "admin":
        admin_email = "admin@example.com"
        if user.email != admin_email:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the designated admin email can register as admin."
            )
        existing_admin = crud.get_user_by_email(db=db, email=admin_email)
        if existing_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin user already exists."
            )
    # Require village selection for villagers
    if user.role == "villager" and not user.village_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Villager must select a village."
        )
    db_user = crud.create_user(db=db, user=user)
    
    # Generate JWT token
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )
    
    # Build user response from the ORM object (includes role)
    user_out = schemas.UserOut.model_validate(db_user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_out
    }


@router.post("/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    # Get user by email
    user = crud.get_user_by_email(db=db, email=credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not crud.verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    # Validate role matches user's role
    if user.role != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User role mismatch. Expected {user.role}, got {credentials.role}"
        )
    
    # Admin validation
    if credentials.role == "admin":
        admin_email = "admin@example.com"
        if user.email != admin_email:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the designated admin can log in as admin."
            )
    
    # Villager validation - must provide village_id
    if credentials.role == "villager":
        if not credentials.village_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Villagers must select a village"
            )
        # Verify village_id matches user's village_id
        if user.village_id != credentials.village_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Village selection does not match your registered village"
            )
    
    # Generate JWT token
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    # Build user response from the ORM object
    user_out = schemas.UserOut.model_validate(user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_out
    }


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(get_current_user)):
    """Get current user info"""
    return current_user


