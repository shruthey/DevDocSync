from fastapi_users import schemas
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid


class UserRead(schemas.BaseUser[uuid.UUID]):
    """Schema for reading user data."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: str = "user"
    department: Optional[str] = None
    position: Optional[str] = None
    created_at: Optional[datetime] = None


class UserCreate(schemas.BaseUserCreate):
    """Schema for creating new users."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None


class UserUpdate(schemas.BaseUserUpdate):
    """Schema for updating user data."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None
    role: Optional[str] = None


class UserProfile(BaseModel):
    """Public user profile schema."""
    id: uuid.UUID
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None
    role: str
    
    class Config:
        from_attributes = True
