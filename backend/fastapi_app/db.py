# Database configuration and connection
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL - update with your database credentials
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
ASYNC_SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./sql_app.db"

# Sync engine for table creation
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Async engine for FastAPI-Users
async_engine = create_async_engine(ASYNC_SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

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
