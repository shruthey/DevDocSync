#!/usr/bin/env python3
"""
Database initialization script for DevDocSync
"""

from db import Base, engine
from models.user import User

def create_tables():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    create_tables()
