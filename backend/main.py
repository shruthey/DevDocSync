# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from db import Base, engine, get_db
from api.auth import auth_router, users_router, current_active_user
from models.user import User

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DevDocSync API",
    description="Documentation synchronization system with authentication",
    version="1.0.0"
)

# Allow frontend (React) to communicate with FastAPI
import os
allowed_origins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000"
]

# Add production frontend URL if available
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

# Allow any .onrender.com domain in production
if os.getenv("RENDER"):
    allowed_origins.append("https://*.onrender.com")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include authentication routes
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(users_router, prefix="/users", tags=["users"])

@app.get("/")
def root():
    return {"message": "DevDocSync API is running!", "version": "1.0.0"}

# Protected route example
@app.get("/protected")
async def protected_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}! This is a protected route."}

# Migrated from Flask service
@app.get("/hello")
def hello_world():
    return {"message": "Hello, World!"}
