from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_users import FastAPIUsers
from fastapi_users.router import ErrorCode

from models.user import User
from models.schemas import UserRead, UserCreate, UserUpdate, UserProfile
from services.user_manager import get_user_manager
from services.auth import auth_backend

import uuid

# Initialize FastAPI Users
fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

# Get current user dependencies
current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)

# Create routers
auth_router = APIRouter()

# Include authentication routes
auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/jwt",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="",  # No prefix so it's directly under /auth
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/reset-password",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/verify",
    tags=["auth"],
)

# Users management routes
users_router = fastapi_users.get_users_router(UserRead, UserUpdate)

# Admin endpoint to list all users
@auth_router.get("/admin/users", response_model=list[UserRead])
async def list_all_users(
    current_user: User = Depends(current_superuser)
):
    """List all users (admin only)."""
    from db import AsyncSessionLocal
    from sqlalchemy import select
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        return users

# Public endpoint to get basic user count (no auth required)
@auth_router.get("/stats/users")
async def get_user_stats():
    """Get basic user statistics."""
    from db import AsyncSessionLocal
    from sqlalchemy import select, func
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(func.count(User.id)))
        total_users = result.scalar()
        return {"total_users": total_users}

# Custom profile route
@auth_router.get("/profile", response_model=UserProfile)
async def get_user_profile(user: User = Depends(current_active_user)):
    """Get current user's profile."""
    return UserProfile.model_validate(user)


@auth_router.get("/me", response_model=UserRead)
async def get_current_user(user: User = Depends(current_active_user)):
    """Get current authenticated user."""
    return user
