from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# Schemas
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict


class User(BaseModel):
    id: int
    name: str
    email: str


# Mock user storage (replace with database in production)
MOCK_USERS = {
    "admin@example.com": {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "password": "admin123"  # In production, use hashed passwords
    }
}


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister):
    """Register a new user"""
    # Check if user already exists
    if user.email in MOCK_USERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user (mock implementation)
    new_user = {
        "id": len(MOCK_USERS) + 1,
        "name": user.name,
        "email": user.email,
        "password": user.password  # In production, hash this
    }
    MOCK_USERS[user.email] = new_user
    
    # Generate mock token
    token = f"mock_token_{user.email}"
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"]
        }
    }


@router.post("/login", response_model=Token)
def login(credentials: UserLogin):
    """Login user"""
    # Check if user exists
    user = MOCK_USERS.get(credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password (mock implementation)
    if user["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Generate mock token
    token = f"mock_token_{credentials.email}"
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }


@router.get("/me", response_model=User)
def get_current_user(token: Optional[str] = None):
    """Get current user info"""
    # Mock implementation - in production, validate JWT token
    if not token or not token.startswith("mock_token_"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    # Extract email from token (mock)
    email = token.replace("mock_token_", "")
    user = MOCK_USERS.get(email)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"]
    }
