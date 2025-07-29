#!/usr/bin/env python3
"""
Test script to debug user registration
"""

import asyncio
from models.user import User
from models.schemas import UserCreate
from services.user_manager import get_user_manager, get_user_db
from db import SessionLocal

async def test_user_creation():
    """Test creating a user directly"""
    
    # Create a database session
    session = SessionLocal()
    
    try:
        # Get user database and manager
        user_db_gen = get_user_db(session)
        user_db = await user_db_gen.__anext__()
        
        user_manager_gen = get_user_manager(user_db)
        user_manager = await user_manager_gen.__anext__()
        
        # Create user data
        user_create = UserCreate(
            email="test@example.com",
            password="password123",
            first_name="Test",
            last_name="User"
        )
        
        # Try to create user
        print("Creating user...")
        user = await user_manager.create(user_create)
        print(f"User created successfully: {user.email}")
        
    except Exception as e:
        print(f"Error creating user: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.close()

if __name__ == "__main__":
    asyncio.run(test_user_creation())
