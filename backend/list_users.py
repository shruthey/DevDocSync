#!/usr/bin/env python3
"""
Script to view all users in the DevDocSync database
"""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from db import AsyncSessionLocal
from models.user import User

async def list_users():
    """List all users in the database."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        
        if not users:
            print("No users found in the database.")
            return
        
        print(f"Found {len(users)} user(s):")
        print("-" * 80)
        print(f"{'ID':<36} {'Email':<30} {'Name':<25} {'Role':<10}")
        print("-" * 80)
        
        for user in users:
            name = f"{user.first_name or ''} {user.last_name or ''}".strip() or "N/A"
            print(f"{str(user.id):<36} {user.email:<30} {name:<25} {user.role:<10}")
        
        print("-" * 80)

if __name__ == "__main__":
    asyncio.run(list_users())
