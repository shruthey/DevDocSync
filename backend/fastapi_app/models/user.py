from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func
from db import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class User(SQLAlchemyBaseUserTableUUID, Base):
    """User model with additional fields for DevDocSync."""
    
    __tablename__ = "users"
    
    # Additional fields beyond the base FastAPI-Users model
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    role = Column(String(20), default="user")  # user, admin, editor
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Profile fields for documentation context
    department = Column(String(100), nullable=True)
    position = Column(String(100), nullable=True)
    
    def __repr__(self):
        return f"<User {self.email}>"
