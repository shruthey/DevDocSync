# Database configuration and connection
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database URL - get from environment variable or use SQLite as fallback
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# Convert PostgreSQL URL to async version if needed
if DATABASE_URL.startswith("postgresql://"):
    ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
    engine = create_engine(DATABASE_URL)
    async_engine = create_async_engine(ASYNC_DATABASE_URL)
else:
    # SQLite configuration
    ASYNC_DATABASE_URL = DATABASE_URL.replace("sqlite://", "sqlite+aiosqlite://")
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    async_engine = create_async_engine(ASYNC_DATABASE_URL, connect_args={"check_same_thread": False})

# Sync session for regular operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Async session for FastAPI-Users
AsyncSessionLocal = sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

def get_db():
    """Get sync database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_async_db():
    """Get async database session for FastAPI-Users."""
    async with AsyncSessionLocal() as session:
        yield session
